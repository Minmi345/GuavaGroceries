import { userModel } from '../model/user-model.js'
/** @module userController */
import bcrypt from "bcryptjs"
export const controller = {}

/**
 * Retrieves all users.
 * @memberof module:userController
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @throws {500} If a database or server error occurs.
 */
controller.getUsers = async (req, res) => {
  try {
    const users = await userModel.findUsers()
    res.status(200).json(users)
  }
  catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

/**
 * Retrieves a single user by ID.
 * @memberof module:userController
 * @param {ExpressRequest} req - Expects `req.params.id`.
 * @param {ExpressResponse} res - Returns the user json.
 * @throws {404} If no user with the given ID exists.
 * @throws {500} If a database or server error occurs.
 */
controller.getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const user = await userModel.findUserById(id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        error: 'No such user found'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

/**
 * Creates a new user.
 * @memberof module:userController
 * @param {ExpressRequest} req - Expects `req.body` with `name` and `password`.
 * @param {ExpressResponse} res - Return the user json.
 * @throws {500} If a database or server error occurs.
 */
controller.addUser = async (req, res) => {
  try {
    const { name, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashed_password = bcrypt.hashSync(password, salt)
    const userId = await userModel.addUser(name, hashed_password)
    if (userId == -1) res.status(409).send({ message: "User already exists" })
    res.status(201).json({
      userId
    })
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

/**
 * Partially or fully updates a user by ID.
 * @memberof module:userController
 * @param {ExpressRequest} req - Expects `req.params.id` and `req.body` with fields to update.
 * @param {ExpressResponse} res - Return the updated user.
 * @throws {404} If no user with the given ID exists.
 * @throws {500} If a database or server error occurs.
 */
controller.updateUser = async (req, res) => {
  try {
    const updated = await userModel.updateUser(parseInt(req.params.id, 10), req.body)
    if (updated)
      res.status(200).json({
        updated
      })
    else
      res.status(404).json({
        error: 'User not found.'
      })

  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

/**
 * Updates the role of a specific user by ID.
 * @memberof module:userController
 * @param {ExpressRequest} req - Expects `req.params.id` and `req.body.role`.
 * @param {ExpressResponse} res - Returns the updated user object and success message.
 * @throws {404} If no user with the given ID exists.
 * @throws {500} If a database or server error occurs.
 */
controller.updateRole = async (req, res) => {
  try {
    const id = req.params.id
    const role = req.body.role
    const updated = await userModel.updateRole(id, role)
    if (updated)
      res.status(200).json({
        updated
      })
    else
      res.status(404).json({
        error: 'User not found.'
      })
  }
  catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}

/**
 * Deletes a user by ID.
 * @memberof module:userController
 * @param {ExpressRequest} req - Expects `req.params.id`.
 * @param {ExpressResponse} res - Returns the deleted users id and name.
 * @throws {404} If no user with the given ID exists.
 * @throws {500} If a database or server error occurs.
 */
controller.deleteUser = async (req, res) => {
  try {
    const deleted = await userModel.deleteUser(parseInt(req.params.id, 10))
    if (deleted) {
      res.status(200).json({
        userId: deleted.id,
        name: deleted.name
      })
    } else {
      res.status(404).json({
        error: 'User not found.'
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.stack
    })
  }
}
