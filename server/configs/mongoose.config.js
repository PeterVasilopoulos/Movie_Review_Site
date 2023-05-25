const mongoose = require("mongoose");

const dbName = process.env.DATABASE;

const uri = `mongodb://127.0.0.1/${dbName}`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connection working!", dbName))
.catch((err) => console.log("Database connection error!", err))