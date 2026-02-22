const fs = require('fs');

try {
    const raw = fs.readFileSync('scripts/test3_menu_dump.json', 'utf8');
    // Remove potential BOM or garbage
    const clean = raw.trim().replace(/^\uFEFF/, '');
    const data = JSON.parse(clean);

    console.log('Business:', data.data.business_name);
    data.data.campaigns.forEach(c => {
        console.log(`Campaign ${c.name} products:`, JSON.stringify(c.products));
        if (c.products.includes(null)) {
            console.log('!!! FOUND NULL IN PRODUCTS ARRAY !!!');
        }
    });

    const checkCats = (cats) => {
        cats.forEach(cat => {
            console.log(`Category ${cat.name} products count:`, cat.products?.length);
            if (cat.products?.includes(null)) {
                console.log('!!! FOUND NULL IN CATEGORY PRODUCTS !!!');
            }
            if (cat.children) checkCats(cat.children);
        });
    };
    checkCats(data.data.categories);

} catch (e) {
    console.error('Error parsing JSON:', e.message);
}
