try {
    console.log('Testing transactions.js...');
    require('./src/routes/transactions.js');
    console.log('✅ transactions.js loaded');
} catch (e) {
    console.error('❌ Error in transactions.js:', e);
}

try {
    console.log('Testing dashboard.js...');
    require('./src/routes/dashboard.js');
    console.log('✅ dashboard.js loaded');
} catch (e) {
    console.error('❌ Error in dashboard.js:', e.message);
}

try {
    console.log('Testing auth.ts (via ts-node usually, skipping direct require)');
    // require('./src/routes/auth.ts'); // This would fail in node without ts-node
} catch (e) {
    console.error(e);
}
