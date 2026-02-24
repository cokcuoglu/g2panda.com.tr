using System;

namespace G2Panda.HardwareBridge.Core.Models;

public class PrintJob
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string PrinterName { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty; // Base64 or Templated JSON
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int RetryCount { get; set; }
}
