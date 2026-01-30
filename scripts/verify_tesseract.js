const { createWorker } = require('tesseract.js');
async function run() {
    try {
        console.log('Initializing Tesseract...');
        const worker = await createWorker('tur');
        console.log('Running dummy recognition...');
        // We need an image, but createWorker('tur') downloads lang data. That's the main failure point.
        // We can just terminate if initialization worked.
        await worker.terminate();
        console.log('Tesseract initialized successfully.');
    } catch (e) {
        console.error('Tesseract failed:', e);
    }
}
run();
