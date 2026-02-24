using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using G2Panda.HardwareBridge.Core.Interfaces;
using G2Panda.HardwareBridge.Core.Models;
using G2Panda.HardwareBridge.Printing.Utils;
using Microsoft.Extensions.Logging;

namespace G2Panda.HardwareBridge.Printing.Services;

public class PrintingService : IPrintingService
{
    private readonly ILogger<PrintingService> _logger;
    private readonly ConcurrentQueue<PrintJob> _queue = new();
    private readonly CancellationTokenSource _cts = new();
    private static readonly string LogDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "G2Panda", "temp");

    public PrintingService(ILogger<PrintingService> logger)
    {
        _logger = logger;
        Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        
        if (!Directory.Exists(LogDir)) Directory.CreateDirectory(LogDir);
        
        Task.Run(ProcessQueueAsync);
    }

    public Task<bool> PrintAsync(PrintJob job)
    {
        _queue.Enqueue(job);
        _logger.LogInformation("Job {JobId} enqueued for printer {Printer}", job.Id, job.PrinterName);
        return Task.FromResult(true);
    }

    private async Task ProcessQueueAsync()
    {
        while (!_cts.Token.IsCancellationRequested)
        {
            if (_queue.TryDequeue(out var job))
            {
                try
                {
                    await ExecutePrintAsync(job);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error executing print job {JobId}", job.Id);
                }
            }
            await Task.Delay(100);
        }
    }

    private async Task ExecutePrintAsync(PrintJob job)
    {
        _logger.LogInformation("Processing job {JobId}: {Printer}", job.Id, job.PrinterName);

        byte[] data;
        if (job.Content == "INTERNAL_TEST_RECEIPT")
        {
            data = GenerateTestReceipt();
        }
        else
        {
            // Base64 check or raw string
            try {
                data = Convert.FromBase64String(job.Content);
            } catch {
                data = Encoding.UTF8.GetBytes(job.Content);
            }
        }

        // 1. Save to Debug File
        string debugPath = Path.Combine(LogDir, $"print_{DateTime.Now:yyyyMMdd_HHmmss}.bin");
        await File.WriteAllBytesAsync(debugPath, data);

        // 2. Real Printing
        bool success = false;
        
        // Check if it's an IP (Network Printer)
        if (IsIpAddress(job.PrinterName))
        {
            success = await PrintToNetworkAsync(job.PrinterName, data);
        }
        else
        {
            // Local USB/Driver Printer
            success = RawPrinterHelper.SendBytesToPrinter(job.PrinterName, data, out var error);
            if (!success) _logger.LogWarning("Printer Detail Error: {Error}", error);
        }

        if (success) {
            _logger.LogInformation("Job {JobId} printed successfully to {Printer}.", job.Id, job.PrinterName);
        } else {
            _logger.LogWarning("Job {JobId} FAILED to print to {Printer}. Verify printer name/connection.", job.Id, job.PrinterName);
        }
    }

    private bool IsIpAddress(string name)
    {
        return System.Net.IPAddress.TryParse(name, out _);
    }

    private async Task<bool> PrintToNetworkAsync(string ip, byte[] data)
    {
        try
        {
            using var client = new TcpClient();
            var connectTask = client.ConnectAsync(ip, 9100);
            if (await Task.WhenAny(connectTask, Task.Delay(5000)) == connectTask)
            {
                using var stream = client.GetStream();
                await stream.WriteAsync(data, 0, data.Length);
                return true;
            }
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Network print failed for IP {IP}", ip);
            return false;
        }
    }

    private byte[] GenerateTestReceipt()
    {
        return new EscPosBuilder()
            .Initialize()
            .Align(1) // Center
            .SetFontSize(2)
            .Bold(true)
            .PrintLine("G2PANDA")
            .SetFontSize(1)
            .PrintLine("Local Hardware Bridge")
            .Separator()
            .Align(0) // Left
            .Bold(false)
            .PrintLine("Tarih: " + DateTime.Now.ToString("G"))
            .PrintLine("Status: BAGLI / ONLINE")
            .Separator()
            .Bold(true)
            .PrintLine("TEST BASKISI BASARILI")
            .Bold(false)
            .PrintLine("Turkce Karakter Testi:")
            .PrintLine("ığüşöç İĞÜŞÖÇ")
            .Feed(5)
            .Cut()
            .Build();
    }

    public Task<bool> IsPrinterOnline(string printerName)
    {
        return Task.FromResult(true);
    }
}
