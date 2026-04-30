import { query as dbQuery } from '../config/db.js';
export const userModel = {}

userModel.findUsers = async () => {
  const res = await dbQuery('SELECT id, name, password FROM users ORDER BY id');
  return await res.rows;
}

userModel.findUserById = async (id) => {
  const userId = parseInt(id)
  const query = 'SELECT name, password FROM users WHERE id=$1'
  const values = [userId]
  const res = await dbQuery(query, values)
  return res.rows[0]
}

userModel.addUser = async (user) => {
  const { name, password } = user
  const query = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id'
  const values = [name, password]
  const res = await dbQuery(query, values)
  return res.rows[0].id
}

//todo: make update, replace and delete :D