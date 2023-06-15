const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required"]
    },
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
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    movieId: {
        type: Number
    }
}, {timestamps: true})

const Review = mongoose.model("Review", ReviewSchema)
module.exports = Review