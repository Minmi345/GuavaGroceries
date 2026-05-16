import jwt from 'jsonwebtoken'

/**
 * Generate a JWT token.
 *
 * @param {string} username Username of the user.
 * @returns {object} Details on the user.
 */
export const createJwtToken = (username, id, role) => {
  const payload = {
    iss: 'Issuer id',
    sub: username,
    id,
    role
  }
  const options = {
    expiresIn: '1h' //10mins?
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, options)
  return token
}