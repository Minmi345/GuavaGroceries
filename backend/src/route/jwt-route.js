/**
 * JWT authentication paths
 * @file jwt-route
 * @module route/jwt-route
 */

import express from 'express'
import { authorization as authorize } from '../controller/jwt-controller.js'

export const router = express.Router()

/**
 * Route: `POST /jwt/login`<br>
 * Description: Get jwt token
 * @function login
 * @name login
 * @memberof module:route/jwt-route
 * @param {ExpressRequest} req - Express request
 * @param {string} req.body.name - User name
 * @param {string} req.body.password - User password
 * @param {ExpressResponse} res - Express response
 * @param {string} res.body.token - JWT authentication token
 * @returns {200} Token created successfully.
 * @returns {401} Name or password wrong
 * @returns {404} If user not found
 * @returns {500} If the server encountered an error.
 */
router.post('/login', function login(req, res) {
  authorize(req, res)
})
