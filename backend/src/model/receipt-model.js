import { query as dbQuery } from '../config/db.js'
import { v4 as uuidv4 } from 'uuid';
/** @module receiptModel */
export const receiptModel = {}

/**
 * Retrieves all receipts from the database.
 * @memberof module:receiptModel
 * @returns {Promise<Array>} Array of all receipt with id,date, items, and total.
 */
receiptModel.receiptTableName = "receipts"
receiptModel.productTableName = "products"

receiptModel.getAllReceipts = async () => {
  const res = await dbQuery(`SELECT * from ${receiptModel.receiptTableName} ORDER BY date`)
  return res.rows
}

/**
 * Retrieves all receipts by userId.
 * @memberof module:receiptModel
 * @param {number|string} id - The ID of the user whose receipts we want to retrieve.
 * @returns {Promise<Object|undefined>} The recipts object, or undefined if not found.
 */
receiptModel.findReceiptsByUserId = async (userId) => {
  const user_id = parseInt(userId, 10)
  //this will give us all the receipt ids of a specific userId
  const query = `SELECT * FROM ${receiptModel.receiptTableName} WHERE id=$1 \  
`
  const res = await dbQuery(query, [user_id])
  return res.rows
}

/**
 * Retrieves a single receipt by id.
 * @memberof module:receiptModel
 * @param {string} id - The receipt id to retrieve.
 * @returns {Promise<Object|undefined>} The receipt object, or undefined if not found.
 */

receiptModel.findReceiptDetailsByReceiptId = async (receiptId) => {
  const receipt_id = parseInt(receiptId)
  const query = `SELECT * FROM ${receiptModel.receiptTableName} WHERE id=$1`
  const res = await dbQuery(query, [receipt_id])
  return res.rows
}

/**
 * Inserts a new receipt into the receipts table.
 * @memberof module:receiptModel
 * @param {string} user.id - The id of the user.
 * @returns {Promise<number>} The id of the newly created receipt.
 */

receiptModel.addReceipt = async (valueObject) => {
  const insertReceipt = async (randomId, valueObject) => {
    await dbQuery('BEGIN');

    try {
      const insertReceiptQuery = `
            INSERT INTO ${receiptModel.receiptTableName} (id,user_id,total,currency, store_name,date)
            VALUES (:id, :userId, :storeName,:date)
        `;
      await dbQuery(insertReceiptQuery, {
        id: randomId,
        userId: valueObject.userId,
        storeName: valueObject.storeId,
        date: valueObject.date
      });

      /**const items = [
        { name: "banana", price:1.5, quantity: 2 },
        { name: "chicken",price: 1.25, quantity: 5 },
        { name: "milk",pirce: 3.5, quantity: 1 },
      ];
      **/
      const items = valueObject.items
      for (const item of items) {
        await dbQuery(
          `INSERT INTO ${receiptModel.productTableName} ( receipt_id, name, price, quantity)
                 VALUES (:receipt_id, :name, :price, :quantity)`,
          { randomId, ...item }
        );
      }

      await dbQuery('COMMIT');
      return res.rows[0].id
    } catch (err) {
      await dbQuery('ROLLBACK');
      throw err;
    }
  }
  const randomId = uuidv4()
  const res = await insertReceipt(randomId, valueObject)
  return res.rows
}
/**
 * Deletes a receipt by their ID. On cascade will delete all the products associated with that receipt
 * @memberof module:receiptModel
 * @param {number|string} id - The ID of the receipt to delete.
 * @returns {Promise<Object|undefined>} The deleted receipt object, or undefined if not found.
 */
userModel.deleteReceipt = async (receiptId) => {
  const receipt_id = parseInt(receiptId, 10)
  const query = `DELETE FROM ${receiptModel.receiptTableName} WHERE id = $1 RETURNING *`
  const res = await dbQuery(query, [receipt_id])
  return res.rows[0]
}

/**
 * Deletes a product by their ID.
 * @memberof module:receiptModel
 * @param {number|string} id - The ID of the product to delete.
 * @returns {Promise<Object|undefined>} The deleted receipt object, or undefined if not found.
 */
userModel.deleteProduct = async (productId) => {
  const product_id = parseInt(productId, 10)
  const query = `DELETE FROM ${receiptModel.productTableName} WHERE id = $1 RETURNING *`
  const res = await dbQuery(query, [product_id])
  return res.rows[0]
}


