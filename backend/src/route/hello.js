//test routes to know that it is working
import express from 'express'
import http from 'http'
export const router = express.Router()

router.get('/', (req, res) => {
  res.send('Start page')
})

router.get('/hello', (req, res) => {
  res.send('Hello World!')
})


router.get('/api/hello', (req, res) => {
  const json = {
    "message": "Hello World!",
    "date": new Date()
  }
  res.json(json)
})

router.get('/api/message', (req,res) =>{
  res.json({message:"Hello from backend :)"})
})

router.get('/500', (req, res, next) => {
  const err = new Error(http.STATUS_CODES[500] || 'Internal Server Error')
  err.status = 500
  next(err) // Pass the error to the error handler
})

