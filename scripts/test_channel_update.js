const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gg_esnaf'
});

async function testChannelUpdate() {
    try {
        await client.connect();

        // Get a test user and channel
        const userRes = await client.query('SELECT id FROM users WHERE deleted_at IS NULL LIMIT 1');
        if (userRes.rows.length === 0) {
            console.log('No users found');
            return;
        }
        const userId = userRes.rows[0].id;
        console.log('Test user ID:', userId);

        // Get a channel for this user
        const channelRes = await client.query('SELECT * FROM channels WHERE user_id = $1 AND deleted_at IS NULL LIMIT 1', [userId]);

        if (channelRes.rows.length === 0) {
            console.log('No channels found for this user. Creating one...');

            // Create a test channel
            const createRes = await client.query(
                'INSERT INTO channels (user_id, name, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
                [userId, 'Test Channel', 'payment', 'Test description']
            );
            console.log('✓ Channel created:', createRes.rows[0]);

            const channelId = createRes.rows[0].id;

            // Now try to update it
            console.log('\nAttempting to update channel...');
            const updateRes = await client.query(
                'UPDATE channels SET name = $1, type = $2, description = $3, updated_at = NOW() WHERE id = $4 AND deleted_at IS NULL RETURNING *',
                ['Updated Channel', 'sales', 'Updated description', channelId]
            );

            if (updateRes.rows.length > 0) {
                console.log('✓ Channel updated successfully!');
                console.log('Updated channel:', updateRes.rows[0]);
            } else {
                console.log('❌ Update returned 0 rows');
            }

            // Clean up
            await client.query('DELETE FROM channels WHERE id = $1', [channelId]);
            console.log('✓ Test channel deleted');

        } else {
            const channel = channelRes.rows[0];
            console.log('Found channel:', channel.name, '(', channel.id, ')');

            // Try to update it
            console.log('\nAttempting to update channel...');
            const updateRes = await client.query(
                'UPDATE channels SET name = $1, type = $2, description = $3, updated_at = NOW() WHERE id = $4 AND deleted_at IS NULL RETURNING *',
                [channel.name + ' (Updated)', channel.type, channel.description, channel.id]
            );

            if (updateRes.rows.length > 0) {
                console.log('✓ Channel updated successfully!');
                console.log('Updated channel:', updateRes.rows[0]);

                // Revert the change
                await client.query(
                    'UPDATE channels SET name = $1 WHERE id = $2',
                    [channel.name, channel.id]
                );
                console.log('✓ Reverted changes');
            } else {
                console.log('❌ Update returned 0 rows - RLS might be blocking');
            }
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error('Detail:', err.detail || 'No detail');
    } finally {
        await client.end();
    }
}

testChannelUpdate();
