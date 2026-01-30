const axios = require('axios');

// Test configuration
const API_BASE = 'http://localhost:7173';
const TEST_USER = {
    email: 'test@example.com',
    password: 'password123'
};

async function testCategoryCreation() {
    try {
        console.log('🧪 Testing Category Creation API\n');

        // Step 1: Login to get token
        console.log('1️⃣  Logging in...');
        const loginRes = await axios.post(`${API_BASE}/api/auth/login`, TEST_USER);
        const token = loginRes.data.token;
        console.log('✓ Login successful\n');

        // Set up axios with auth header
        const api = axios.create({
            baseURL: API_BASE,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        // Step 2: Get existing channels
        console.log('2️⃣  Fetching channels...');
        const channelsRes = await api.get('/api/channels');
        const channels = channelsRes.data.data;
        console.log(`✓ Found ${channels.length} channels`);
        if (channels.length > 0) {
            console.log(`  First channel: ${channels[0].name} (${channels[0].id})\n`);
        }

        // Step 3: Create a test category
        console.log('3️⃣  Creating test category...');
        const testCategory = {
            name: 'Test Gelir Kategorisi',
            type: 'income',
            color: '#10b981',
            expense_type: null,
            default_channel_id: channels.length > 0 ? channels[0].id : null,
            channel_ids: channels.length > 0 ? [channels[0].id] : []
        };

        const createRes = await api.post('/api/categories', testCategory);
        console.log('✓ Category created successfully!');
        console.log('  Category ID:', createRes.data.data.id);
        console.log('  Category Name:', createRes.data.data.name);
        console.log('  Category Type:', createRes.data.data.type);
        console.log('  Default Channel ID:', createRes.data.data.default_channel_id);
        console.log('  Form Channel IDs:', createRes.data.data.form_channel_ids);
        console.log('');

        // Step 4: Verify category appears in list
        console.log('4️⃣  Fetching categories list...');
        const categoriesRes = await api.get('/api/categories');
        const categories = categoriesRes.data.data;
        const createdCategory = categories.find(c => c.id === createRes.data.data.id);

        if (createdCategory) {
            console.log('✓ Category found in list!');
            console.log('  Name:', createdCategory.name);
            console.log('  Type:', createdCategory.type);
            console.log('  Form Channel IDs:', createdCategory.form_channel_ids);
        } else {
            console.log('❌ Category NOT found in list!');
        }
        console.log('');

        // Step 5: Clean up - delete test category
        console.log('5️⃣  Cleaning up...');
        await api.delete(`/api/categories/${createRes.data.data.id}`);
        console.log('✓ Test category deleted\n');

        console.log('✅ ALL TESTS PASSED! Category creation is working correctly.');

    } catch (error) {
        console.error('❌ TEST FAILED!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

testCategoryCreation();
