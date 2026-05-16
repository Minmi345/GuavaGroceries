/**
 * Image upload path
 * @file ocr-route
 * @module route/ocr-route
 */

import { imageToText, parseText } from '../services/ocr-service.js'
import 'dotenv/config'
import express from 'express'
import multer from 'multer'
export const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

/**
 * Route: `POST /ocr`<br>
 * Description: Upload image and get receipt object back.
 * This will not add receipt to the database.
 * It only processes the image and gives it back to user for review.
 * User will have to click "save receipt" or equivalent to save it to the database.
 * The route for saving the receipt details in the database is '/receipts/:userId'
 * @function uploadImage
 * @name uploadImage
 * @memberof module:route/ocr-route
 * @param {ExpressRequest} req - Express request
 * @param {Object} req.file - Uploaded image file
 * @param {ExpressResponse} res - Express response
 * @param {string} res.body.id - Receipt ID
 * @param {number} res.body.userId - User ID
 * @param {number} res.body.total - Total amount, 2 decimal places
 * @param {string} res.body.currency - Currency
 * @param {string} res.body.storeName - Store name
 * @param {string} res.body.date - Date of purchase
 * @param {Array} res.body.items - List of items
 * @returns {200} If success.
 * @returns {422} If image processing fails.
 * @returns {500} If parsing text output fails or other errors.
 */
router.post('/', upload.single('image'), async function uploadImage(req, res) {
  try {
    if (!req.file) return res.status(400).send("No file attached")
    const imageBuffer = req.file.buffer
    const processedText = await imageToText(imageBuffer)
    if (!processedText) return res.status(422).send({ error: "Unable to process Image" })
    const parsedText = await parseText(processedText)
    if (!parsedText) return res.status(500).send({ error: "Parser failed" })
    res.status(200).send(parsedText)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
