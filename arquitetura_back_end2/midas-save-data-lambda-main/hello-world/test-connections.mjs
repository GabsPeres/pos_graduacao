import pg from 'pg';
const { Pool } = pg;

const connectionString = 'postgresql://root:9gnvu5tvk4gkzUJBk5k3cj89d2dm9tJb@dpg-cq5dqqlds78s73d0fn6g-a.oregon-postgres.render.com/midaspostgresql';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.error('Connection error', err.stack);
  } finally {
    client.release();
  }
}

testConnection();
