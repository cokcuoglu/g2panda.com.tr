
const axios = require('axios');

const BASE_URL = 'http://localhost:7001/api';

async function registerUser(name) {
    const rand = Math.floor(Math.random() * 100000);
    const email = `${name}_${rand}@test.com`;
    const password = 'Password123!';
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, {
            email, password, full_name: name, business_name: `${name} Biz`
        });
        return { token: res.data.data.token, user: res.data.data.user };
    } catch (err) {
        console.error(`Failed to register ${name}:`, err.response?.data || err.message);
        throw err;
    }
}

async function createProduct(token, name) {
    try {
        const res = await axios.post(`${BASE_URL}/products`, {
            name, price: 100, color: 'bg-red-50'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data;
    } catch (err) {
        console.error(`Failed to create product for token ${token.substring(0, 10)}...:`, err.response?.data || err.message);
        throw err;
    }
}

async function getProducts(token) {
    try {
        const res = await axios.get(`${BASE_URL}/products`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data;
    } catch (err) {
        console.error(`Failed to get products:`, err.response?.data || err.message);
        throw err;
    }
}

async function run() {
    console.log('--- STARTING RLS SECURITY VERIIFICATION ---');

    // 1. Register User A (Alice)
    console.log('1. Registering Alice...');
    const alice = await registerUser('Alice');
    console.log(`Alice registered (ID: ${alice.user.id})`);

    // 2. Register User B (Bob)
    console.log('2. Registering Bob...');
    const bob = await registerUser('Bob');
    console.log(`Bob registered (ID: ${bob.user.id})`);

    // 3. Alice creates a Secret Product
    console.log('3. Alice creating "Alice Secret Product"...');
    await createProduct(alice.token, 'Alice Secret Product');

    // 4. Bob creates a Public Product
    console.log('4. Bob creating "Bob Public Product"...');
    await createProduct(bob.token, 'Bob Public Product');

    // 5. Verify Alice sees ONLY her product
    console.log('5. Verifying Alice\'s view...');
    const aliceProducts = await getProducts(alice.token);
    const aliceHasSecret = aliceProducts.some(p => p.name === 'Alice Secret Product');
    const aliceHasBob = aliceProducts.some(p => p.name === 'Bob Public Product');

    console.log(`   - Alice sees ${aliceProducts.length} products.`);
    console.log(`   - Sees her own? ${aliceHasSecret}`);
    console.log(`   - Sees Bob's? ${aliceHasBob}`);

    if (!aliceHasSecret || aliceHasBob) {
        console.error('FAILED: Alice has incorrect view!');
        process.exit(1);
    }

    // 6. Verify Bob sees ONLY his product
    console.log('6. Verifying Bob\'s view...');
    const bobProducts = await getProducts(bob.token);
    const bobHasSecret = bobProducts.some(p => p.name === 'Alice Secret Product');
    const bobHasPublic = bobProducts.some(p => p.name === 'Bob Public Product');

    console.log(`   - Bob sees ${bobProducts.length} products.`);
    console.log(`   - Sees his own? ${bobHasPublic}`);
    console.log(`   - Sees Alice's? ${bobHasSecret}`);

    if (!bobHasPublic || bobHasSecret) {
        console.error('FAILED: Bob has incorrect view! RLS IS BROKEN OR BYPASSED.');
        process.exit(1);
    }

    console.log('--- SUCCESS: RLS IS WORKING CORRECTLY ---');
    console.log('Data isolation between tenants is enforced.');
}

run();
