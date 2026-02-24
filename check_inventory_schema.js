const { pool } = require('./dist/db.js');
const fs = require('fs');

async function checkSchema() {
    try {
        let out = '';
        const tables = ['raw_materials', 'product_recipes', 'raw_material_stock_entries', 'products'];
        for (const tbl of tables) {
            const res = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = $1
            `, [tbl]);
            out += `\nTable: ${tbl}\n`;
            res.rows.forEach(r => out += `  ${r.column_name}: ${r.data_type}\n`);
        }

        // Also check if there is an intermediate_products table maybe?
        const checkInter = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%intermediate%'");
        out += "\nIntermediate tables: " + JSON.stringify(checkInter.rows) + "\n";

        fs.writeFileSync('schema_output.txt', out);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
checkSchema();
