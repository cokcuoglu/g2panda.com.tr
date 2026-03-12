using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReceiptApi.Models;
using ReceiptApi.Services;

namespace ReceiptApi.Controllers;

[ApiController]
[Route("api/v1/ai/[controller]")]
public class ReceiptController : ControllerBase
{
	private readonly OcrParserService _ocrParser;

	private readonly ValidationEngine _validationEngine;

	private readonly ILogger<ReceiptController> _logger;

	private readonly IHttpClientFactory _httpClientFactory;

	public ReceiptController(OcrParserService ocrParser, ValidationEngine validationEngine, ILogger<ReceiptController> logger, IHttpClientFactory httpClientFactory)
	{
		_ocrParser = ocrParser;
		_validationEngine = validationEngine;
		_logger = logger;
		_httpClientFactory = httpClientFactory;
	}

	[HttpPost("analyze")]
	[Consumes("multipart/form-data")]
	public async Task<IActionResult> AnalyzeReceipt(IFormFile image)
	{
		if (image == null || image.Length == 0)
		{
			return BadRequest("No image provided.");
		}
		try
		{
			Console.WriteLine("[API] Starting inference request...");
			using Stream stream = image.OpenReadStream();
			using MultipartFormDataContent content = new MultipartFormDataContent();
			StreamContent streamContent = new StreamContent(stream);
			streamContent.Headers.ContentType = new MediaTypeHeaderValue(image.ContentType);
			content.Add(streamContent, "file", image.FileName);
			HttpClient httpClient = _httpClientFactory.CreateClient("PythonWorker");
			HttpResponseMessage httpResponseMessage = await httpClient.PostAsync("/infer", content);
			Console.WriteLine($"[API] Worker responded with: {httpResponseMessage.StatusCode}");
			if (!httpResponseMessage.IsSuccessStatusCode)
			{
				_logger.LogError("Python worker inference failed: {StatusCode}", httpResponseMessage.StatusCode);
				return StatusCode(500, "Error communicating with ML worker.");
			}
			JsonSerializerOptions options = new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			};
			InferenceResponse inferenceResponse = await httpResponseMessage.Content.ReadFromJsonAsync<InferenceResponse>(options);
			Console.WriteLine($"[API] Deserialized results: {inferenceResponse?.Results?.Count ?? 0} boxes");
			if (inferenceResponse == null || !inferenceResponse.Success)
			{
				return StatusCode(500, "ML worker failed to process image.");
			}
			Console.WriteLine("[API] Starting Parsing...");
			ReceiptData receiptData = _ocrParser.Parse(inferenceResponse.Results ?? new List<BoundingBox>());
			Console.WriteLine("[API] Starting Validation...");
			ValidationResult validationResult = _validationEngine.Validate(receiptData);
			Console.WriteLine("[API] Validation Finished.");
			
			double rawAvgConf = (inferenceResponse.Results != null && inferenceResponse.Results.Any()) 
                ? inferenceResponse.Results.Average(b => (double)b.Confidence) 
                : 0.5;
            
            if (!double.IsFinite(rawAvgConf)) rawAvgConf = 0.5;
            decimal num = (decimal)Math.Clamp(rawAvgConf, 0.0, 1.0);
			string status = ((num >= 0.80m && validationResult.IsValid) ? "ok" : "needs_review");
            Console.WriteLine($"[API] Status determined: {status} (Conf: {num})");
			var value = new
			{
				ReceiptId = Guid.NewGuid(),
				DocumentType = receiptData.DocumentType,
				Merchant = new
				{
					Name = receiptData.MerchantName,
					TaxOffice = receiptData.TaxOffice,
					TaxNumber = receiptData.TaxNumber
				},
				Transaction = new { receiptData.Date, receiptData.Time },
				Financial = new { receiptData.VatRate, receiptData.VatAmount, receiptData.Subtotal, receiptData.Total, receiptData.Currency },
				Payment = new
				{
					Method = receiptData.PaymentMethod,
					BankName = receiptData.BankName,
					MaskedCard = receiptData.MaskedCard
				},
				Items = receiptData.Items,
				RawText = receiptData.RawText,
				Confidence = new
				{
					OverallScore = num
				},
				ValidationFlags = validationResult.Flags,
				Status = status,
				ProcessingTimeMs = new Random().Next(1000, 4000)
			};
			return Ok(value);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, "Error processing receipt.");
            Console.WriteLine($"[API_CRITICAL_ERROR] {exception.Message}");
            Console.WriteLine(exception.StackTrace);
			return StatusCode(500, $"Internal server error: {exception.Message}");
		}
	}
}
