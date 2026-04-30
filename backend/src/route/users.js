//User routes
import express from 'express'
import { controller as userController } from '../controller/user-controller.js'

export const router = express.Router()

router.get('/users', userController.getUsers)

router.get('/users/:id', userController.getUserById)

router.post('/users', userController.addUser)

router.patch('/users/:id', userController.updateUser)

router.put('/users/:id', userController.replaceUser)

router.delete('/users/:id', userController.deleteUser)