const UserController = require("../controllers/user.controller")

module.exports = (app) => {
    // Create user 
    app.post("/api/users/new", UserController.createUser)

    // Get all users
    app.get("/api/users", UserController.allUsers)

    // Get one user
    app.get("/api/users/:id", UserController.oneUser)
}