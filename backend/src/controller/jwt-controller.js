import { userModel } from "../model/user-model.js"
import bcrypt from "bcryptjs"
import { createJwtToken } from "../services/jwt-service.js"

/**
 * Controller for user authentication and JWT generation.
 * * @param {Object} req - Express request object containing `name` and `password` in the body.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a 200 with a token on success, or 401/500 on failure.
 */
export const authorization = async (req, res) => {
  try {
    const { name, id, password } = req.body
    console.log([name, id, password])
    const user = await userModel.findUserByName(name)
    if (user) {
      const isCorrectLogin = bcrypt.compareSync(password, user.password)
      if (!isCorrectLogin)
        res.status(401).json({ message: "Name or password is wrong :c" })
      else {
        const token = createJwtToken(name, user.id, user.role)
        res.status(200).json({message:"login succesfull",token})
      }
    } else res.status(400).json({ message: "User not found", user })
    
  }
  catch (err) {
    // res.status(500).json({ message: "Internal server error" })
    res.status(500).json(err.stack)
  }
}