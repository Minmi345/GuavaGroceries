import express from 'express'
import { router as helloRoute } from './hello.js'
import { router as ocrRoute } from './ocrRoute.js'
import { router as userRoute } from './users-route.js'
import { router as jwtRoute } from './jwt-route.js'
export const router = express.Router()
router.use('/', express.json(), helloRoute)
router.use('/receipts', ocrRoute)
router.use('/users', userRoute)
router.use('/jwt', jwtRoute)
