using System;
using System.Collections.Generic;
using ReceiptApi.Models;

namespace ReceiptApi.Services;

public class ValidationEngine
{
	public ValidationResult Validate(ReceiptData data)
	{
		List<string> list = new List<string>();
		if (data.Total.HasValue && data.Total.Value.ToString("0").Length > 8)
		{
			list.Add("INVALID_TOTAL_LENGTH");
			data.Total = null;
		}
		if (data.Total.HasValue && data.VatRate.HasValue && data.VatAmount.HasValue)
		{
			decimal num = Math.Round(data.Total.Value - data.Total.Value / (1m + data.VatRate.Value / 100m), 2);
			decimal num2 = Math.Abs(num - data.VatAmount.Value);
			if (num2 > data.Total.Value * 0.02m && num2 > 2.0m)
			{
				list.Add("VAT_MISMATCH");
			}
		}
		if (data.Total.HasValue && data.Subtotal.HasValue && data.VatAmount.HasValue && Math.Abs(data.Subtotal.Value + data.VatAmount.Value - data.Total.Value) > 1.0m)
		{
			list.Add("SUBTOTAL_MISMATCH");
		}
		return new ValidationResult
		{
			IsValid = (list.Count == 0),
			Flags = list
		};
	}
}
