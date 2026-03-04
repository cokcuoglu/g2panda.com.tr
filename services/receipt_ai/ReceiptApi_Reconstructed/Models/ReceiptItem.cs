namespace ReceiptApi.Models;

public class ReceiptItem
{
	public string Name { get; set; } = string.Empty;

	public decimal? Quantity { get; set; } = 1m;

	public string Unit { get; set; } = "adet";

	public decimal? UnitPrice { get; set; }

	public decimal TotalPrice { get; set; }

	public decimal? VatRate { get; set; }
}
