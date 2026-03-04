using System.Collections.Generic;

namespace ReceiptApi.Models;

public class ValidationResult
{
	public bool IsValid { get; set; }

	public List<string> Flags { get; set; } = new List<string>();
}
