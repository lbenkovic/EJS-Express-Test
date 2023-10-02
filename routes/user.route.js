const express = require("express");
const router = express.Router();
const UserAuth = require("../services/users.service");
const { authMiddleware } = require("./auth");
const session = require("express-session")

router.get("/user",authMiddleware, async (req, res) => {
    const username = req.session.username 
    const UserData = { username }
    const userService = new UserAuth();
    let User;
        try {
            User = await userService.getUserByUser(UserData)
            res.render("user", {
                username
            })
        } catch (error) {
            console.log("ERROR");
        }
    });

router.post("/newUsername", authMiddleware, async (req, res) => {
    // console.log("PATCH REQUEST");
    const userId = req.session.userId
    // console.log(userId)
    // console.log(req.body.newUsername);
    const newUsername = req.body.newUsername;
    const userService = new UserAuth();
    let newName;
    try {
        newName = await userService.updateUsername(userId,newUsername);
        req.session.username = newUsername;
        console.log("Username updated");
        res.redirect("/user")
    } catch (error) {
        console.log("ERROR updating");
    }
})

router.post("/deleteUser", authMiddleware, async (req, res) => {
    const userService = new UserAuth()
    const userId = req.session.userId
    const userName = req.session.username
    const userPass = req.session.password
    const User = {userId: userId, userName: userName, userPass: userPass}
    console.log(User);
    try {
        await userService.deleteUser(User)
    } catch (error) {
        console.log("ERROR DELETING USER")
    }
    req.session.destroy(function(err) {
        if(err){
          console.log(err)
        } else {
          console.log("User deleted");
          res.redirect('/');
        }
      });
})
module.exports = router;