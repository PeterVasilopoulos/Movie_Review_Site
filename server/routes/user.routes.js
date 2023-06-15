const express = require('express')

const UserController = require("../controllers/user.controller")

const userRoutes = express.Router()

    // Create user 
    userRoutes.post("/new", UserController.createUser)

    // Get all users
    userRoutes.get("/", UserController.allUsers)

    // Get one user
    userRoutes.get("/:id", UserController.oneUser)

    module.exports = { userRoutes }