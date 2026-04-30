import { query } from '../config/db.js';

export const findUsers = async () => {
  const res = await query('SELECT id, name, password FROM users ORDER BY id');
  return res.rows;
}