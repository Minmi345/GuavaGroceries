import express from 'express'
import { router as helloRoute } from './hello.js'
import { router as ocrRoute } from './ocrRoute.js'

export const router = express.Router()
router.use('/', express.json(), helloRoute)
router.use('/ocr', ocrRoute)
