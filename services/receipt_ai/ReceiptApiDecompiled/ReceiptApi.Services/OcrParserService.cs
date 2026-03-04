using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using ReceiptApi.Models;

namespace ReceiptApi.Services;

public class OcrParserService
{
	private readonly string[] _toplamKeywords = new string[8] { "TOPLAM", "TUTAR", "ODENEN", "ÖDENEN", "ODENECEK", "ÖDENECEK", "DAHIL TUTAR", "DAHİL TUTAR" };

	private readonly string[] _kdvKeywords = new string[5] { "KDV", "TOPKDV", "TOP. KDV", "TOPLAM KDV", "KDV TUTAR" };

	private readonly string[] _araToplamKeywords = new string[4] { "ARA TOP", "ARA TOPLAM", "MATRAH", "KDV MATRAHI" };

	public ReceiptData Parse(List<BoundingBox> boxes)
	{
		ReceiptData receiptData = new ReceiptData();
		if (boxes == null || boxes.Count == 0)
		{
			return receiptData;
		}
		TurkishOcrCorrector.CorrectBoxes(boxes);
		List<BoundingBox> list = (from b in boxes
			orderby b.Box[0][1], b.Box[0][0]
			select b).ToList();
		string text = string.Join(" ", list.Select((BoundingBox b) => b.Text).ToArray()).ToUpperInvariant();
		StringBuilder stringBuilder = new StringBuilder();
		IOrderedEnumerable<IGrouping<double, BoundingBox>> orderedEnumerable = from b in list
			group b by Math.Round((double)b.Box[0][1] / 12.0) * 12.0 into g
			orderby g.Key
			select g;
		foreach (IGrouping<double, BoundingBox> item in orderedEnumerable)
		{
			stringBuilder.AppendLine(string.Join(" ", from b in item
				orderby b.Box[0][0]
				select b.Text));
		}
		receiptData.RawText = stringBuilder.ToString();
		receiptData.DocumentType = ((text.Contains("FATURA") || text.Contains("E-ARŞİV")) ? "Invoice" : "Receipt");
		List<string> source = (from b in list.Take(8)
			select b.Text.Trim() into t
			where t.Length > 3 && !t.Contains("FATURA") && !t.Contains("ARŞİV") && !t.Contains("SAYIN")
			select t).ToList();
		if (source.Any())
		{
			receiptData.MerchantName = source.OrderByDescending((string t) => t.Length).First();
		}
		Match match = Regex.Match(text, "(VKN|TCKN|VERGI NO|VERGİ NO|KİMLİK NO)[:\\s]*([0-9]{10,11})");
		if (match.Success)
		{
			receiptData.TaxNumber = match.Groups[2].Value;
		}
		Match match2 = Regex.Match(text, "([0-3][0-9])[./-]([0-1][0-9])[./-](20[0-9]{2})");
		if (match2.Success)
		{
			receiptData.Date = match2.Value;
		}
		Match match3 = Regex.Match(text, "([0-2][0-9]):([0-5][0-9])");
		if (match3.Success)
		{
			receiptData.Time = match3.Value;
		}
		ExtractItems(receiptData, list);
		receiptData.Total = ExtractValueNearKeyword(list, _toplamKeywords);
		receiptData.VatAmount = ExtractValueNearKeyword(list, _kdvKeywords);
		receiptData.Subtotal = ExtractValueNearKeyword(list, _araToplamKeywords);
		if (!receiptData.Total.HasValue)
		{
			List<decimal?> source2 = (from b in list.Skip(list.Count / 2)
				select TurkishNumberParser.Parse(b.Text) into v
				where v.HasValue
				orderby v.Value descending
				select v).ToList();
			if (source2.Any())
			{
				receiptData.Total = source2.First();
			}
		}
		Match match4 = Regex.Match(text, "%([0-9]{1,2})|([0-9]{1,2})\\s*%");
		if (match4.Success)
		{
			string value = match4.Groups[1].Value;
			if (string.IsNullOrEmpty(value))
			{
				value = match4.Groups[2].Value;
			}
			if (decimal.TryParse(value, out var result))
			{
				receiptData.VatRate = result;
			}
		}
		return receiptData;
	}

	private void ExtractItems(ReceiptData data, List<BoundingBox> boxes)
	{
		List<IGrouping<double, BoundingBox>> list = (from b in boxes
			group b by Math.Round((double)b.Box[0][1] / 15.0) * 15.0 into g
			orderby g.Key
			select g).ToList();
		ReceiptItem receiptItem = null;
		foreach (IGrouping<double, BoundingBox> item in list)
		{
			List<BoundingBox> source = item.OrderBy((BoundingBox b) => b.Box[0][0]).ToList();
			string rowText = string.Join(" ", source.Select((BoundingBox b) => b.Text)).ToUpperInvariant();
			if (rowText.Length < 3 || _toplamKeywords.Any((string k) => rowText.Contains(k)) || rowText.Contains("MATRAH") || rowText.Contains("KDV") || rowText.Contains("TARİH"))
			{
				continue;
			}
			Match match = Regex.Match(rowText, "([\\d,]+\\.?[\\d]{2})\\s*(\\*[0-9])?$");
			if (match.Success)
			{
				decimal? num = TurkishNumberParser.Parse(match.Groups[1].Value);
				if (num.HasValue)
				{
					string input = rowText.Replace(match.Value, "").Trim();
					input = Regex.Replace(input, "^[*\\.\\s\\d,xX\\*]+", "").Trim();
					if (!string.IsNullOrEmpty(input) && input.Length > 1)
					{
						receiptItem = new ReceiptItem
						{
							Name = input,
							TotalPrice = num.Value,
							UnitPrice = num.Value,
							Quantity = 1m
						};
						data.Items.Add(receiptItem);
					}
					else if (receiptItem != null && string.IsNullOrEmpty(input))
					{
						receiptItem.TotalPrice = num.Value;
						receiptItem.UnitPrice = num.Value;
					}
				}
			}
			else if (rowText.Length > 4 && !rowText.Any(char.IsDigit))
			{
				receiptItem = new ReceiptItem
				{
					Name = rowText
				};
			}
		}
		data.Items = data.Items.Where((ReceiptItem it) => it.TotalPrice > 0m).ToList();
	}

	private decimal? ExtractValueNearKeyword(List<BoundingBox> boxes, string[] keywords)
	{
		for (int i = 0; i < boxes.Count; i++)
		{
			string text = boxes[i].Text.ToUpperInvariant().Replace(" ", "");
			foreach (string text2 in keywords)
			{
				if (!text.Contains(text2.Replace(" ", "")))
				{
					continue;
				}
				for (int k = 0; k <= 3 && i + k < boxes.Count; k++)
				{
					decimal? result = TurkishNumberParser.Parse(boxes[i + k].Text);
					if (result.HasValue && result.Value > 0m)
					{
						return result;
					}
				}
			}
		}
		return null;
	}
}
