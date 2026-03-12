using ReceiptApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace ReceiptApi.Services;

public class GrammarBasedOcrParser
{
    private readonly string[] _stopKeywords = { "TOPLAM", "TOPKDV", "GENEL TOPLAM", "ARA TOPLAM", "ODENEN", "KDV", "ODEME", "ÖDEME", "BANKA", "POS", "REF", "ONAY", "TUTAR", "TUTAL", "MATRAH", "ODENECEK", "ÖDENECEK", "DENECEK", "KREDI", "NAKIT", "TARIH", "TARİH", "SAAT", "FIS NO", "FİŞ NO", "GIB", "E-BELGE", "KDV TUTAR" };
    private readonly string[] _merchantKeywords = { "VKN", "TCKN", "ADRES", "FATURA", "MAGAZA", "MERSIS", "TEL:", "UNVAN", "SNO", "VERGI DAIRESI", "E-ARSIV", "E-ARŞIV", "IRSALIYE", "IRSALİYE", "SAYIN" };
    private readonly string[] _locationKeywords = { 
        "ISTANBUL", "İSTANBUL", "ANKARA", "IZMIR", "İZMİR", "BURSA", "ANTALYA", "ADANA", "KONYA", "GAZIANTEP", "ŞANLIURFA", "KOCAELI", "MERSIN", "DIYARBAKIR", 
        "BESIKTAS", "BEŞIKTAŞ", "SISLI", "ŞIŞLI", "KADIKOY", "KADIKÖY", "USKUDAR", "ÜSKÜDAR", "FATIH", "BEYOGLU", "BEYOĞLU", "BAKIRKOY", "BAKIRKÖY",
        "CEKMEKOY", "ÇEKMEKÖY", "MALTEPE", "KARTAL", "PENDIK", "TUZLA", "SARIYER", "EYUP", "EYÜP", "ATASEHIR", "ATAŞEHİR"
    };

    public List<ReceiptItem> ExtractItems(List<BoundingBox> boxes)
    {
        var items = new List<ReceiptItem>();
        try {
            if (boxes == null || !boxes.Any()) return items;

            // 1) Dynamic Y-Clustering based on average bounding box height
            float GetHeight(BoundingBox b) => b.Box.Max(p => p[1]) - b.Box.Min(p => p[1]);
            float avgHeight = boxes.Average(GetHeight);
            float threshold = avgHeight * 0.40f; // Slightly more relaxed for BİM dot-matrix and slanted RECEIPTS

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

                // Stop condition: Break if it STARTS with a stop keyword.
                // Or if it contains definitive summary text like TOPKDV, TOPLAM, ARA TOPLAM
                bool startsWithStop = _stopKeywords.Any(k => Regex.IsMatch(text, @"^\s*\b" + k + @"\b"));
                bool isDefinitiveSummary = text.Contains("TOPKDV") || text.Contains("TOPLAM") || text.Contains("ARA TOP") || text.Contains("KREDI") || text.Contains("NAKIT");
                
                // If it's a definitive summary line OR starts with a stop keyword without a price, we are in the totals section
                if ((isDefinitiveSummary || (startsWithStop && !hasPriceOnLine)) && items.Count > 0) break;

                // Truncate row text at the first occurrence of a stop keyword if it's NOT at the start
                // Use word boundaries to avoid cutting off "POSETI" due to "POS" keyword
                // Also ignore stop keywords if they are part of a longer word (e.g. POS vs POSETI)
                foreach (var k in _stopKeywords) {
                    var match = Regex.Match(text, @"\b" + Regex.Escape(k) + @"\b");
                    if (match.Success && match.Index > 0) {
                        // Special exception for POSET/POŞET: Do not truncate if it's a bag
                        if (text.Contains("POSET") || text.Contains("POŞET")) continue;
                        
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
                        if (priceMatch.Groups.Count < 2) continue;
                        bool hasLettersOrPercent = text.Any(char.IsLetter) || text.Contains("%");
                        if (!hasLettersOrPercent && currentNameLines.Count == 0) continue;

                        decimal? price = TurkishNumberParser.Parse(priceMatch.Groups[1].Value);
                        if (!price.HasValue) continue;

                        // Extract inline VAT from row
                        decimal? inlineVat = null;
                        if (vatMatch.Success && vatMatch.Groups.Count >= 2 && decimal.TryParse(vatMatch.Groups[1].Value, out decimal r1)) inlineVat = r1;

                        // Extract inline Name part for this specific price match
                        string inlineName = text.Replace(priceMatch.Value, "").Replace("%", "");
                        if (vatMatch.Success) inlineName = inlineName.Replace(vatMatch.Value, "");
                        if (qtyMatch.Success) inlineName = inlineName.Replace(qtyMatch.Value, "");
                        
                        var splitMatch = Regex.Match(inlineName, @"\b(\d+[GgKkLltT]+)\s+([^\s].*)");
                        string nextItemNameBuffer = null;
                        if (splitMatch.Success && splitMatch.Groups.Count >= 3)
                        {
                            var group2 = splitMatch.Groups[2];
                            int idx = group2.Index;
                            if (idx >= 0 && idx < inlineName.Length) {
                                nextItemNameBuffer = inlineName.Substring(idx).Trim();
                                inlineName = inlineName.Substring(0, idx).Trim();
                            }
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
                        decimal finalVat = inlineVat ?? pendingVat ?? -1m;
                        if (finalVat == -1m) {
                            for (int i = 0; i < currentNameLines.Count; i++) {
                                var nl = currentNameLines[i];
                                var nmVatMatch = Regex.Match(nl, @"%(\d+)");
                                if (nmVatMatch.Success && nmVatMatch.Groups.Count >= 2 && decimal.TryParse(nmVatMatch.Groups[1].Value, out decimal r2)) {
                                    finalVat = r2;
                                    if (nmVatMatch.Index >= 0 && (nmVatMatch.Index + nmVatMatch.Length) <= nl.Length) {
                                        currentNameLines[i] = nl.Remove(nmVatMatch.Index, nmVatMatch.Length).Trim();
                                    }
                                    break;
                                }
                            }
                        }

                        // Turkish VAT Law Enforcement Check
                        // Category Mapping:
                        // 1% (Food): MUZ, SUT, GIDA, PASTA TABANI, PEYNIR, EKMEK, etc.
                        // 20% (Standard/Hygiene): TUVALET KAGID, SABUN, DETERJAN, POSET, and standard retail.
                        // Valid rates: 1, 10, 20. Reject 0.
                        
                        string combinedName = string.Join(" ", currentNameLines).ToUpperInvariant();
                        bool isFood = combinedName.Contains("SUT") || combinedName.Contains("SÜT") || combinedName.Contains("PEYN") ||
                                      combinedName.Contains("EKMEK") || combinedName.Contains("SU ") || combinedName.Contains(" ET") ||
                                      combinedName.Contains("TAVUK") || combinedName.Contains("MEYVE") || combinedName.Contains("SEBZE") ||
                                      combinedName.Contains("MUZ") || combinedName.Contains("ELMA") || combinedName.Contains("GIDA") || 
                                      combinedName.Contains("PİLİÇ") || combinedName.Contains("YUMURTA") || combinedName.Contains("PASTA") ||
                                      combinedName.Contains("KREM") || combinedName.Contains("TABAN") || combinedName.Contains("GIDA");

                        bool isHygiene = combinedName.Contains("KAGID") || combinedName.Contains("KAĞID") || 
                                         combinedName.Contains("SABUN") || combinedName.Contains("DETERJAN") || 
                                         combinedName.Contains("SAMPUAN") || combinedName.Contains("ŞAMPUAN");

                        if (isFood) {
                            finalVat = 1m;
                        } else if (isHygiene || combinedName.Contains("POSET") || combinedName.Contains("POŞET")) {
                            finalVat = 20m;
                        } else {
                            // Valid scales: 1, 10, 20. Default to 20 if OCR read something else or 0.
                            if (finalVat != 1m && finalVat != 10m && finalVat != 20m) {
                                finalVat = 20m;
                            }
                        }

                        // Construct final Name from buffer
                        if (currentNameLines.Count == 0 && !hasLettersOrPercent && string.IsNullOrWhiteSpace(inlineName)) continue; 
                        
                        var finalNameList = currentNameLines.ToList();
                        string cleanInline = CleanName(inlineName);
                        if (!string.IsNullOrWhiteSpace(cleanInline) && !finalNameList.Any(n => n.Equals(cleanInline, StringComparison.OrdinalIgnoreCase))) 
                        {
                            finalNameList.Add(cleanInline);
                        }
                        if (finalNameList.Count == 0) finalNameList.Add("Ürün");
                        
                        string finalNameStr = string.Join(" ", finalNameList);

                        // Special BİM / Retail Cleaning (Dot matrix artifact fixes)
                        finalNameStr = Regex.Replace(finalNameStr, @"\b(\d+)Lİ\b", "$1LI");
                        finalNameStr = Regex.Replace(finalNameStr, @"\b(\d+)LI\b", "$1 LI"); // Ensure space e.g. 16 LI instead of 16LI
                        finalNameStr = finalNameStr.Replace("PSTAKRMASI", "PASTA KREMASI").Replace("KREMSANTI", "KREM SANTI");

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
                            if (qtyMatch.Groups.Count > 2) {
                                var unitPriceRaw = qtyMatch.Groups[2].Value;
                                if (unitPriceRaw.Contains(".")) pendingUnitPrice = TurkishNumberParser.Parse(unitPriceRaw);
                            }
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
                        // Prevent duplicate metadata lines if they slip through
                        if (!_merchantKeywords.Any(k => cleanName.Contains(k)) && !_stopKeywords.Any(k => cleanName.Contains(k)))
                        {
                            currentNameLines.Add(cleanName);
                        }
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
        }
        catch (Exception ex) {
            Console.WriteLine($"[EXTRACT_ITEMS_ERROR] {ex.Message}");
            Console.WriteLine(ex.StackTrace);
        }

        return items;
    }

    private string CleanName(string name)
    {
        // "1) product_name MUST NOT contain: %, decimal numbers, quantity expressions, VAT values"
        name = Regex.Replace(name, @"%\d*", ""); 
        name = Regex.Replace(name, @"\d+[\.,]\d{2}", ""); 
        name = Regex.Replace(name, @"\d+\s*(?:AD|KG|GR|ADET)?\s*[xX]\s*", ""); 

        // Strip metadata labels that might leak into names
        name = Regex.Replace(name, @"\b(TARIH|TARİH|SAAT|FIS NO|FİŞ NO)\b", "", RegexOptions.IgnoreCase);

        name = Regex.Replace(name, @"^\s*[*\.\s,xX\*:]+\s*", "").Trim(); 
        
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
