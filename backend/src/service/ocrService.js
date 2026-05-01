import vision from '@google-cloud/vision';

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
export const processImage = async (filepath = 'src/receipts/receipt.png') => {

  // Performs text detection on the local file
  const [result] = await client.textDetection(filepath);
  //const detections = result.textAnnotations;
  //console.log('Text:');
  //detections.forEach(text => console.log(text));

  const text = result.textAnnotations[0]?.description
  console.log(text)
  return text
}
