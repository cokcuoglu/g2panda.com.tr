using G2Panda.HardwareBridge.Core.Models;

namespace G2Panda.HardwareBridge.Core.Interfaces;

public interface IConfigService
{
    AppConfig Config { get; }
    void Load();
    void Save();
}
