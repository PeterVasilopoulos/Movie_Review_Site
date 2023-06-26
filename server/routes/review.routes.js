const express = require('express')

const ReviewController = require("../controllers/review.controller")

const reviewRoutes = express.Router()

// Create review
reviewRoutes.post("/new/:userId", ReviewController.createReview)

// Get all reviews
reviewRoutes.get("/", ReviewController.allReviews)

// Get one review
reviewRoutes.get("/:id", ReviewController.oneReview)

// Update Review
reviewRoutes.put("/update/:id", ReviewController.updateReview)

// Delete Review
reviewRoutes.delete("/delete/:id", ReviewController.deleteReview)



// Get All Reviews By Movie ID
reviewRoutes.get("/movie/:movieId", ReviewController.allReviewsByMovie)

// Get All Reviews by User ID
reviewRoutes.get("/user/:userId", ReviewController.allReviewsByUser)


module.exports = { reviewRoutes } 