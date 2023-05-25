const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name required"]
    },
    username: {
        type: String,
        required: [true, "Username required"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)
module.exports = User