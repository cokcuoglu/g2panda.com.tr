
const axios = require('axios');

async function main() {
    try {
        // Try port 5001 (default server port) and 5005 (proxy port maybe?)
        // The server logs said "Server is running on port 5001"
        const validPort = 5001;
        console.log(`Checking API on port ${validPort}...`);

        const response = await axios.get(`http://localhost:${validPort}/api/categories`);
        console.log('Status:', response.status);
        console.log('Success:', response.data.success);
        console.log('Data Length:', response.data.data ? response.data.data.length : 'N/A');
        if (response.data.data && response.data.data.length > 0) {
            console.log('First Category:', response.data.data[0]);
        } else {
            console.log('No categories returned.');
        }

        console.log('\nChecking Channels...');
        const chanResponse = await axios.get(`http://localhost:${validPort}/api/channels`);
        console.log('Channels Status:', chanResponse.status);
        console.log('Channels Data Length:', chanResponse.data.data ? chanResponse.data.data.length : 'N/A');

    } catch (error) {
        console.error('API Request Failed:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

main();
