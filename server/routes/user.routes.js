const express = require('express')

const UserController = require("../controllers/user.controller")

const {authenticate} = require('../configs/middleware.config')

const userRoutes = express.Router()

// -------------------------
// User Routes
// -------------------------

// Create user 
userRoutes.post("/new", UserController.createUser)

// Get all users
userRoutes.get("/", UserController.allUsers)

// Get one user
userRoutes.get("/:id/view", UserController.oneUser)

// Cookie test
userRoutes.get("/cookie", UserController.cookie)

// -------------------------
// Authentication Routes
// -------------------------

// Login
userRoutes.post('/login', UserController.login)

// Get Logged In User
userRoutes.get('/loggedin', authenticate, UserController.getLoggedUser)

// Logout
userRoutes.delete('/logout', authenticate, UserController.logout)

module.exports = { userRoutes }