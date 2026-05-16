import vision from '@google-cloud/vision'

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
export const imageToText = async (filepath = 'src/receipts/receipt.png') => {
  // Performs text detection on the local file
  const [result] = await client.textDetection(filepath)
  //const detections = result.textAnnotations;
  //console.log('Text:');
  //detections.forEach(text => console.log(text));

  const text = result.textAnnotations[0]?.description
  //console.log(text)
  return text
}

export const parseText = async (text) => {
  const URL = process.env.URL
  const API_KEY = process.env.TOKEN
  const fields = {
    "total_receipt_amount": "",
    "currency": "",
    "store_name": "",
    "date": "",
    "items": [
      { "name": "", "quantity": "", "price": "" },
    ]
  }
  const prompt = `
Task: Extract structured data from the provided receipt text.
Instructions:
1. Return ONLY valid JSON.
2. For line items, extract values into the following shape: ${JSON.stringify(fields)}.
3. If there is a negative sign "-" before or after the price of an item, skip the item.
4. Extract the GRAND TOTAL of the entire receipt into a field named "total_receipt_amount". 
5. Rule: The "total_receipt_amount" should be the final amount paid (after tax and discounts). Do not confuse this with subtotals or individual item prices.

Strict Rules for Quantity:
1. NEVER extract quantity from the product name (e.g., in "10 eggs", the quantity is NOT 10).
2. ONLY extract quantity from the multiplier line (e.g., "1x35" means quantity is 1).
3. If no multiplier line exists, default quantity to 1.

Text: ${text}
`
  const data = {
    "model": "gemma3:4b",
    "messages": [{ "role": "user", "content": prompt }],
    "stream": false
  }
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    let content = result.choices[0].message.content
    content = content.trim()

    if (content.startsWith("```")) {
      // Split at the first newline and take everything after it
      content = content.split("\n").slice(1).join("\n")

      if (content.endsWith("```")) {
        // Remove the last 3 characters and trim
        content = content.slice(0, -3).trim()
      }
    }
    content = JSON.parse(content)
    console.log('Success:', content)
    /**{
    
    "total": 129.90,
      "currency": "SEK",
      "storeName": "Clas Ohlson",
      "date": "2026-10-01",
      
      "items": [
        {
          "name": "HALKSKYDD KVILL",
          "price": 129.90,
          "quantity": 1
        }
      ]
    }
      **/
    const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    const receiptDetails = {
      total: content.total_receipt_amount,
      currency: content.currency,
      storeName: content.store_name,
      date: isValidDate(content.date) ? content.date : new Date().toISOString().split('T')[0],
      items: content.items
    }
    console.log(receiptDetails)
    return receiptDetails
  } catch (error) {
    console.error('Error:', error)
  }
}

