const axios = require('axios');

async function testParser() {
    const url = 'http://localhost:5248/api/v1/ai/receipt/analyze'; // Adjust port if necessary

    // Mocking OCR results for a product block:
    // PRODUCT_NAME (EKMEK)
    // [OPTIONAL_QUANTITY_LINE] (2 X 5.00)
    // PRICE (10.00)
    // [OPTIONAL_VAT_RATE_LINE] (%1)

    // We can't easily mock the IFormFile image here without a real file or a more complex setup.
    // However, we can test the Logic by looking at how the API responds to the test_receipt.jpg

    console.log('--- Testing Grammar Based Parser with test_receipt.jpg ---');
    try {
        const formData = new FormData();
        // Note: This requires 'form-data' or similar in Node, or running in a browser context.
        // For simplicity, let's just use a curl command in the next step or a simpler JS if possible.
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

// Since I am in a terminal-enabled environment, I will use curl for direct testing.
console.log('To test manually, run:');
console.log('curl -X POST -F "image=@d:/Personal_Project/g2panda_release/services/receipt_ai/test_receipt.jpg" http://localhost:5248/api/v1/ai/receipt/analyze');
