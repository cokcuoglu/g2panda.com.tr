using ReceiptApi.Models;
using System.Text.RegularExpressions;
using System.Linq;
using System.Text;

namespace ReceiptApi.Services;

public class OcrParserService
{
    private readonly string[] _toplamKeywords = { "TOPLAM", "TUTAR", "ODENEN", "ÖDENEN", "ODENECEK", "ÖDENECEK", "DAHIL TUTAR", "DAHİL TUTAR" };
    private readonly string[] _kdvKeywords = { "KDV", "TOPKDV", "TOP. KDV", "TOPLAM KDV", "KDV TUTAR" };
    private readonly string[] _araToplamKeywords = { "ARA TOP", "ARA TOPLAM", "MATRAH", "KDV MATRAHI" };

    private readonly GrammarBasedOcrParser _grammarParser;

    public OcrParserService(GrammarBasedOcrParser grammarParser)
    {
        _grammarParser = grammarParser;
    }

    public ReceiptData Parse(List<BoundingBox> boxes)
    {
        var data = new ReceiptData();
        
        if (boxes == null || boxes.Count == 0) return data;
        
        // Remove invalid boxes that would cause indexing crashes
        boxes = boxes.Where(b => b != null && b.Text != null && b.Box != null && b.Box.Count > 0 && b.Box.All(p => p != null && p.Count >= 2)).ToList();
        if (boxes.Count == 0) return data;

        // 0. Correct common OCR misidentifications (Turkish characters)
        TurkishOcrCorrector.CorrectBoxes(boxes);

        // 1. Sort boxes top-to-bottom, then left-to-right for reading order
        var sortedBoxes = boxes.OrderBy(b => b.Box[0][1]).ThenBy(b => b.Box[0][0]).ToList();
        
        string fullText = string.Join(" ", sortedBoxes.Select(b => b.Text).ToArray()).ToUpperInvariant();

        // 1.1 Generate RawText for UI fallback
        var sb = new StringBuilder();
        var groupedByLine = sortedBoxes
            .GroupBy(b => Math.Round(b.Box[0][1] / 12.0) * 12.0)
            .OrderBy(g => g.Key);
            
        foreach(var lineGrp in groupedByLine)
        {
            sb.AppendLine(string.Join(" ", lineGrp.OrderBy(b => b.Box[0][0]).Select(b => b.Text)));
        }
        data.RawText = sb.ToString();

        // 2. Identify Document Type (Invoice vs Receipt)
        data.DocumentType = 
            (fullText.Contains("FATURA") || fullText.Contains("E-ARŞİV")) ? "Invoice" : "Receipt";

        // 3. Extract Merchant Info
        // Take the first few lines, looking for something that is NOT "FATURA" or "Fiş"
        var merchantLines = sortedBoxes.Take(8)
            .Select(b => b.Text.Trim())
            .Where(t => t.Length > 3 && !t.Contains("FATURA") && !t.Contains("ARŞİV") && !t.Contains("SAYIN"))
            .ToList();
            
        if (merchantLines.Any())
        {
             // Usually the largest or first long line
             data.MerchantName = merchantLines.OrderByDescending(t => t.Length).First();
        }

        // 4. Extract Tax Number (VKN / TCKN)
        var vknMatch = Regex.Match(fullText, @"(VKN|TCKN|VERGI NO|VERGİ NO|KİMLİK NO)[:\s]*([0-9]{10,11})");
        if (vknMatch.Success) data.TaxNumber = vknMatch.Groups[2].Value;

        // 5. Extract Date and Time
        // Handling DD.MM.YYYY
        var dateMatch = Regex.Match(fullText, @"([0-3][0-9])[./-]([0-1][0-9])[./-](20[0-9]{2})");
        if (dateMatch.Success) data.Date = dateMatch.Value;
        
        // Handling HH:mm
        var timeMatch = Regex.Match(fullText, @"([0-2][0-9]):([0-5][0-9])");
        if (timeMatch.Success) data.Time = timeMatch.Value;

        // 6. Extract Items (Grammar based)
        data.Items = _grammarParser.ExtractItems(sortedBoxes);

        // 7. Extract Financials
        // Prioritize MUST-MATCH keywords for Total vs VAT to avoid collisions
        var specificTotalKeywords = new[] { "ODENECEK KDV DAHIL TUTAR", "ODENECEK KDV DAHİL TUTAR", "ODENEN TUTAR", "GENEL TOPLAM" };
        var genericTotalKeywords = new[] { "TOPLAM", "TUTAR", "ODENECEK", "ÖDENECEK" };
        var kdvKeywords = new[] { "TOPLAM KDV", "TOPKDV", "KDV TUTAR", "KDV" };

        // 7.1 Try specific total first
        data.Total = ExtractValueNearKeyword(sortedBoxes, specificTotalKeywords);
        
        // 7.2 Extract VAT (doing it early so we can use its keywords as exclusions for generic total)
        data.VatAmount = ExtractValueNearKeyword(sortedBoxes, kdvKeywords);

        // 7.3 If specific total failed, try generic total but EXCLUDE VAT keywords to prevent partial matches like "TOPLAM" matching "TOPLAM KDV"
        if (!data.Total.HasValue)
        {
            data.Total = ExtractValueNearKeyword(sortedBoxes, genericTotalKeywords, excludeKeywords: kdvKeywords);
        }

        data.Subtotal = ExtractValueNearKeyword(sortedBoxes, _araToplamKeywords);

        // 7.4 Fallback: If footer keywords failed, use the sum of parsed items
        if (!data.Total.HasValue && data.Items != null && data.Items.Any())
        {
             data.Total = data.Items.Sum(i => i.TotalPrice);
        }

        // Add Financial Summary to RawText for UI transparency
        string financialSummary = $"\n==============================\nGENEL TOPLAM: {data.Total?.ToString(System.Globalization.CultureInfo.InvariantCulture) ?? "Bulunamadı"} TL\nTOPLAM KDV: {data.VatAmount?.ToString(System.Globalization.CultureInfo.InvariantCulture) ?? "Bulunamadı"} TL\n==============================\n";

        if (data.Items != null && data.Items.Any())
        {
            var productLines = data.Items.Select(i => 
                $"{i.Name}\nMiktar: {i.Quantity?.ToString() ?? "1"} Birim Fiyat: {i.UnitPrice?.ToString() ?? i.TotalPrice.ToString()} TL\nToplam: {i.TotalPrice} TL (KDV: %{i.VatRate?.ToString() ?? "0"})"
            );
            string productText = string.Join("\n-----------------\n", productLines);
            data.RawText = $"[AI BULGULARI]\n{financialSummary}\n-----------------\n{productText}\n-----------------\n\n-----------------\n[HAM METIN]\n{data.RawText}";
        }
        else
        {
            data.RawText = $"[AI BULGULARI]\n{financialSummary}\n\n-----------------\n[HAM METIN]\n{data.RawText}";
        }

        // Fallback for Total: Sometimes it's the largest number at the bottom half
        if (!data.Total.HasValue)
        {
             var numbersInBottomHalf = sortedBoxes
                 .Skip(sortedBoxes.Count / 2)
                 .Select(b => TurkishNumberParser.Parse(b.Text))
                 .Where(v => v.HasValue)
                 .OrderByDescending(v => v.Value)
                 .ToList();
             if (numbersInBottomHalf.Any()) data.Total = numbersInBottomHalf.First();
        }

        // Logical safety netting for VAT: if VAT somehow grabbed the Grand Total box
        if (data.Total.HasValue && data.VatAmount.HasValue && data.VatAmount.Value >= data.Total.Value)
        {
             data.VatAmount = 0m;
        }

        // VAT Rate extraction
        var vatRateMatch = Regex.Match(fullText, @"%([0-9]{1,2})|([0-9]{1,2})\s*%");
        if (vatRateMatch.Success)
        {
             string rateStr = vatRateMatch.Groups[1].Value;
             if (string.IsNullOrEmpty(rateStr)) rateStr = vatRateMatch.Groups[2].Value;
             if (decimal.TryParse(rateStr, out decimal rate))
                 data.VatRate = rate;
        }

        return data;
    }

    private decimal? ExtractValueNearKeyword(List<BoundingBox> boxes, string[] keywords, string[] excludeKeywords = null)
    {
        // Sort keywords by length descending to match most specific first
        var sortedKeywords = keywords.OrderByDescending(k => k.Length).ToList();
        var cleanExclude = excludeKeywords?.Select(k => k.ToUpperInvariant().Replace(" ", "")).ToList();

        for (int i = 0; i < boxes.Count; i++)
        {
            string cleanText = boxes[i].Text.ToUpperInvariant().Replace(" ", "");
            
            // Check exclusions first (e.g., if looking for TOTAL, skip boxes that look like VAT)
            if (cleanExclude != null && cleanExclude.Any(ex => cleanText.Contains(ex))) continue;

            foreach (var k in sortedKeywords)
            {
                string cleanK = k.Replace(" ", "");
                if (cleanText.Contains(cleanK))
                {
                    // Look in current box, or next 5
                    for (int j = 0; j <= 5 && (i + j) < boxes.Count; j++)
                    {
                        var targetBox = boxes[i + j];
                        var numMatch = Regex.Match(targetBox.Text, @"\d+[\.,]\d{2}");
                        if (numMatch.Success) {
                            decimal? val = TurkishNumberParser.Parse(numMatch.Value);
                            if (val.HasValue && val.Value >= 0) return val;
                        } else {
                            decimal? val = TurkishNumberParser.Parse(targetBox.Text);
                            if (val.HasValue && val.Value >= 0) return val;
                        }
                    }
                }
            }
        }
        return null;
    }
}
