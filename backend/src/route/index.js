import express from 'express'
import { router as helloRoute } from './hello.js'
import { router as userRoute } from './users-route.js'
import { router as jwtRoute } from './jwt-route.js'
import { router as ocrRoute } from './ocr-route.js'
import { router as recriptRoute } from './receipt-route.js'

export const router = express.Router()

router.use('/', express.json(), helloRoute)
router.use('/users', express.json(), userRoute)
router.use('/jwt', express.json(), jwtRoute)
router.use('/receipts', express.json(), recriptRoute)
router.use('/ocr', ocrRoute)




