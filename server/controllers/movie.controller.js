const Movie = require("../models/movie.model")

// Create Movie
module.exports.createMovie = (req, res) => {
    const newMovie = req.body
    Movie.create(newMovie)
    .then(movie => res.json({results: review}))
    .catch(err => res.status(400).json(err))
}

// Get All Movies
module.exports.allMovies = (req, res) => {
    Movie.find()
    .then(allMovies => res.json({results: allMovies}))
    .catch(err => res.json(err))
}

// Get One Movie
module.exports.oneMovie = (req, res) => {
    const movieId = req.params.id
    Movie.findOne({_id: movieId}).populate("reviews")
    .then(movie => res.json({results: movie}))
    .catch(err => res.json(err))
}