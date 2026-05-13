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


controller.addReceipt = async (req, res) => {
  try {
    const { userId, storeName, date, items } = req.body
    const receiptId = await receiptModel.addReceipt({
      userId: userId,
      storeName: storeName,
      date: date,
      items: items
    })
    res.status(201).json({
      receiptId
    })
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

controller.deleteReceipt = async (req, res) => {
  try {
    const deleted = await receiptModel.deleteReceipt(parseInt(req.params.id, 10))
    if (deleted) {
      res.status(200).json({
        receiptId: deleted.id,
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
    const deleted = await receiptModel.deleteProduct(parseInt(req.params.id, 10))
    if (deleted) {
      res.status(200).json({
        productId: deleted.id,
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

