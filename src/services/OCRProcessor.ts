import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import logger from '../config/logger';

export interface Box {
    box: [[number, number], [number, number], [number, number], [number, number]];
    text: string;
    confidence: number;
}

export interface LineItem {
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    vat_rate: number | null;
    vat_amount: number | null;
    confidence: number;
}

export interface VATSummary {
    rate: number;
    taxable_amount: number;
    vat_amount: number;
}

export interface OCRProcessingResult {
    merchant_name: string;
    tax_number: string | null;
    date: string | null;
    time: string | null;
    items: LineItem[];
    subtotal: number;
    vat_breakdown: VATSummary[];
    total_vat: number;
    total: number;
    payment_type: string | null;
    mathematical_validation: {
        items_match_subtotal: boolean;
        vat_match_total: boolean;
        overall_consistency: boolean;
    };
    confidence_score: number;
    requires_review: boolean;
}

export class OCRProcessor {
    private static readonly PYTHON_PATH = process.env.PYTHON_PATH || 'py';
    private static readonly BRIDGE_PATH = path.join(__dirname, '../../scripts/paddle_ocr_bridge.py');

    /**
     * Main pipeline entry
     */
    async process(imagePath: string): Promise<OCRProcessingResult> {
        try {
            // 1. Preprocess
            const enhancedPath = await this.preprocess(imagePath);

            // 2. OCR via Python Bridge
            const rawBoxes = await this.runPaddleOCR(enhancedPath);

            // Cleanup enhanced image
            if (enhancedPath !== imagePath) {
                fs.unlinkSync(enhancedPath);
            }

            // 3. Extraction & Grouping
            const intermediateData = this.groupAndExtract(rawBoxes);

            // 4. VAT Allocation & Validation
            const finalized = this.finalizeResult(intermediateData);

            return finalized;
        } catch (error) {
            logger.error('OCR Processing failed:', error);
            throw error;
        }
    }

    private async preprocess(inputPath: string): Promise<string> {
        const outputPath = inputPath + '_acc.png';
        // Note: For advanced contour detection/perspective correction, OpenCV (Python) is better.
        // We will stick to Sharp for basic enhancement (contrast/grayscale) unless OpenCV service is ready.
        await sharp(inputPath)
            .rotate() // Use EXIF
            .toFormat('png')
            .toFile(outputPath);
        return outputPath;
    }

    private runPaddleOCR(imagePath: string): Promise<Box[]> {
        return new Promise((resolve, reject) => {
            const pythonProcess = spawn(OCRProcessor.PYTHON_PATH, [OCRProcessor.BRIDGE_PATH, imagePath]);
            let output = '';
            let errorOutput = '';

            pythonProcess.stdout.on('data', (data) => { output += data.toString(); });
            pythonProcess.stderr.on('data', (data) => { errorOutput += data.toString(); });

            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    return reject(new Error(`OCR Bridge failed with code ${code}. Error: ${errorOutput}`));
                }
                try {
                    // PaddleOCR sometimes prints debug logs to stdout even with show_log=False
                    // We find the last line that looks like valid JSON
                    const lines = output.trim().split('\n');
                    let jsonStr = '';
                    for (let i = lines.length - 1; i >= 0; i--) {
                        if (lines[i].trim().startsWith('{') && lines[i].trim().endsWith('}')) {
                            jsonStr = lines[i].trim();
                            break;
                        }
                    }

                    if (!jsonStr) {
                        return reject(new Error('No valid JSON found in OCR output: ' + output));
                    }

                    const result = JSON.parse(jsonStr);
                    if (result.status === 'error' || result.error) {
                        return reject(new Error(result.message || result.error));
                    }
                    resolve(result.data);
                } catch (e) {
                    reject(new Error('Failed to parse OCR output: ' + output));
                }
            });
        });
    }

    private groupAndExtract(boxes: Box[]): any {
        // Spatial Grouping: Group boxes into rows based on Y coordinates
        const sorted = [...boxes].sort((a, b) => a.box[0][1] - b.box[0][1]);
        const lines: { text: string; y: number; x: number; height: number }[][] = [];

        for (const box of sorted) {
            const y = box.box[0][1];
            const h = box.box[2][1] - y;
            let found = false;
            for (const line of lines) {
                // If the box y-center is within the vertical range of an existing line
                const lineY = line[0].y;
                const lineH = line[0].height;
                if (Math.abs(y - lineY) < lineH * 0.7) {
                    line.push({ text: box.text, y, x: box.box[0][0], height: h });
                    found = true;
                    break;
                }
            }
            if (!found) {
                lines.push([{ text: box.text, y, x: box.box[0][0], height: h }]);
            }
        }

        // Sort boxes within lines by X
        lines.forEach(l => l.sort((a, b) => a.x - b.x));

        const textLines = lines.map(line => line.map(b => b.text).join(' '));

        // Initial Extraction State
        let result: any = {
            merchant_name: textLines[0] || 'Unknown',
            items: [],
            vat_summary: [],
            totals: { subtotal: 0, vat: 0, grand: 0 },
            date: null,
            time: null,
            tax_number: null
        };

        const moneyRegex = /(\d+[,.]\d{2})(?!\d)/g;
        const vatRateRegex = /%?\s*(\d{1,2})\s*$/;

        for (const line of textLines) {
            // 1. Metadata extraction
            if (!result.date && line.match(/\d{2}[./-]\d{2}[./-]\d{2,4}/)) {
                result.date = line.match(/\d{2}[./-]\d{2}[./-]\d{2,4}/)![0];
            }
            if (!result.tax_number && line.match(/VKN|V\.K\.N|VERG. NO:?\s*(\d{10,11})/i)) {
                const match = line.match(/(\d{10,11})/);
                if (match) result.tax_number = match[0];
            }

            // 2. Total extraction
            if (line.match(/TOPLAM|TUTAR|GENEL/i)) {
                const matches = line.match(moneyRegex);
                if (matches) {
                    const val = this.parsePrice(matches[matches.length - 1]);
                    if (val > result.totals.grand) result.totals.grand = val;
                }
            }

            // 3. VAT Summary extraction
            if (line.match(/KDV|MATRAH/i)) {
                const matches = line.match(moneyRegex);
                const rateMatch = line.match(/%?\s*(\d{1,2})/);
                if (matches && matches.length >= 1) {
                    result.vat_summary.push({
                        rate: rateMatch ? parseInt(rateMatch[1]) : 0,
                        amount: this.parsePrice(matches[matches.length - 1])
                    });
                }
            }

            // 4. Item extraction (Heuristic: Line with name + price, not a total/vat line)
            if (!line.match(/TOPLAM|KDV|MATRAH|TUTAR|VERG.|SAAT|TAR.H/i)) {
                const priceMatches = line.match(moneyRegex);
                if (priceMatches && priceMatches.length >= 1) {
                    const price = this.parsePrice(priceMatches[priceMatches.length - 1]);
                    let name = line.replace(priceMatches[priceMatches.length - 1], '').trim();

                    // Extract inline VAT rate if present (e.g. *1, %8)
                    const inlineVat = line.match(/[*%](\d{1,2})/);

                    result.items.push({
                        name: name || 'Unknown Product',
                        total_price: price,
                        vat_rate: inlineVat ? parseInt(inlineVat[1]) : null,
                        confidence: 0.9 // Placeholder
                    });
                }
            }
        }

        return result;
    }

    private parsePrice(str: string): number {
        return parseFloat(str.replace(',', '.'));
    }

    private finalizeResult(data: any): OCRProcessingResult {
        // Implement VAT Proportion fallback and Partition Problem check here
        let items: LineItem[] = data.items.map((i: any) => ({
            ...i,
            quantity: 1,
            unit_price: i.total_price,
            vat_amount: i.vat_rate ? (i.total_price * (i.vat_rate / 100)) : 0
        }));

        const subtotal = items.reduce((acc, i) => acc + i.total_price, 0);
        const total_vat = data.vat_summary.reduce((acc: number, v: any) => acc + v.amount, 0);

        // Validation
        const items_match_subtotal = Math.abs(subtotal - data.totals.grand + total_vat) < 1; // Simplified
        const vat_match_total = Math.abs(total_vat - (data.totals.grand - (data.totals.grand / (1 + 0.1)))) < 50; // VERY loose check for now

        return {
            merchant_name: data.merchant_name,
            tax_number: data.tax_number,
            date: data.date,
            time: data.time,
            items,
            subtotal,
            vat_breakdown: data.vat_summary.map((v: any) => ({ rate: v.rate, taxable_amount: 0, vat_amount: v.amount })),
            total_vat,
            total: data.totals.grand || subtotal + total_vat,
            payment_type: null,
            mathematical_validation: {
                items_match_subtotal,
                vat_match_total,
                overall_consistency: items_match_subtotal
            },
            confidence_score: 0.85,
            requires_review: !items_match_subtotal || items.length === 0
        };
    }
}
