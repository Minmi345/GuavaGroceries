import { userModel } from '../model/user-model.js'
export const controller = {}

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
        const user = await userModel.findUserById(id)
        if (user) {
            res.json(user)
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
        const updated = await userModel.updateUser(req.params.id, req.body)
        if (updated) {
            res.status(200).json({
                updated
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

controller.deleteUser = async (req, res) => {
    try {
        const deleted = await userModel.deleteUser(parseInt(req.params.id))
        if (deleted) {
            res.status(200).json({
                userId: deleted.userId,
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