const { OCRProcessor } = require('../dist/services/OCRProcessor');
const fs = require('fs');
const path = require('path');

async function testOCR() {
    console.log('--- Testing OCRProcessor Logic ---');
    const processor = new OCRProcessor();

    // Mock raw OCR boxes (What PaddleOCR would return)
    const mockBoxes = [
        { box: [[10, 10], [100, 10], [100, 30], [10, 30]], text: "G2PANDA CAFE", confidence: 0.99 },
        { box: [[10, 40], [100, 40], [100, 60], [10, 60]], text: "Tarih: 11.02.2026", confidence: 0.98 },
        { box: [[10, 80], [100, 80], [100, 100], [10, 100]], text: "EKMEK", confidence: 0.95 },
        { box: [[200, 80], [250, 80], [250, 100], [200, 100]], text: "10,00", confidence: 0.97 },
        { box: [[260, 80], [280, 80], [280, 100], [260, 100]], text: "*1", confidence: 0.90 },
        { box: [[10, 110], [100, 110], [100, 130], [10, 130]], text: "PEYNIR", confidence: 0.95 },
        { box: [[200, 110], [250, 110], [250, 130], [200, 130]], text: "40,00", confidence: 0.97 },
        { box: [[260, 110], [280, 110], [280, 130], [260, 130]], text: "*10", confidence: 0.90 },
        { box: [[10, 150], [100, 150], [100, 170], [10, 170]], text: "TOPLAM", confidence: 0.99 },
        { box: [[200, 150], [250, 150], [250, 170], [200, 170]], text: "50,00", confidence: 0.99 }
    ];

    // We need to bypass the runPaddleOCR call which uses spawn
    // For testing, we'll manually call the private methods if we can, or just test the logic directly.
    // Since we are in JS, we can just call them.

    const intermediate = processor.groupAndExtract(mockBoxes);
    console.log('Intermediate Data (Lines):', intermediate.items);

    const finalized = processor.finalizeResult(intermediate);
    console.log('Finalized Result:', JSON.stringify(finalized, null, 2));

    if (finalized.items.length === 2 && finalized.total === 50) {
        console.log('SUCCESS: Extraction logic works!');
    } else {
        console.error('FAILURE: Extraction logic mismatch');
    }
}

testOCR();
