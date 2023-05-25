const express = require("express")
const cors = require("cors")

require("dotenv").config()
const port = 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

require("./configs/mongoose.config")

const Routes = require("./routes/review.routes")
Routes(app)

app.listen(port, () => console.log("Port connection established on port", port))

// How to add multiple routes on this page

// How to change set the _id when posting

// How to check if something is already in the database with an id

// How to create global varaibles
// or how to send varaibles between components