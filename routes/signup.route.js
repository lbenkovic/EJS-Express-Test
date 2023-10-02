const express = require("express");
const router = express.Router();
const session = require("express-session")
const { authUser } = require("./auth")
const UserService = require("../services/users.service");

router.get("/signup", (req, res) => {
    res.render('signup')
})

router.post("/signupUser", async (req, res) => {
    const userService = new UserService()
    const username = req.body.username;
    const password = req.body.password;
    const User = {username: username, password: password}
    let success = false;
    try {
        await userService.createUser(User)
        console.log("User created");
        success = true
    } catch (error) {
        console.log("Error creating user");
        success = false;
    }
    if(success) {
        res.redirect("/")
    } else {
        res.send("User already exists")
    }
})

module.exports = router;