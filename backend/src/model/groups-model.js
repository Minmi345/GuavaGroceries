import { query as dbQuery } from '../config/db.js'

/** @module groupModel */
export const groupModel = {}

/**
 * Retrieves all groups from the database.
 * @memberof module:groupModel
 * @returns {Promise<Array>} Array of all users with id, name, and password.
 */ 
groupModel.findGroups = async () => {
  const res = await dbQuery('SELECT * FROM groups ORDER BY group_uuid')
  return res.rows
}

groupModel.findGroupsandMembers = async () => {
  const res = await dbQuery('SELECT * FROM groups ORDER BY group_uuid')
  return res.rows
}

groupModel.addGroup = async (name, userId) =>{
  const query = 'INSERT INTO groups (name,owner) VALUES ($1, $2) RETURNING group_uuid'
  const values = [name, userId]
  const res = await dbQuery(query, values)
  return res.rows[0]
}

//find all groups ✅
//get all groups and their members for superadmin
//find groups by user Id
//delete group
//rename group

//POST link to add user that has only group ID (?)

//delete user by himself
//creator can delete any user
