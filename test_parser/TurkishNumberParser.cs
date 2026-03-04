using System.Text.RegularExpressions;

namespace ReceiptApi.Services;

public static class TurkishNumberParser
{
    public static decimal? Parse(string text)
    {
        // 1. Clean accidental spaces or OCR artifacts (e.g. currency symbols)
        text = Regex.Replace(text, @"[^0-9.,-]", "");
        
        if (string.IsNullOrWhiteSpace(text)) return null;

        // 2. Check for typical Turkish format: DD.DDD,DD
        if (text.Contains('.') && text.Contains(','))
        {
            int lastDot = text.LastIndexOf('.');
            int lastComma = text.LastIndexOf(',');
            
            if (lastComma > lastDot)
            {
                // Format is 1.234,56 -> Remove dots, replace comma with dot
                text = text.Replace(".", "").Replace(',', '.');
            }
            else
            {
                // OCR Error: mixed up format like 1,234.56
                text = text.Replace(",", "");
            }
        }
        else if (text.Contains(','))
        {
            // Format is 1234,56 -> Replace comma with dot
            text = text.Replace(',', '.');
        }
        else if (text.Split('.').Length > 2)
        {
            // Format is 1.234.567 -> Remove all but the last dot
            int lastDotIndex = text.LastIndexOf('.');
            text = text.Substring(0, lastDotIndex).Replace(".", "") + "." + text.Substring(lastDotIndex + 1);
        }
            
        if (decimal.TryParse(text, System.Globalization.CultureInfo.InvariantCulture, out decimal val))
        {
            // 3. Plausibility Check (Restaurant receipt totals shouldn't reasonably exceed 1,000,000 TRY)
            if (val > 1000000m || val < 0m) return null;
            return val;
        }
        return null;
    }
}
