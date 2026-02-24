using G2Panda.HardwareBridge.Core.Models;

namespace G2Panda.HardwareBridge.Core.Interfaces;

public interface IPrintingService
{
    Task<bool> PrintAsync(PrintJob job);
    Task<bool> IsPrinterOnline(string printerName);
}
