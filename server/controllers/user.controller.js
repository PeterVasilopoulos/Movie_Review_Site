const User = require("../models/user.model")

// Create User
module.exports.createUser = async (req, res) => {
    try {
        req.session.user = await User.create(req.body);
        await req.session.save();
        return res.json(req.session.user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

// Get All Users
module.exports.allUsers = (req, res) => {
    User.find()
    .then(allUsers => res.json({results: allUsers}))
    .catch(err => res.json(err))
}

// Get One User
module.exports.oneUser = (req, res) => {
    const userId = req.params.id
    User.findOne({_id: userId}).populate("reviews")
    .then(user => res.json({results: user}))
    .catch(err => res.json(err))
}

// Check For Cookies
module.exports.cookie = (req, res) => {
    res
        .cookie("testkey", "testvalue", {httpOnly:true})
        .json("success")
}


// --------------------------------------------
// AUTHENTICATION
// --------------------------------------------


// Get Logged In User
module.exports.getLoggedUser = (req, res) => res.json(req.session.user);

// Login
module.exports.login = async (req, res) => {
    try {
        req.session.user = await User.checkLogin(req.body);
        await req.session.save();
        return res.json(req.session.user);
    } catch (error) {
        return res.status(401).json(error);
    }
}

// Logout
module.exports.logout = (req, res) => {
    req.session.destroy();
    return res.json({ message: "success" });
}