import jwt from 'jsonwebtoken'

/**
 * Generate a JWT token.
 *
 * @param {string} username Username of the user.
 * @returns {object} Details on the user.
 */
export const createJwtToken = (username, role) => {
  const payload = {
    iss: 'Issuer id',
    sub: username,
    username,
    role,
    // iat: Date.now(),
  }
  const options = {
    expiresIn: '1h' //10mins?
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, options)
  return token
}