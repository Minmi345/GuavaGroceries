import express from 'express'
import { router as helloRoute } from './hello.js'
import { router as userRoute } from './users-route.js'

export const router = express.Router()
router.use('/', helloRoute)
router.use('/users', userRoute)