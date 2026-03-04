using ReceiptApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace ReceiptApi.Services;

public class GrammarBasedOcrParser
{
    private readonly string[] _stopKeywords = { "TOPLAM", "KDV", "ODEME", "ÖDEME", "BANKA", "POS", "REF", "ONAY" };

    public List<ReceiptItem> ExtractItems(List<BoundingBox> boxes)
    {
        var items = new List<ReceiptItem>();
        if (boxes == null || !boxes.Any()) return items;

        // 1) Dynamic Y-Clustering based on average bounding box height
        float GetHeight(BoundingBox b) => b.Box.Max(p => p[1]) - b.Box.Min(p => p[1]);
        float avgHeight = boxes.Average(GetHeight);
        float threshold = avgHeight * 0.6f;

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
        ReceiptItem? activeItem = null;
        float lastPriceY = -9999f;
        
        // Math tolerance
        decimal TOLERANCE = 0.05m;

        foreach (var row in clusteredRows)
        {
            string text = row.Text;

            // Stop condition
            if (_stopKeywords.Any(k => text.Contains(k))) break;

            // Basic regex matching
            var priceMatch = Regex.Match(text, @"(\d+[\.,]\d{2})(?!\d)");
            var qtyMatch = Regex.Match(text, @"([\d,.]+)\s*(?:AD|KG|GR|ADET)?\s*[xX]\s*([\d,.]+)");
            if (!qtyMatch.Success) qtyMatch = Regex.Match(text, @"(\d+)\s*[xX]\s*");
            var vatMatch = Regex.Match(text, @"%(\d+)");

            bool isPriceLine = priceMatch.Success && !text.Contains(" X ") && !text.Contains(" KG") && !text.Contains(" GR");

            if (isPriceLine)
            {
                decimal? price = TurkishNumberParser.Parse(priceMatch.Groups[1].Value);
                if (price.HasValue)
                {
                    if (activeItem == null) 
                    {
                        continue;
                    }

                    // Extract inline VAT
                    decimal? inlineVat = null;
                    if (vatMatch.Success)
                    {
                        if (decimal.TryParse(vatMatch.Groups[1].Value, out decimal rate)) inlineVat = rate;
                    }

                    // Clean name
                    string cleanName = text.Replace(priceMatch.Value, "").Replace("%", "");
                    if (vatMatch.Success) cleanName = cleanName.Replace(vatMatch.Value, "");
                    if (qtyMatch.Success) cleanName = cleanName.Replace(qtyMatch.Value, "");
                    
                    cleanName = CleanName(cleanName);
                    if (cleanName.Any(char.IsLetter) && cleanName.Length > 2)
                    {
                        activeItem.Name = (activeItem.Name + " " + cleanName).Trim();
                    }

                    // Finalize Price and VAT
                    activeItem.TotalPrice = price.Value;
                    if (inlineVat.HasValue) activeItem.VatRate = inlineVat.Value;

                    // 5) Mathematical Validation
                    if (activeItem.Quantity.HasValue && activeItem.UnitPrice.HasValue)
                    {
                        decimal calculatedTotal = activeItem.Quantity.Value * activeItem.UnitPrice.Value;
                        if (Math.Abs(calculatedTotal - activeItem.TotalPrice) > TOLERANCE)
                        {
                            // "If not equal: Do NOT assign quantity to this item. Try attaching to previous item."
                            decimal qtyToMove = activeItem.Quantity.Value;
                            decimal unitPriceToMove = activeItem.UnitPrice.Value;
                            
                            activeItem.Quantity = null;
                            activeItem.UnitPrice = null;
                            
                            if (items.Any())
                            {
                                var prev = items.Last();
                                if (Math.Abs((qtyToMove * unitPriceToMove) - prev.TotalPrice) <= TOLERANCE)
                                {
                                    prev.Quantity = qtyToMove;
                                    prev.UnitPrice = unitPriceToMove;
                                }
                            }
                        }
                    }

                    items.Add(activeItem);
                    lastPriceY = row.YAvg;
                    activeItem = null; // Close product block immediately
                }
            }
            else if (qtyMatch.Success)
            {
                // "1) Quantity can only be assigned BEFORE price is detected."
                if (activeItem != null)
                {
                    decimal? qty = TurkishNumberParser.Parse(qtyMatch.Groups[1].Value);
                    if (qty.HasValue)
                    {
                        activeItem.Quantity = qty.Value;
                        if (qtyMatch.Groups.Count > 2)
                        {
                            activeItem.UnitPrice = TurkishNumberParser.Parse(qtyMatch.Groups[2].Value) ?? activeItem.UnitPrice;
                        }
                    }
                    
                    string cleanName = text.Replace(qtyMatch.Value, "");
                    cleanName = CleanName(cleanName);
                    if (cleanName.Any(char.IsLetter) && cleanName.Length > 2)
                    {
                        activeItem.Name = (activeItem.Name + " " + cleanName).Trim();
                    }
                }
            }
            else if (vatMatch.Success)
            {
                // "2) VAT can only be assigned AFTER price is detected." -> activeItem must be null (block closed)
                if (activeItem == null && items.Any())
                {
                    // "4) VAT must not be assigned if spatial distance from price row exceeds dynamic threshold."
                    float distanceY = Math.Abs(row.YAvg - lastPriceY);
                    if (distanceY <= avgHeight * 2.5f)
                    {
                        if (decimal.TryParse(vatMatch.Groups[1].Value, out decimal rate))
                        {
                            items.Last().VatRate = rate;
                        }
                    }
                }
                else if (activeItem != null)
                {
                    // "If VAT appears before a price for that product, ignore it."
                    string cleanName = text.Replace(vatMatch.Value, "").Replace("%", "");
                    cleanName = CleanName(cleanName);
                    if (cleanName.Any(char.IsLetter) && cleanName.Length > 2)
                    {
                        activeItem.Name = (activeItem.Name + " " + cleanName).Trim();
                    }
                }
            }
            else if (text.Any(char.IsLetter))
            {
                // Text Line
                string cleanName = CleanName(text);
                if (cleanName.Length > 2)
                {
                    if (activeItem == null)
                    {
                        activeItem = new ReceiptItem { Name = cleanName };
                    }
                    else
                    {
                        // "8) Multi-line product names must be merged UNTIL a price is found."
                        activeItem.Name = (activeItem.Name + " " + cleanName).Trim();
                    }
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
        name = Regex.Replace(name, @"^[*\.\s\d,xX\*]+", "").Trim(); 
        return name.Trim();
    }

    private class Row
    {
        public string Text { get; set; } = string.Empty;
        public IEnumerable<BoundingBox> Boxes { get; set; } = new List<BoundingBox>();
        public float YAvg { get; set; }
    }
}
