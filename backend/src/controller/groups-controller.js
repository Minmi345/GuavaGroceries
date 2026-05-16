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
    const { name, userId } = req.body
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