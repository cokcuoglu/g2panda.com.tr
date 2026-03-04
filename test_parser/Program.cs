using System;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;
using ReceiptApi.Models;
using ReceiptApi.Services;

class Program
{
    static void Main()
    {
        string jsonPath = "d:\\Personal_Project\\g2panda_release\\tmp_ocr.json";
        if (!File.Exists(jsonPath)) {
            Console.WriteLine("File not found");
            return;
        }

        string jsonStr = File.ReadAllText(jsonPath);
        
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        
        // Deserialize as InferenceResponse
        var infRes = JsonSerializer.Deserialize<InferenceResponse>(jsonStr, options);
        var boxes = infRes?.Results;

        if (boxes == null) {
            Console.WriteLine("No boxes found in JSON");
            return;
        }

        var parser = new GrammarBasedOcrParser();
        var items = parser.ExtractItems(boxes);

        Console.WriteLine($"Extracted {items.Count} items.");
        foreach (var item in items)
        {
            Console.WriteLine($"Name: {item.Name} | Qty: {item.Quantity} | Unit: {item.UnitPrice} | Total: {item.TotalPrice} | VAT: {item.VatRate}");
        }
    }
}

namespace ReceiptApi.Models {
    public class InferenceResponse {
        public bool Success { get; set; }
        public List<BoundingBox> Results { get; set; }
    }
    public class BoundingBox {
        public string Text { get; set; }
        public float Confidence { get; set; }
        public float[][] Box { get; set; }
    }
    public class ReceiptData {
        public List<ReceiptItem> Items { get; set; } = new();
    }
    public class ReceiptItem {
        public string Name { get; set; } = string.Empty;
        public decimal? Quantity { get; set; }
        public string Unit { get; set; } = "adet";
        public decimal? UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal? VatRate { get; set; }
    }
}
