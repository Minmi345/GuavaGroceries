import { receiptModel } from '../model/receipt-model.js'

export const controller = {}

controller.getReceipts = async (req, res) => {
  try {
    const receipts = await receiptModel.getAllReceipts()
    res.json(receipts)
  }
  catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}
controller.getReceiptsOfUserId = async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId, 10)
    const receipts = await receiptModel.findReceiptsByUserId(user_id)
    if (receipts) {
      res.json(receipts)
    } else {
      res.status(404).json({
        error: 'No receipts found'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

controller.getProductById = async (req, res) => {
  try {
    const product_id = req.params.productId
    const product = await receiptModel.findProductDetailsByProductId(product_id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({
        error: 'No receipts found'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

controller.getReceiptById = async (req, res) => {
  try {
    const receipt_id = req.params.receiptId
    console.log(req.params)
    const receipt = await receiptModel.findReceiptDetailsByReceiptId(receipt_id)
    if (receipt) {
      res.json(receipt)
    } else {
      res.status(404).json({
        error: 'No receipts found'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}




controller.addReceipt = async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId, 10)
    const { storeName, date, total, currency, items } = req.body
    const receipt_id = await receiptModel.addReceipt({
      userId: user_id,
      storeName: storeName,
      date: date,
      total: total,
      currency: currency,
      items: items
    })
    console.log(receipt_id)
    res.status(201).json({
      receiptId: receipt_id
    })
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

controller.deleteAllReceiptsOfUserId = async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId, 10)
    const deleted = await receiptModel.deleteAllReceiptsOfUser(user_id)
    if (deleted) {
      res.status(200).json({
        success: deleted,
      })
    } else {
      res.status(404).json({
        error: 'Receipt not found.'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}


controller.deleteReceipt = async (req, res) => {
  try {
    const receipt_id = req.params.receiptId
    const deleted = await receiptModel.deleteReceipt(receipt_id)
    if (deleted) {
      res.status(200).json({
        success: deleted,
      })
    } else {
      res.status(404).json({
        error: 'Receipt not found.'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

controller.deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.productId
    const deleted = await receiptModel.deleteProduct(product_id)
    if (deleted) {
      res.status(200).json({
        success: deleted,
      })
    } else {
      res.status(404).json({
        error: 'Product not found.'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}


