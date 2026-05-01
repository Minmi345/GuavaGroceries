import { processImage } from '../service/ocrService.js'
import express from 'express'
export const router = express.Router()

router.get('/', async (req, res) => {
  const processedText = await processImage()
  res.send(processedText)
})

router.post('/upload', (req, res) => {
  res.send('This is where we upload pictures')
})


