import express from 'express'
import { authorization } from '../controller/jwt-controller.js'

export const router = express.Router()

router.post('/login', authorization)
//jwtMiddleware.jwtTokenIsValid, controller.token
// router.get('/test/token', method1, method2)

//GET (create token)
// router.get('/token', method1, method2)

//GET verification
// router.get('/verify', method1, method2)