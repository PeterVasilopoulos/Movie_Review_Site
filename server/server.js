const express = require("express")
const cors = require("cors")
const { ironSession } = require("iron-session/express")

require("dotenv").config()
const port = 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(ironSession({
    cookieName: "UserCookie",
    password: process.env.COOKIE_SECRET,
    cookieOptions: {secure: process.env.NODE_ENV === "production"}
}))

require("./configs/mongoose.config")

const { userRoutes } = require('./routes/user.routes')
const { reviewRoutes } = require('./routes/review.routes')

app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)

app.listen(port, () => console.log("Port connection established on port", port))