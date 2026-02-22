const axios = require('axios');

async function test() {
    const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // test3
    try {
        // Use full URL or proxy? Since this runs on the server, try localhost
        const res = await axios.get(`http://localhost:7001/api/public/menu/${userId}`);
        console.log('API Status:', res.status);
        console.log('Success:', res.data.success);
        console.log('Categories Count:', res.data.data.categories.length);
        res.data.data.categories.forEach(c => {
            console.log(` - ${c.name} (ID: ${c.id}, Products: ${c.products?.length})`);
        });
    } catch (err) {
        console.error('API Error:', err.message);
        if (err.response) {
            console.error('Response Data:', err.response.data);
        }
    }
}
test();
