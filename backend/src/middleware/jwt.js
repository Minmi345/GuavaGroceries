import jwt from 'jsonwebtoken'

/**
 * Middleware to verify the presence and validity of a JSON Web Token (JWT).
 * * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {Object} Returns a 401 response if no token is found, or a 403 if the token is invalid.
 */
export const jwtTokenIsValid = (req, res, next) => {
  const authHeader = req.header('Authorization')
  // Extract token from "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1] 

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.locals.jwt = decoded
    next() 
  } catch (error) {
    console.error(error)
    return res.status(403).json({ error: 'JWT token is not valid.' })
  }
}

export const jwtTokenRole = (req,res,next) => {

}

//example
// curl -X GET http://localhost:3001/api/message \
//   -H "Authorization: Bearer YOUR_TOKEN_HERE"

