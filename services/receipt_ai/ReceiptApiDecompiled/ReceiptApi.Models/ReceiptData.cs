using System.Collections.Generic;

namespace ReceiptApi.Models;

public class ReceiptData
{
	public string? DocumentType { get; set; }

	public string? MerchantName { get; set; }

	public string? TaxOffice { get; set; }

	public string? TaxNumber { get; set; }

	public string? Date { get; set; }

	public string? Time { get; set; }

	public decimal? VatRate { get; set; }

	public decimal? VatAmount { get; set; }

	public decimal? Subtotal { get; set; }

	public decimal? Total { get; set; }

	public string Currency { get; set; } = "TRY";

	public string? PaymentMethod { get; set; }

	public string? BankName { get; set; }

	public string? MaskedCard { get; set; }

	public List<ReceiptItem> Items { get; set; } = new List<ReceiptItem>();

	public string? RawText { get; set; }
}
