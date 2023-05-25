const ReviewController = require("../controllers/review.controller")

module.exports = (app) => {
    // Create review
    app.post("/api/reviews/new/:userId/:movieId", ReviewController.createReview)

    // Get all reviews
    app.get("/api/reviews", ReviewController.allReviews)

    // Get one review
    app.get("/api/reviews/:id", ReviewController.oneReview)

    // Update Review
    app.put("/api/reviews/update/:id", ReviewController.updateReview)

    // Delete Review
    app.delete("/api/reviews/delete/:id", ReviewController.deleteReview)



    // Get All Reviews By Movie ID
    app.get("/api/reviews/movie/:movieId", ReviewController.allReviewsByMovie)

    // Get All Reviews by User ID
    app.get("/api/reviews/user/:userId", ReviewController.allReviewsByUser)
}