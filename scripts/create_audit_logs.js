const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function createAuditTable() {
    console.log('Creating audit_logs table...');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Create Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS audit_logs (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                action VARCHAR(255) NOT NULL,
                entity_type VARCHAR(50) NOT NULL,
                entity_id VARCHAR(255) NOT NULL,
                performed_by UUID NULL, -- Nullable if system action or deleted user
                details JSONB DEFAULT '{}',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_user FOREIGN KEY(performed_by) REFERENCES users(id) ON DELETE SET NULL
            );
        `);
        console.log('Table audit_logs created.');

        // Add Index
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
            CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
            CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(performed_by);
        `);
        console.log('Indexes created.');

        // RLS Policies
        await client.query(`
            ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
            
            -- Grant Permissions
            GRANT ALL ON audit_logs TO app_user;
            GRANT SELECT ON audit_logs TO public; -- Or restricted?
        `);

        // Read Policy: Only Admin or Owner can read logs?
        // For simplicity, let authenticated users read (since API restricts).
        await client.query(`
            DROP POLICY IF EXISTS "audit_read_policy" ON audit_logs;
            CREATE POLICY "audit_read_policy" ON audit_logs
            FOR SELECT
            TO public
            USING (true);
        `);

        // Insert Policy: App User can insert
        await client.query(`
            DROP POLICY IF EXISTS "audit_insert_policy" ON audit_logs;
            CREATE POLICY "audit_insert_policy" ON audit_logs
            FOR INSERT
            TO public
            WITH CHECK (true);
        `);
        console.log('RLS Policies applied.');

        await client.query('COMMIT');
        console.log('Done.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
    } finally {
        client.release();
        pool.end();
    }
}

createAuditTable();
