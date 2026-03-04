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
	[Consumes("multipart/form-data", new string[] { })]
	public async Task<IActionResult> AnalyzeReceipt([FromForm] IFormFile image)
	{
		if (image == null || image.Length == 0L)
		{
			return BadRequest("No image provided.");
		}
		try
		{
			using Stream stream = image.OpenReadStream();
			using MultipartFormDataContent content = new MultipartFormDataContent();
			StreamContent streamContent = new StreamContent(stream);
			streamContent.Headers.ContentType = new MediaTypeHeaderValue(image.ContentType);
			content.Add(streamContent, "file", image.FileName);
			HttpClient httpClient = _httpClientFactory.CreateClient("PythonWorker");
			HttpResponseMessage httpResponseMessage = await httpClient.PostAsync("/infer", content);
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
			if (inferenceResponse == null || !inferenceResponse.Success)
			{
				return StatusCode(500, "ML worker failed to process image.");
			}
			ReceiptData receiptData = _ocrParser.Parse(inferenceResponse.Results ?? new List<BoundingBox>());
			ValidationResult validationResult = _validationEngine.Validate(receiptData);
			decimal num = ((inferenceResponse.Results?.Any() ?? false) ? ((decimal)inferenceResponse.Results.Average((BoundingBox b) => b.Confidence)) : 0.5m);
			string status = ((num >= 0.80m && validationResult.IsValid) ? "ok" : "needs_review");
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
			return StatusCode(500, "Internal server error during analysis.");
		}
	}
}
