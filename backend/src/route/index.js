import express from 'express'
import { router as helloRoute } from './hello.js'

export const router = express.Router()
router.use('/', helloRoute)