const User = require("../models/user.model")

// Create User
module.exports.createUser = (req, res) => {
    const newUser = req.body
    User.create(newUser)
    .then(user => res.json({results: review}))
    .catch(err => res.status(400).json(err))
}

// Get All Users
module.exports.allUsers = (req, res) => {
    User.find()
    .then(allUsers => res.json({results: allUsers}))
    .catch(err => res.json(err))
}

// Get One User
module.exports.oneUser = (req, res) => {
    const userId = req.params.id
    User.findOne({_id: userId}).populate("reviews")
    .then(user => res.json({results: user}))
    .catch(err => res.json(err))
} 