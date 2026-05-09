//User routes
import express from 'express'
import { controller as userController } from '../controller/user-controller.js'

export const router = express.Router()

router.get('/', userController.getUsers)

router.get('/:id', userController.getUserById)

router.post('/', userController.addUser)

router.patch('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)