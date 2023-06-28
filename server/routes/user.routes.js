const express = require('express')

const UserController = require("../controllers/user.controller")

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
userRoutes.get('/loggedin', UserController.getLoggedUser)

// Logout
userRoutes.delete('/logout', UserController.logout)

module.exports = { userRoutes }