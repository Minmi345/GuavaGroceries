import { query as dbQuery } from '../config/db.js';
export const userModel = {}

userModel.findUsers = async () => {
  const res = await dbQuery('SELECT id, name, password FROM users ORDER BY id');
  return await res.rows;
}

userModel.addUser = async (user) => {
  const { name, password } = user
  const query = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id'
  const values = [name, password]
  const res = await dbQuery(query, values)
  return res.rows[0].id
}