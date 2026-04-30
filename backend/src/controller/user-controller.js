import {findUsers} from '../model/user-model.js'
export const controller = {}

const users = [
    { id: 0, name: 'John' },
    { id: 1, name: 'Bill' },
    { id: 2, name: 'Sharona' }
]

controller.getUsers = async (req, res) => {
    try{
        res.json(findUsers())
    }
    catch{
        res.status(500).json({
            error: err.message
        })
    }
    // res.json(users)
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
            error: err.message
        })
    }
}

controller.addUser = async (req, res) => {
    try {
        const name = await req.body.name

        const newId = users.length > 0
          ? Math.max(...users.map(u => u.id)) +1
          : 1
        
        const newUser = {
            id: newId,
            name: name
        }

        users.push(newUser)
        res.status(201).json({
            newUser
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
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