import { groupModel } from "../model/groups-model.js"

export const controller = {}
//find all groups
//get all groups and their members for superadmin
//find groups by user Id
//delete group
//rename group

//POST link to add user that has only group ID (?)

//delete user by himself
//creator can delete any user

controller.getGroups = async (req, res) => {
  try {
    const users = await groupModel.findGroups()
    res.json(users)
  }
  catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

controller.createGroup = async (req, res) => {
  try {
    const { name } = req.body
    const userId = res.locals.userId
    const groupUuid = await groupModel.addGroup(name, userId)
    res.status(201).json({
      groupUuid
    })
  }
  catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

controller.getGroupById = async (req, res) => {
  try {
    const id = req.params.id
    const group = await groupModel.findGroupById(id)
    if (group) {
      res.json(group)
    } else {
      res.status(404).json({
        error: 'No such group found'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}