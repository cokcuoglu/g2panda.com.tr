const axios = require('axios');

async function test() {
    const code = 'TBL-BMNGMJ';
    try {
        const res = await axios.get(`http://localhost:7001/api/public/menu/table/${code}`);
        console.log('Status:', res.status);
        console.log('Success:', res.data.success);
        console.log('Table Name:', res.data.data.table_name);
        console.log('Categories:', res.data.data.categories.length);
    } catch (err) {
        console.error('API Error:', err.message);
        if (err.response) console.error('Data:', err.response.data);
    }
}
test();
