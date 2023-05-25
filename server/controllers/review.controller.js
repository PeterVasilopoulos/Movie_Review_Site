const Review = require("../models/review.model")

// Create Review
module.exports.createReview = (req, res) => {
    const userId = req.params.userId
    const movieId = req.params.movieId
    const newReview = new Review(req.body)
    newReview.user = userId
    newReview.movie = movieId
    newReview.save()
    .then(review => {
        // Adding review to user's review list
        const user = User.findOne({_id: userId})
        .then(foundUser => {
            foundUser.reviews.push(newReview)
            foundUser.save()
                .then(userRes => res.json(userRes))
        })

        // Adding review to movie's review list
        const movie = Movie.findOne({_id: movieId})
        .then(foundMovie => {
            foundMovie.reviews.push(newReview)
            foundMovie.save()
                .then(movieRes => res.json(movieRes))
        })
    })
    .catch(err => res.status(400).json(err))
}

// Get All Reviews
module.exports.allReviews = (req, res) => {
    Review.find()
    .then(allReviews => res.json({results: allReviews}))
    .catch(err => res.json(err))
}

// Get One Review
module.exports.oneReview = (req, res) => {
    const reviewId = req.params.id
    Review.findOne({_id: reviewId})
    .then(oneReview => res.json({results: oneReview}))
    .catch(err => res.json(err))
}

// Update Review
module.exports.updateReview = (req, res) => {
    const reviewId = req.params.id 
    const updatedReview = req.body
    Review.findOneAndUpdate({_id: reviewId}, updatedReview, {new: true})
    .then(review => res.json({results: review}))
    .catch(err => res.status(400).json(err))
}

// Delete Review
module.exports.deleteReview = (req, res) => {
    const reviewId = req.params.id
    Review.findOneAndDelete({_id: reviewId})
    .then(review => res.json({results: review}))
    .catch(err => res.json(err))
}

// ------------------------------------------------------------------------

// Get All Reviews By Movie ID
module.exports.allReviewsByMovie = (req, res) => {
    const movieId = req.params.movieId
    Review.find({movie: movieId}).populate("movie")
    .then(reviews => res.json({results: reviews}))
    .catch(err => res.json(err))
}

// Get All Reviews By User ID
module.exports.allReviewsByUser = (req, res) => {
    const userId = req.params.userId
    Review.find({user: userId}).populate("user")
    .then(reviews => res.json({results: reviews}))
    .catch(err => res.json(err))
}