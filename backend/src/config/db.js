import 'dotenv/config'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT || 5432),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  max: 20,                        // max connections in pool
  idleTimeoutMillis: 30000,       // close idle clients after 30s
  connectionTimeoutMillis: 2000,  // fail if connection takes >2s
})
// Catch unexpected errors on idle clients to prevent silent failures
pool.on('error', (err) => {
  console.error('Unexpected idle client error', err)
  process.exit(-1)
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.stack)
  } else {
    console.log('✅ Database is connected! Server time:', res.rows[0].now)
  }
})

/** Execute a single query using a pooled connection. */
export const query = (text, params) => pool.query(text, params)


/** Retrieve a dedicated client from the pool (remember to release it). */
export const getClient = () => pool.connect()