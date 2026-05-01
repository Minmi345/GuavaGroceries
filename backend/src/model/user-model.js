import { query as dbQuery } from '../config/db.js';
export const userModel = {}

userModel.findUsers = async () => {
  const res = await dbQuery('SELECT id, name, password FROM users ORDER BY id');
  return await res.rows;
}

userModel.findUserById = async (id) => {
  const userId = parseInt(id)
  const query = 'SELECT name, password FROM users WHERE id=$1'
  const res = await dbQuery(query, [userId])
  return res.rows[0]
}

userModel.addUser = async (user) => {
  const { name, password } = user
  const query = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id'
  const values = [name, password]
  const res = await dbQuery(query, values)
  return res.rows[0].id
}

userModel.updateUser = async (id, updates) => {
  const fields = Object.keys(updates)
  const values = Object.values(updates)

  const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ')
  const query = `UPDATE users SET ${setClause} WHERE  id = $${fields.length + 1} RETURNING *`

  const res = await dbQuery(query, [...values, id])
  return res.rows[0]
}

userModel.deleteUser = async (id) => {
  const userId = parseInt(id)
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
  const res = await dbQuery(query, [userId])
  return res.rows[0]
}