import 'dotenv/config'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT || 5432),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  max: 20,           
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
  console.error('Unexpected idle client error', err)
  process.exit(-1)
})

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();