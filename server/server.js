const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()
const port = 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

require("./configs/mongoose.config")

const { userRoutes } = require('./routes/user.routes')
const { reviewRoutes } = require('./routes/review.routes')

app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)

app.listen(port, () => console.log("Port connection established on port", port))

// How to check if something is already in the database with an id

// How to create global varaibles
// or how to send varaibles between components

// How to test a review on postman with Date and User Object