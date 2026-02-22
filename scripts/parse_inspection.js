const fs = require('fs');
try {
    const data = JSON.parse(fs.readFileSync('orders_full_inspection.json', 'utf8').replace(/^\uFEFF/, ''));
    console.log('📋 Columns with character limits:');
    data.forEach(c => {
        if (c.character_maximum_length !== null) {
            console.log(`- ${c.column_name}: ${c.character_maximum_length} (${c.data_type})`);
        }
    });
} catch (e) {
    console.error('Error:', e.message);
}
