//User routes
import express from 'express'
import { verificate } from '../middleware/input-verification.js'
import { controller as userController } from '../controller/user-controller.js'

export const router = express.Router()

router.get('/', userController.getUsers)

router.get('/:id', verificate.id, userController.getUserById)

router.post('/', userController.addUser)

router.patch('/:id', verificate.id, userController.updateUser)

router.delete('/:id', verificate.id, userController.deleteUser)