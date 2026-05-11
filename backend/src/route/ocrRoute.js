import { imageToText } from '../service/ocrService.js'
import express from 'express'
import multer from 'multer'
export const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file attached")
    const imageBuffer = req.file.buffer
    const processedText = await imageToText(imageBuffer)
    res.send(processedText)
  } catch (error) {
    res.status(500).send(error.message)

  }
})

router.get('/upload', (req, res) => {
  res.send('This is where we upload pictures')
})


