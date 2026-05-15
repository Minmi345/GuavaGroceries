import express from 'express'
import { verificate } from '../middleware/input-verification.js'
import { controller as receiptController } from '../controller/receipt-controller.js'

export const router = express.Router()

router.get('/', receiptController.getReceipts)

router.get('/:userId', receiptController.getReceiptsOfUserId)

router.post('/:userId', receiptController.addReceipt)

router.delete('/all/:userId', receiptController.deleteAllReceiptsOfUserId)

router.get('/receipt/:receiptId', receiptController.getReceiptById)

router.get('/product/:productId', receiptController.getProductById)

router.delete('/receipt/:receiptId', receiptController.deleteReceipt)

router.delete('/product/:productId', receiptController.deleteProduct)
