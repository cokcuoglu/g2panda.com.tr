using System;
using System.Collections.Generic;
using System.IO;
using G2Panda.HardwareBridge.Core.Interfaces;
using G2Panda.HardwareBridge.Core.Models;
using Newtonsoft.Json;

namespace G2Panda.HardwareBridge.Infrastructure.Services;

public class ConfigService : IConfigService
{
    private static readonly string ConfigDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "G2Panda");
    private static readonly string ConfigPath = Path.Combine(ConfigDir, "config.json");

    public AppConfig Config { get; private set; } = new();

    public void Load()
    {
        if (!Directory.Exists(ConfigDir))
        {
            Directory.CreateDirectory(ConfigDir);
        }

        if (!File.Exists(ConfigPath))
        {
            Config = new AppConfig
            {
                MachineId = Guid.NewGuid().ToString(),
                Printers = new List<PrinterConfig>()
            };
            Save();
            return;
        }

        var json = File.ReadAllText(ConfigPath);
        Config = JsonConvert.DeserializeObject<AppConfig>(json) ?? new AppConfig();
        
        if (string.IsNullOrEmpty(Config.MachineId))
        {
            Config.MachineId = Guid.NewGuid().ToString();
            Save();
        }
    }

    public void Save()
    {
        var json = JsonConvert.SerializeObject(Config, Formatting.Indented);
        File.WriteAllText(ConfigPath, json);
    }
}
