/**const ocrService = require("../service/ocr-service.js")

const imageToText = async (req, res) => {
  try {
    const labels = await ocrService.processImage(req.file.path)
    res.json({ labels })
  } catch (err) {
    res.status(500).json({ error: "Failed to process image" })
  }
}

module.exports = { imageToText }
**/
