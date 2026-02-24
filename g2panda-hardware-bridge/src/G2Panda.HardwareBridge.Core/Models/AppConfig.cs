using System;
using System.Collections.Generic;

namespace G2Panda.HardwareBridge.Core.Models;

public class AppConfig
{
    public string RestaurantId { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string MachineId { get; set; } = string.Empty;
    public string ServerUrl { get; set; } = "wss://api.g2panda.com/hardware/connect";
    public string DefaultPrinterName { get; set; } = "TestPrinter";
    public List<PrinterConfig> Printers { get; set; } = new();
}

public class PrinterConfig
{
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "USB"; // USB or Network
    public string Endpoint { get; set; } = string.Empty; // e.g. "COM1" or "192.168.1.100"
    public bool IsDefault { get; set; }
}
