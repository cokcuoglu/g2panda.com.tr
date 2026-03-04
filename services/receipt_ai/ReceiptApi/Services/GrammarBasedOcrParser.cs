using ReceiptApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace ReceiptApi.Services;

public class GrammarBasedOcrParser
{
    private readonly string[] _stopKeywords = { "TOPLAM", "KDV", "ODEME", "ÖDEME", "BANKA", "POS", "REF", "ONAY", "TUTAR", "TUTAL", "MATRAH", "ODENECEK", "ÖDENECEK", "DENECEK" };
    private readonly string[] _merchantKeywords = { "VKN", "TCKN", "ADRES", "FATURA", "MAGAZA", "MERSIS", "TEL:", "UNVAN", "SNO", "VERGI DAIRESI" };
    private readonly string[] _locationKeywords = { 
        "ISTANBUL", "İSTANBUL", "ANKARA", "IZMIR", "İZMIR", "BURSA", "ANTALYA", "ADANA", "KONYA", "GAZIANTEP", "ŞANLIURFA", "KOCAELI", "MERSIN", "DIYARBAKIR", 
        "BESIKTAS", "BEŞIKTAŞ", "SISLI", "ŞIŞLI", "KADIKOY", "KADIKÖY", "USKUDAR", "ÜSKÜDAR", "FATIH", "BEYOGLU", "BEYOĞLU", "BAKIRKOY", "BAKIRKÖY",
        "CEKMEKOY", "ÇEKMEKÖY", "MALTEPE", "KARTAL", "PENDIK", "TUZLA", "SARIYER", "EYUP", "EYÜP", "ATASEHIR", "ATAŞEHIR"
    };

    public List<ReceiptItem> ExtractItems(List<BoundingBox> boxes)
    {
        var items = new List<ReceiptItem>();
        if (boxes == null || !boxes.Any()) return items;

        // 1) Dynamic Y-Clustering based on average bounding box height
        float GetHeight(BoundingBox b) => b.Box.Max(p => p[1]) - b.Box.Min(p => p[1]);
        float avgHeight = boxes.Average(GetHeight);
        float threshold = avgHeight * 0.35f; // Extremely tight to separate slanted rows on BİM receipts

        var sortedBoxes = boxes.OrderBy(b => b.Box.Average(p => p[1])).ToList();
        var clusteredRows = new List<Row>();
        
        var currentRowBoxes = new List<BoundingBox>();
        float currentYAvg = sortedBoxes.First().Box.Average(p => p[1]);

        foreach (var box in sortedBoxes)
        {
            float boxY = box.Box.Average(p => p[1]);
            if (Math.Abs(boxY - currentYAvg) <= threshold)
            {
                currentRowBoxes.Add(box);
                currentYAvg = currentRowBoxes.Average(b => b.Box.Average(p => p[1]));
            }
            else
            {
                if (currentRowBoxes.Any())
                {
                    clusteredRows.Add(new Row { 
                        Boxes = currentRowBoxes.OrderBy(b => b.Box.Average(p => p[0])).ToList(),
                        YAvg = currentYAvg
                    });
                }
                currentRowBoxes = new List<BoundingBox> { box };
                currentYAvg = boxY;
            }
        }
        if (currentRowBoxes.Any())
        {
            clusteredRows.Add(new Row { 
                Boxes = currentRowBoxes.OrderBy(b => b.Box.Average(p => p[0])).ToList(),
                YAvg = currentYAvg
            });
        }

        foreach (var row in clusteredRows)
        {
            row.Text = string.Join(" ", row.Boxes.Select(b => b.Text)).ToUpperInvariant();
        }

        // 3) Strict Product Block State Machine
        // 3) Strict Product Block State Machine
        List<string> currentNameLines = new List<string>();
        float lastPriceY = -9999f;
        
        // Math tolerance
        decimal TOLERANCE = 0.05m;

        decimal? pendingQuantity = null;
        decimal? pendingUnitPrice = null;
        decimal? pendingVat = null;

        foreach (var row in clusteredRows)
        {
            float lastBoxY = row.YAvg;
            string text = row.Text;

            // Skip merchant header and location lines - but only if no price match is on this line
            bool hasPriceOnLine = Regex.IsMatch(text, @"\d+[\.,]\d{2}");
            bool isMerchantInfo = _merchantKeywords.Any(k => text.Contains(k));
            bool isLocationInfo = _locationKeywords.Any(k => text.Contains(k));

            if ((isMerchantInfo || isLocationInfo) && !hasPriceOnLine) {
                currentNameLines.Clear();
                continue;
            }

            // Stop condition: Only break if it STARTS with a stop keyword and no price is on the line
            // This allows stop keywords to exist as part of product names (e.g. "ALISVERIS POSETI ... TOPLAM KDV")
            // Stop condition: Only break if it STARTS with a stop keyword and no price is on the line
            // This allows stop keywords to exist as part of product names (e.g. "ALISVERIS POSETI ... TOPLAM KDV")
            bool startsWithStop = _stopKeywords.Any(k => Regex.IsMatch(text, @"^\s*\b" + k + @"\b"));
            if (startsWithStop && !hasPriceOnLine && items.Count > 0) break;

            // Truncate row text at the first occurrence of a stop keyword if it's NOT at the start
            // Use word boundaries to avoid cutting off "POSETI" due to "POS" keyword
            foreach (var k in _stopKeywords) {
                var match = Regex.Match(text, @"\b" + k + @"\b");
                if (match.Success && match.Index > 0) {
                    text = text.Substring(0, match.Index).Trim();
                    break;
                }
            }

            // Basic regex matching
            var priceMatches = Regex.Matches(text, @"(?:^|\s|\*|:)([0-9]{1,4}[\.,][0-9]{1,2})(?=\s|$|[a-zA-Z]|%)");
            var qtyMatch = Regex.Match(text, @"([\d,.]+)\s*(?:AD|KG|GR|ADET)?\s*[xX]\s*([\d,.]+)");
            if (!qtyMatch.Success) qtyMatch = Regex.Match(text, @"(?:^|\s)(\d+)\s*[xX]\s*");
            var vatMatch = Regex.Match(text, @"%(\d+)");

            // Ignore price match if the entire line looks like a quantity expression e.g. "3 AD X 31.00"
            // Restrict it to lines actually containing 'X' or 'AD'/'KG' etc. to avoid skipping plain "107.50"
            bool isQtyOnlyLine = Regex.IsMatch(text, @"^\s*[\d,.]+\s*(?:AD|KG|GR|ADET)?\s*[xX]\s*[\d,.]*\s*$");
            
            if (priceMatches.Count > 0 && !isQtyOnlyLine)
            {
                foreach (Match priceMatch in priceMatches)
                {
                    bool hasLettersOrPercent = text.Any(char.IsLetter) || text.Contains("%");
                    if (!hasLettersOrPercent && currentNameLines.Count == 0) continue;

                    decimal? price = TurkishNumberParser.Parse(priceMatch.Groups[1].Value);
                    if (!price.HasValue) continue;

                    // Extract inline VAT from row
                    decimal? inlineVat = null;
                    if (vatMatch.Success && decimal.TryParse(vatMatch.Groups[1].Value, out decimal r1)) inlineVat = r1;

                    // Extract inline Name part for this specific price match
                    string inlineName = text.Replace(priceMatch.Value, "").Replace("%", "");
                    if (vatMatch.Success) inlineName = inlineName.Replace(vatMatch.Value, "");
                    if (qtyMatch.Success) inlineName = inlineName.Replace(qtyMatch.Value, "");
                    
                    var splitMatch = Regex.Match(inlineName, @"\b(\d+[GgKkLltT]+)\s+([^\s].*)");
                    string nextItemNameBuffer = null;
                    if (splitMatch.Success && splitMatch.Groups.Count >= 3)
                    {
                        int idx = splitMatch.Groups[2].Index;
                        nextItemNameBuffer = inlineName.Substring(idx).Trim();
                        inlineName = inlineName.Substring(0, idx).Trim();
                    }

                    inlineName = CleanName(inlineName);
                    if (nextItemNameBuffer != null) nextItemNameBuffer = CleanName(nextItemNameBuffer);

                    if (inlineName.Any(char.IsLetter) && inlineName.Length > 2)
                    {
                        var parts = inlineName.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                        if (currentNameLines.Count == 0 || parts.Length > 3)
                        {
                            currentNameLines.Add(inlineName);
                        }
                        else if (nextItemNameBuffer == null)
                        {
                            nextItemNameBuffer = inlineName;
                        }
                    }

                    // Look for VAT in name buffer if not inline or pending
                    decimal finalVat = inlineVat ?? pendingVat ?? 0m;
                    if (finalVat == 0m) {
                        for (int i = 0; i < currentNameLines.Count; i++) {
                            var nl = currentNameLines[i];
                            var nmVatMatch = Regex.Match(nl, @"%(\d+)");
                            if (nmVatMatch.Success && decimal.TryParse(nmVatMatch.Groups[1].Value, out decimal r2)) {
                                finalVat = r2;
                                currentNameLines[i] = nl.Remove(nmVatMatch.Index, nmVatMatch.Length).Trim();
                                break;
                            }
                        }
                    }

                    // OCR % Sign Miss Fallback -> Extract 1, 8, 10, 18, 20 at the end of the name
                    if (finalVat == 0m && currentNameLines.Count > 0) {
                        var lastLine = currentNameLines.Last();
                        var fallbackVatMatch = Regex.Match(lastLine, @"(?:\s|^)(1|8|10|18|20)[\.,]*$");
                        if (fallbackVatMatch.Success && decimal.TryParse(fallbackVatMatch.Groups[1].Value, out decimal r3)) {
                            finalVat = r3;
                            currentNameLines[currentNameLines.Count - 1] = lastLine.Remove(fallbackVatMatch.Index, fallbackVatMatch.Length).Trim();
                        }
                    }

                    // Turkish VAT Law Enforcement: Retail 0% is not allowed. Assumes missing percentages are mostly 20 or 1.
                    if (finalVat == 0m) {
                        string combinedName = string.Join(" ", currentNameLines).ToUpperInvariant();
                        if (combinedName.Contains("POSET") || combinedName.Contains("POŞET"))
                        {
                            finalVat = 20m; // Plastic bags always subject to standard tax
                        }
                        else if (combinedName.Contains("SUT") || combinedName.Contains("SÜT") || combinedName.Contains("PEYN") ||
                            combinedName.Contains("EKMEK") || combinedName.Contains("SU ") || combinedName.Contains(" ET") ||
                            combinedName.Contains("TAVUK") || combinedName.Contains("MEYVE") || combinedName.Contains("SEBZE") ||
                            combinedName.Contains("MUZ") || combinedName.Contains("ELMA") || combinedName.Contains("GIDA") || 
                            combinedName.Contains("PİLİÇ") || combinedName.Contains("YUMURTA") || combinedName.Contains("PASTA") ||
                            combinedName.Contains("KREM"))
                        {
                            finalVat = 1m; // 1% VAT for basic groceries
                        }
                        else
                        {
                            finalVat = 20m; // Generic non-food rate
                        }
                    }

                    // Construct final Name from buffer
                    if (currentNameLines.Count == 0 && !hasLettersOrPercent && string.IsNullOrWhiteSpace(inlineName)) continue; 
                    
                    var finalNameList = currentNameLines.ToList();
                    if (!string.IsNullOrWhiteSpace(inlineName)) finalNameList.Add(inlineName);
                    if (finalNameList.Count == 0) finalNameList.Add("Ürün");
                    
                    string finalNameStr = string.Join(" ", finalNameList);

                    var product = new ReceiptItem {
                        Name = CleanName(finalNameStr),
                        Quantity = pendingQuantity,
                        UnitPrice = pendingUnitPrice,
                        TotalPrice = price.Value,
                        VatRate = finalVat,
                        Unit = "adet"
                    };

                    items.Add(product);
                    lastPriceY = lastBoxY;

                    // Reset State
                    currentNameLines.Clear();
                    if (nextItemNameBuffer != null) currentNameLines.Add(nextItemNameBuffer);
                    pendingQuantity = null;
                    pendingUnitPrice = null;
                    pendingVat = null;
                }
            }
            else
            {
                string remainingText = text;

                // 1. Quantity Check
                if (qtyMatch.Success)
                {
                    decimal? qty = TurkishNumberParser.Parse(qtyMatch.Groups[1].Value);
                    if (qty.HasValue)
                    {
                        pendingQuantity = qty.Value;
                        if (qtyMatch.Groups.Count > 2) pendingUnitPrice = TurkishNumberParser.Parse(qtyMatch.Groups[2].Value) ?? pendingUnitPrice;
                    }
                    remainingText = remainingText.Replace(qtyMatch.Value, "");
                }

                // 2. VAT Check
                if (vatMatch.Success)
                {
                    if (decimal.TryParse(vatMatch.Groups[1].Value, out decimal rate))
                    {
                        pendingVat = rate;
                    }
                    remainingText = remainingText.Replace(vatMatch.Value, "");
                }

                // 3. Collect remaining text for product name
                string cleanName = CleanName(remainingText);
                if (cleanName.Any(char.IsLetter) && cleanName.Length > 2)
                {
                    currentNameLines.Add(cleanName);
                }
            }
        }

        // Post-processing: Mathematical Validation
        foreach (var item in items)
        {
            if (item.Quantity.HasValue && item.UnitPrice.HasValue)
            {
                decimal calculatedTotal = item.Quantity.Value * item.UnitPrice.Value;
                if (Math.Abs(calculatedTotal - item.TotalPrice) > TOLERANCE)
                {
                    // Invalid quantity/price match, revert to 1x TotalPrice
                    item.Quantity = null;
                    item.UnitPrice = null;
                }
            }
        }

        // Post-processing: Max Price Heuristic to filter summary totals
        if (items.Count > 0)
        {
            decimal maxPrice = items.Max(i => i.TotalPrice);
            // If the max price item is at the very end and contains a stop keyword, it's almost certainly the Total
            var lastItems = items.Where(i => i.TotalPrice == maxPrice).ToList();
            foreach (var lastItem in lastItems)
            {
                bool isLikelyTotal = _stopKeywords.Any(k => lastItem.Name.Contains(k, StringComparison.OrdinalIgnoreCase)) || 
                                     lastItem.Name.Contains("DENECEK") || 
                                     lastItem.Name.Equals("Ürün");
                
                if (isLikelyTotal && (items.IndexOf(lastItem) >= items.Count - 2))
                {
                    items.Remove(lastItem);
                }
            }
        }

        return items;
    }

    private string CleanName(string name)
    {
        // "1) product_name MUST NOT contain: %, decimal numbers, quantity expressions, VAT values"
        name = Regex.Replace(name, @"%\d*", ""); 
        name = Regex.Replace(name, @"\d+[\.,]\d{2}", ""); 
        name = Regex.Replace(name, @"\d+\s*(?:AD|KG|GR|ADET)?\s*[xX]\s*", ""); 
        name = Regex.Replace(name, @"^\s*[*\.\s,xX\*]+\s*", "").Trim(); 
        
        // Strip trailing digits only if they are separate words and not attached to a letter
        // This preserves "150G" but removes " 1" or " 1."
        name = Regex.Replace(name, @"\b\d+[\.,]?$", "").Trim();
        // Strip leading floating numbers (like "1. ")
        name = Regex.Replace(name, @"^\d+[\.,]?\s+", "").Trim();

        // New: Strip Location Keywords from name if they spilled over
        foreach (var loc in _locationKeywords) {
            name = Regex.Replace(name, @"\b" + loc + @"\d*\b", "", RegexOptions.IgnoreCase).Trim();
        }

        return name.Trim();
    }

    private class Row
    {
        public string Text { get; set; } = string.Empty;
        public IEnumerable<BoundingBox> Boxes { get; set; } = new List<BoundingBox>();
        public float YAvg { get; set; }
    }
}
