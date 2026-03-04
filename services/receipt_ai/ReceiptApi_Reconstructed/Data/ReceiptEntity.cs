using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ReceiptApi.Data;

public class ReceiptEntity
{
	[Key]
	public Guid Id { get; set; }

	public Guid BusinessId { get; set; }

	[MaxLength(1000)]
	public string? ImagePath { get; set; }

	[MaxLength(50)]
	public string Status { get; set; } = "Processing";

	public string? RawText { get; set; }

	public JsonDocument? ParsedJson { get; set; }

	[Column(TypeName = "decimal(5,4)")]
	public decimal OverallConfidence { get; set; }

	public List<string> ValidationFlags { get; set; } = new List<string>();

	public int ProcessingTimeMs { get; set; }

	public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
