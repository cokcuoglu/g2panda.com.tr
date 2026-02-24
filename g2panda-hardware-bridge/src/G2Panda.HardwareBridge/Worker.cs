using System;
using System.Threading;
using System.Threading.Tasks;
using G2Panda.HardwareBridge.Core.Interfaces;
using G2Panda.HardwareBridge.Core.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace G2Panda.HardwareBridge;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly ICommunicationService _communicationService;
    private readonly IPrintingService _printingService;
    private readonly IConfigService _configService;

    public Worker(
        ILogger<Worker> logger, 
        ICommunicationService communicationService, 
        IPrintingService printingService,
        IConfigService configService)
    {
        _logger = logger;
        _communicationService = communicationService;
        _printingService = printingService;
        _configService = configService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("G2Panda Hardware Bridge starting at: {time}", DateTimeOffset.Now);
        
        // Örnek baskı komutunu başlangıçta gönderelim
        await TriggerTestPrint();

        await _communicationService.ConnectAsync(stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }
    }

    private async Task TriggerTestPrint()
    {
        var printerName = _configService.Config.DefaultPrinterName;
        _logger.LogInformation("Test baskısı kuyruğa ekleniyor... Hedef Yazıcı: {Printer}", printerName);
        
        await _printingService.PrintAsync(new PrintJob 
        { 
            PrinterName = printerName, 
            Content = "INTERNAL_TEST_RECEIPT" 
        });
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Shutting down gracefully...");
        await _communicationService.DisconnectAsync();
        await base.StopAsync(cancellationToken);
    }
}
