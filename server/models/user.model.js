const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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


// Confirm Password Virtual Variable
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

// Check if Password and Confirm Password are the Same
UserSchema.pre("validate", function(next) {
    if(this.confirmPassword) {
        if(this.password !== this.confirmPassword) {
            this.invalidate("confirmPassword", "Passwords must match");
        }
    }
    next()
})

// Hash Password with BCrypt
UserSchema.pre("save", function(next) {
    if(this.confirmPassword) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash
                next()
            })
    }
    next()
})

// Statistic Method To Handle Login Validations
UserSchema.statics.checkLogin = async function({username, password}) {
    const user = await this.findOne({username})
    if(user && !bcrypt.compare(password, user.password)) {
        throw new this().invalidate("password", "Invalid Login")
    }
    if(!(user && await bcrypt.compare(password, user.password))) {
        throw new this().invalidate("password", "Invalid Login")
    }
    return user;
}


const User = mongoose.model("User", UserSchema)
module.exports = User