using System.Collections.Generic;

namespace ReceiptApi.Models;

public class BoundingBox
{
	public string Text { get; set; } = string.Empty;

	public float Confidence { get; set; }

	public List<List<float>> Box { get; set; } = new List<List<float>>();
}
