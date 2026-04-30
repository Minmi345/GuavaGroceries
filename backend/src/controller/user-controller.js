import { userModel } from '../model/user-model.js'
export const controller = {}

const users = [{}]

controller.getUsers = async (req, res) => {
    try{
        const users = await userModel.findUsers()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({
            error: err.stack
        })
    }
}

controller.getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const user = users.find(u => u.id === id)
        if (user) {
            res.json({
                name: user.name
            })
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

controller.addUser = async (req, res) => {
    try {
        const user = req.body
        const userId = await userModel.addUser(user)
        res.status(201).json({
            userId
        })
    } catch (err) {
        res.status(500).json({
            error: err.stack
        })
    }
}

controller.updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const updatedData = await req.body
        const user = users.find(u => u.id === userId)
        if (user) {
            Object.assign(user, updatedData)
            res.json({
                user
            })
        } else {
            res.status(404).json({
                error: 'User not found.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

controller.replaceUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const newUserData = await req.body
        const userIndex = users.findIndex(u => u.id === userId)
        if (userIndex !== -1) {
            newUserData.id = userId
            users[userIndex] = newUserData
            res.json({
                newUserData
            })
        } else {
            res.status(404).json({
                error: 'User not found.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

controller.deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const userIndex = users.findIndex(u => u.id === userId)
        if (userIndex !== -1) {
            users.splice(userIndex, 1)
            res.status(204).json()
        } else {
            res.status(404).json({
                error: 'User not found.'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}