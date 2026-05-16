//Groups' routes
import express from 'express'
import { controller as groupController } from '../controller/groups-controller'
import { jwtTokenIsValid, jwtTokenRole } from '../middleware/jwt.js'

export const router = express.Router()

//find all groups
//get all groups and their members for superadmin
//find groups by user Id
//delete group
//rename group

//POST link to add user that has only group ID (?)

//delete user by himself
//creator can delete any user

router.get('/', groupController.getGroups)
router.get('/members', jwtTokenIsValid, jwtTokenRole('boba'), groupController.getGroups)

router.get('/user/:id', groupController.getGroupsByUsersId)
router.delete('/:id', groupController.deleteGroupById)
router.delete('/:group_id/user/:user_id', groupController.deleteUserFromGroupById)

router.patch('/', groupController.renameGroupById)
router.post('/', groupController.addUser)
