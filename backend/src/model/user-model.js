import { query as dbQuery } from '../config/db.js'
/** @module userModel */
export const userModel = {}

/**
 * Retrieves all users from the database.
 * @memberof module:userModel
 * @returns {Promise<Array>} Array of all users with id, name, and password.
 */
userModel.findUsers = async () => {
  const res = await dbQuery('SELECT id, name, password, role FROM users ORDER BY id')
  return res.rows
}

/**
 * Retrieves a single user by their ID.
 * @memberof module:userModel
 * @param {number|string} id - The ID of the user to retrieve.
 * @returns {Promise<Object|undefined>} The user object, or undefined if not found.
 */
userModel.findUserById = async (id) => {
  const userId = parseInt(id, 10)
  const query = 'SELECT name, password FROM users WHERE id=$1'
  const res = await dbQuery(query, [userId])
  return res.rows[0]
}

/**
 * Retrieves a single user by their name.
 * @memberof module:userModel
 * @param {string} name - The name of the user to retrieve.
 * @returns {Promise<Object|undefined>} The user object, or undefined if not found.
 */
userModel.findUserByName = async (name) => {
  const query = 'SELECT * FROM users WHERE name=$1'
  console.log(name)
  const res = await dbQuery(query, [name])
  return res.rows[0]
}

/**
 * Inserts a new user into the database.
 * @memberof module:userModel
 * @param {Object} user - The user to create.
 * @param {string} user.name - The name of the user.
 * @param {string} user.password - The password of the user.
 * @returns {Promise<number>} The ID of the newly created user.
 */

//Include name with a space?
userModel.addUser = async (name, password) => {
  const query = 'INSERT INTO users (name, password,role) VALUES ($1, $2, \'user\') ON CONFLICT (name) DO NOTHING RETURNING id'
  const values = [name, password]
  const res = await dbQuery(query, values)
  if (res.rowCount <= 0) { return -1 }
  return res.rows[0].id
}

/**
 * Partially or fully updates a user's fields.
 * @memberof module:userModel
 * @param {number|string} id - The ID of the user to update.
 * @param {Object} updates - An object containing the fields to update.
 * @param {string} [updates.name] - The new name of the user.
 * @param {string} [updates.password] - The new password of the user.
 * @returns {Promise<Object|undefined>} The updated user object, or undefined if not found.
 */
userModel.updateUser = async (id, updates) => {
  const fields = Object.keys(updates)
  const values = Object.values(updates)

  const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ')
  const query = `UPDATE users SET ${setClause} WHERE  id = $${fields.length + 1} RETURNING *`

  const res = await dbQuery(query, [...values, id])
  return res.rows[0]
}

/**
 * Updates the role for a specific user in the database.
 * @memberof module:userModel
 * @param {number|string} id - The ID of the user to update.
 * @param {string} role - The new role to assign to the user.
 * @returns {Promise<Object|undefined>} An object containing the updated (id, role), or undefined if no user was found.
 */
userModel.updateRole = async (id, role) => {
  const query = 'UPDATE users SET "role" = $1 WHERE id = $2 RETURNING (id, role)'
  const values = [role, id]
  const res = await dbQuery(query, values)
  return res.rows[0]
}

/**
 * Deletes a user by their ID.
 * @memberof module:userModel
 * @param {number|string} id - The ID of the user to delete.
 * @returns {Promise<Object|undefined>} The deleted user object, or undefined if not found.
 */
userModel.deleteUser = async (id) => {
  const userId = parseInt(id, 10)
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
  const res = await dbQuery(query, [userId])
  return res.rows[0]
}

userModel.login = async (name, password) => {
  const query = 'SELECT * FROM users WHERE name=$1, password=$2'
  const values = [name, password]
  const res = await dbQuery(query, values)
  return res.rows[0] ? true : false //if someone is found with such password and name, returns true 
}
