import { imageToText, parseText } from '../service/ocrService.js'
import 'dotenv/config';
import express from 'express'
import multer from 'multer'
export const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file attached")
    const imageBuffer = req.file.buffer
    const processedText = await imageToText(imageBuffer)

    const fields = ["name", "date", "price", "quantity", "price per unit", "unit", "total amount"]
    const parsedText = await parseText(processedText, fields)
    console.log(parseText)
    res.send(parsedText)
  } catch (error) {
    res.status(500).send(error.message)

  }
})

router.get('/upload', (req, res) => {
  res.send('This is where we upload pictures')
})

