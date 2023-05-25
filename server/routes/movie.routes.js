const MovieController = require("../controllers/movie.controller")

module.exports = (app) => {
    // Create movie
    app.post("/api/movies/new", MovieController.createMovie)

    // Get all movies
    app.get("/api/movies", MovieController.allMovies)

    // Get one movie
    app.get("/api/movies/:id", MovieController.oneMovie)
}