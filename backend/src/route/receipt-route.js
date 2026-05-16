/**
 * All the receipt-related paths
 * @file receipt-route
 * @module route/receipt-route
 */

import express from 'express'
import { controller as receiptController } from '../controller/receipt-controller.js'

export const router = express.Router()

/**
 * Route: `GET /receipts`<br>
 * Description: Get all receipts
 * @function getReceipts
 * @name getReceipts
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {ExpressResponse} res - Express response
 * @param {Array} res.body - Array of receipt objects
 * @returns {200} If success.
 * @returns {500} If a database or server error occurs.
 */
router.get('/', function getReceipts(req, res) {
  receiptController.getReceipts(req, res)
})

/**
 * Route: `GET /receipts/:userId`<br>
 * Description: Get all receipts by a user ID.
 * @function getReceiptsOfUserId
 * @name getReceiptsOfUserId
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {number} req.params.userId - The user's ID
 * @param {ExpressResponse} res - Express response
 * @param {Array} res.body - Array of receipt objects
 * @returns {200} If success.
 * @returns {404} If no such ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.get('/:userId', function getReceiptsOfUserId(req, res) {
  receiptController.getReceiptsOfUserId(req, res)
})

/**
 * Route: `POST /receipts/:userId`<br>
 * Description: Post new receipt by user ID
 * @function addReceipt
 * @name addReceipt
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {number} req.params.userId - The user's ID
 * @param {string} req.body.storeName - Store name (e.g "ICA")
 * @param {string} req.body.date - Date of purchase (e.g. "2026-05-15")
 * @param {number} req.body.total - Total amount, 2 decimal places (e.g. 14.45)
 * @param {string} req.body.currency - Currency (e.g "SEK")
 * @param {Array} req.body.items - List of items
 * @param {ExpressResponse} res - Express response
 * @param {string} res.body.receiptId - The created receipt's ID
 * @returns {201} If success.
 * @returns {404} If no such ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.post('/:userId', function addReceipt(req, res) {
  receiptController.addReceipt(req, res)
})

/**
 * Route: `DELETE /receipts/all/:userId`<br>
 * Description: Delete all receipts by a user, will recursively delete all products associated with the receipt
 * @function deleteAllReceiptsOfUserId
 * @name deleteAllReceiptsOfUserId
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {number} req.params.userId - The user's ID
 * @param {ExpressResponse} res - Express response
 * @param {boolean} res.body.isSuccess - Whether the operation was successful
 * @returns {200} If success.
 * @returns {404} If no such ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.delete('/all/:userId', function deleteAllReceiptsOfUserId(req, res) {
  receiptController.deleteAllReceiptsOfUserId(req, res)
})

/**
 * Route: `GET /receipts/receipt/:receiptId`<br>
 * Description: Get a receipt by ID
 * @function getReceiptById
 * @name getReceiptById
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.receiptId - The receipt's ID
 * @param {ExpressResponse} res - Express response
 * @param {Array} res.body - Array of items in the receipt
 * @returns {200} If success.
 * @returns {404} If no such ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.get('/receipt/:receiptId', function getReceiptById(req, res) {
  receiptController.getReceiptById(req, res)
})

/**
 * Route: `GET /receipts/product/:productId`<br>
 * Description: Get a product by ID
 * @function getProductById
 * @name getProductById
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.productId - The product's ID
 * @param {ExpressResponse} res - Express response
 * @param {string} res.body.id - Product ID
 * @param {string} res.body.name - Product name
 * @param {number} res.body.price - Product price, two decimal places
 * @param {number} res.body.quantity - Product quantity
 * @returns {200} If success.
 * @returns {404} If no such ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.get('/product/:productId', function getProductById(req, res) {
  receiptController.getProductById(req, res)
})

/**
 * Route: `DELETE /receipts/receipt/:receiptId`<br>
 * Description: Delete a receipt by ID.
 * @function deleteReceipt
 * @name deleteReceipt
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.receiptId - The receipt's ID
 * @param {ExpressResponse} res - Express response
 * @param {boolean} res.body.isSuccess - Whether the operation was successful
 * @returns {200} If success.
 * @returns {404} If no such ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.delete('/receipt/:receiptId', function deleteReceipt(req, res) {
  receiptController.deleteReceipt(req, res)
})

/**
 * Route: `DELETE /receipts/product/:productId`<br>
 * Description: Delete a product by ID.
 * @function deleteProduct
 * @name deleteProduct
 * @memberof module:route/receipt-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.productId - The product's ID
 * @param {ExpressResponse} res - Express response
 * @param {boolean} res.body.isSuccess - Whether the operation was successful
 * @returns {200} If success.
 * @returns {404} If no such ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.delete('/product/:productId', function deleteProduct(req, res) {
  receiptController.deleteProduct(req, res)
})
