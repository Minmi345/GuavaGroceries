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


//group 1
// member 1
// member 2
// member 3

//group - id, name, owner
//users - id, name, password

//fix later 
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

groupModel.findGroupById = async (groupId) => {
  const query = ('SELECT * FROM groups WHERE group_uuid = $1')
  const res = await dbQuery(query,[groupId])
  return res.rows[0]  
}

//add user
//simply add into group_members table
groupModel.addUser = async (groupId, userId) => {
  //check that user and group actually exist!
  const query = 'INSERT INTO group_members (user_id, group_id) VALUES ($1, $2)'
  const values = [userId]
  const res = await dbQuery(query, values)
  return res.rows

}

//we have: user (not admin, in group_members table)
//return: group ID/name from what we found from group_members
groupModel.findGroupsByUserId = async (userId) =>{
  const query = 'SELECT'
  const values = [userId]
  const res = await dbQuery(query, values)
  return res.rows
}

//find all groups ✅
//get all groups and their members for superadmin
//find groups by user Id
//delete group
//rename group

//POST link to add user that has only group ID (?)

//delete user by himself
//creator can delete any user
