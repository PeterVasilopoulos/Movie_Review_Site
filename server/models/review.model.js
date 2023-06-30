const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReviewSchema = new mongoose.Schema({
    body: {
        type: String
    },
    rating: {
        type: Number,
        required: [true, "Movie rating required (1-10)"],
        min: [1, "Movie rating required (1-10)"],
        max: [10, "Movie rating required (1-10)"]
    },
    date: {
        type: Date,
        required: [true, "Watch date is required"]
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    rewatch: {
        type: Boolean,
        required: [true, "'Watched before?' selection is required"]
    },
    movieId: {
        type: Number
    },
    movieTitle: {
        type: String
    },
    moviePosterPath: {
        type: String
    }
}, {timestamps: true})

const Review = mongoose.model("Review", ReviewSchema)
module.exports = Review