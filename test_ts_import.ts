try {
    console.log('Testing import transactions.ts...');
    require('./src/routes/transactions.ts'); // ts-node should handle this if running via ts-node
    console.log('✅ transactions.ts imported');
} catch (e) {
    console.error('❌ transactions.ts error:', e);
}
