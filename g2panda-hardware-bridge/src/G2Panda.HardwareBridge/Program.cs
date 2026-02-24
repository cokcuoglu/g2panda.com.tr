using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using G2Panda.HardwareBridge;
using G2Panda.HardwareBridge.Communication.Services;
using G2Panda.HardwareBridge.Core.Interfaces;
using G2Panda.HardwareBridge.Infrastructure.Services;
using G2Panda.HardwareBridge.Printing.Services;
using Serilog;

var builder = Host.CreateApplicationBuilder(args);

// Register Windows Service
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "G2PandaHardwareBridge";
});

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File(@"C:\ProgramData\G2Panda\logs\log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog();

// Register Services
builder.Services.AddSingleton<IConfigService, ConfigService>();
builder.Services.AddSingleton<IPrintingService, PrintingService>();
builder.Services.AddSingleton<ICommunicationService, WebSocketService>();
builder.Services.AddHostedService<Worker>();

var host = builder.Build();

// Load Config
using (var scope = host.Services.CreateScope())
{
    var configService = scope.ServiceProvider.GetRequiredService<IConfigService>();
    configService.Load();
}

host.Run();
