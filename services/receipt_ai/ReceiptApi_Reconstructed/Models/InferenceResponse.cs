using System.Collections.Generic;

namespace ReceiptApi.Models;

public class InferenceResponse
{
	public bool Success { get; set; }

	public List<BoundingBox>? Results { get; set; }

	public string? Error { get; set; }
}
