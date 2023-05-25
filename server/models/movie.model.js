const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MovieSchema = new mongoose.Schema({
    movie_id: {
        type: String
    },
    title: {
        type: String
    },
    release_day: {
        type: Number
    },
    release_month: {
        type: Number
    },
    release_year: {
        type: Number
    },
    image: {
        type: String
    },
    runtime: {
        type: Number
    },
    director: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
})

const Movie = mongoose.model("Movie", MovieSchema)
module.exports = Movie