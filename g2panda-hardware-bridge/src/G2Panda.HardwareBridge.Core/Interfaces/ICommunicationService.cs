using System;
using System.Threading;
using System.Threading.Tasks;

namespace G2Panda.HardwareBridge.Core.Interfaces;

public interface ICommunicationService
{
    Task ConnectAsync(CancellationToken stoppingToken);
    Task DisconnectAsync();
    bool IsConnected { get; }
}
