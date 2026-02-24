using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using G2Panda.HardwareBridge.Core.Interfaces;
using G2Panda.HardwareBridge.Core.Models;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace G2Panda.HardwareBridge.Communication.Services;

public class WebSocketService : ICommunicationService
{
    private readonly ILogger<WebSocketService> _logger;
    private readonly IConfigService _config;
    private readonly IPrintingService _printingService;
    private ClientWebSocket _webSocket = new();

    public bool IsConnected => _webSocket.State == WebSocketState.Open;

    public WebSocketService(ILogger<WebSocketService> logger, IConfigService config, IPrintingService printingService)
    {
        _logger = logger;
        _config = config;
        _printingService = printingService;
    }

    public async Task ConnectAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                if (!IsConnected)
                {
                    var uri = new Uri(_config.Config.ServerUrl);
                    _webSocket = new ClientWebSocket();
                    _logger.LogInformation("Connecting to {Uri}...", uri);
                    await _webSocket.ConnectAsync(uri, stoppingToken);
                    _logger.LogInformation("Connected!");

                    await SendRegistrationAsync(stoppingToken);
                    _ = ReceiveLoopAsync(stoppingToken);
                    _ = HeartbeatLoopAsync(stoppingToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "WebSocket connection failed. Retrying in 5s...");
            }

            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task SendRegistrationAsync(CancellationToken stoppingToken)
    {
        var payload = new
        {
            machineId = _config.Config.MachineId,
            restaurantId = _config.Config.RestaurantId,
            apiKey = _config.Config.ApiKey
        };

        var json = JsonConvert.SerializeObject(payload);
        var bytes = Encoding.UTF8.GetBytes(json);
        await _webSocket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, stoppingToken);
        _logger.LogInformation("Registration payload sent.");
    }

    private async Task ReceiveLoopAsync(CancellationToken stoppingToken)
    {
        var buffer = new byte[1024 * 4];
        while (IsConnected && !stoppingToken.IsCancellationRequested)
        {
            var result = await _webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), stoppingToken);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                await DisconnectAsync();
            }
            else
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                _logger.LogInformation("Received message: {Message}", message);

                try
                {
                    var parsed = JsonConvert.DeserializeObject<dynamic>(message);
                    string? type = parsed?.type;

                    if (type == "print")
                    {
                        string? content = parsed?.content;
                        if (!string.IsNullOrWhiteSpace(content))
                        {
                            var job = new PrintJob
                            {
                                PrinterName = _config.Config.DefaultPrinterName,
                                Content = content
                            };
                            await _printingService.PrintAsync(job);
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to process received message");
                }
            }
        }
    }

    private async Task HeartbeatLoopAsync(CancellationToken stoppingToken)
    {
        while (IsConnected && !stoppingToken.IsCancellationRequested)
        {
            try
            {
                var heartbeat = new { type = "heartbeat", timestamp = DateTime.UtcNow };
                var json = JsonConvert.SerializeObject(heartbeat);
                var bytes = Encoding.UTF8.GetBytes(json);
                await _webSocket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Heartbeat failed: {Message}", ex.Message);
            }
            await Task.Delay(30000, stoppingToken);
        }
    }

    public async Task DisconnectAsync()
    {
        if (IsConnected)
        {
            await _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
        }
        _webSocket.Dispose();
    }
}
