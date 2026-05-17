//User routes

/**
 * All the user paths
 * @file users-route
 * @module route/users-route
 */

import express from 'express'
import { verificate } from '../middleware/input-verification.js'
import { controller as userController } from '../controller/user-controller.js'

export const router = express.Router()

/**
 * Route: `GET /users`<br>
 * Description: Get all users
 * @function getUsers
 * @name getUsers
 * @memberof module:route/users-route
 * @param {ExpressRequest} req - Express request
 * @param {ExpressResponse} res - Express response
 * @param {Array} res.body - Array of user objects
 * @returns {200} If success.
 * @returns {500} If the server encountered an error.
 */
router.get('/', function getUsers(req, res) {
  userController.getUsers(req, res)
})

/**
 * Route: `GET /users/:id`<br>
 * Description: Gets a user by ID.
 * @function getUserById
 * @name getUserById
 * @memberof module:route/users-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.id - The user's ID
 * @param {ExpressResponse} res - Express response
 * @param {number} res.body.id - User ID
 * @param {string} res.body.name - User name
 * @param {string} res.body.password - User password
 * @param {string} res.body.role - User role
 * @returns {200} If user found
 * @returns {404} If no user with the given ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.get('/:id', function getUserById(req, res) {
  verificate.id(req, res, () => userController.getUserById(req, res))
})

/**
 * Route: `POST /users`<br>
 * Description: Creates a new user
 * @function addUser
 * @name addUser
 * @memberof module:route/users-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.body.name - User name
 * @param {string} req.body.password - User password
 * @param {ExpressResponse} res - Express response
 * @param {number} res.body.userId - The created user's ID
 * @returns {201} If user created successfully.
 * @returns {409} If user already exists.
 * @returns {500} If a database or server error occurs.
 */
router.post('/', function addUser(req, res) {
  userController.addUser(req, res)
})

/**
 * Route: `PATCH /users/:id`<br>
 * Description: Partially update user details by ID.
 * @function updateUser
 * @name updateUser
 * @memberof module:route/users-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.id - The user's ID
 * @param {string} [req.body.name] - User name
 * @param {string} [req.body.password] - User password
 * @param {string} [req.body.role] - User role
 * @param {ExpressResponse} res - Express response
 * @param {number} res.body.id - User ID
 * @param {string} res.body.name - User name
 * @param {string} res.body.password - User password
 * @param {string} res.body.role - User role
 * @returns {200} If update succeeds.
 * @returns {404} If no user with the given ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.patch('/:id', function updateUser(req, res) {
  verificate.id(req, res, () => userController.updateUser(req, res))
})

/**
 * Route: `PATCH /users/newRole/:id`<br>
 * Description: Update role by ID.
 * @function updateRole
 * @name updateRole
 * @memberof module:route/users-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.id - The user's ID
 * @param {string} req.body.role - New role for the user
 * @param {ExpressResponse} res - Express response
 * @param {number} res.body.id - User ID
 * @param {string} res.body.role - Updated role
 * @returns {200} If update succeeds.
 * @returns {404} If no user with the given ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.patch('/newRole/:id', function updateRole(req, res) {
  verificate.id(req, res, () => userController.updateRole(req, res))
})

/**
 * Route: `DELETE /users/:id`<br>
 * Description: Delete a user by ID
 * @function deleteUser
 * @name deleteUser
 * @memberof module:route/users-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.params.id - The user's ID
 * @param {ExpressResponse} res - Express response
 * @param {number} res.body.userId - Deleted user's ID
 * @param {string} res.body.name - Deleted user's name
 * @returns {200} If the delete succeeds.
 * @returns {404} If no user with the given ID exists.
 * @returns {500} If a database or server error occurs.
 */
router.delete('/:id', function deleteUser(req, res) {
  verificate.id(req, res, () => userController.deleteUser(req, res))
})
