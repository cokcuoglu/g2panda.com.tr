const axios = require('axios');
const fs = require('fs');

async function test() {
    const userId = 'be8b8541-f427-4287-a00b-a0e9783e5209'; // test3 (cnr2)
    try {
        const res = await axios.get(`http://localhost:7001/api/public/menu/${userId}`);
        fs.writeFileSync('scripts/test3_menu_dump.json', JSON.stringify(res.data, null, 2));
        console.log('Saved to scripts/test3_menu_dump.json');
    } catch (err) {
        console.error('API Error:', err.message);
    }
}
test();
