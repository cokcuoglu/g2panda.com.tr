const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    try {
        const form = new FormData();
        const imagePath = path.resolve('d:/Personal_Project/g2panda_release/uploads/ocr/base_receipt.jpg');

        if (!fs.existsSync(imagePath)) {
            console.log('Test image not found at', imagePath);
            return;
        }

        form.append('image', fs.createReadStream(imagePath), 'base_receipt.jpg');

        console.log('Testing Endpoint: http://localhost:8080/api/v1/ai/Receipt/analyze');

        const res = await axios.post('http://localhost:8080/api/v1/ai/Receipt/analyze', form, {
            headers: form.getHeaders(),
        });

        console.log('SUCCESS:', res.status);
        console.log('Merchant:', res.data.merchant?.name || res.data.Merchant?.Name);
        console.log('Total:', res.data.financial?.total || res.data.Financial?.Total);
    } catch (err) {
        console.error('FAILED:', err.response?.status || err.message);
        if (err.response?.data) console.error(err.response.data);
    }
}

testUpload();
