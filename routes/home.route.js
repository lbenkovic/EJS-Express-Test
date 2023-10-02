const express = require("express");
const router = express.Router();
const session = require("express-session")
const Data = require("../services/data.service")
const { authMiddleware } = require("./auth")
const UserAuth = require("../services/users.service")
const UserProg = require("../services/user_prog.service")

router.get("/home", authMiddleware, async (req, res) => {
    const userAuth = new UserAuth();
    const userProg = new UserProg();
    let dbData;
    let userLang;
    const someData = new Data();
    const moreData = someData.getData();
    const username = req.session.username
    const userName = {username:username}
    const helloPara = "Hello paragraph!";
    const dataArray = [0,9,8,1,1,1,1,4,3,2,3];
    const dataObj = [
        {
            "name": "Luke",
            "surname": "Skywalker",
            "movie": "Star Wars", 
        },
        {
            "name": "Harry",
            "surname": "Potter",
            "movie": "Harry Potter and the philosopher's stone"
        },
        {
            "name": "Dominic",
            "surname": "Toretto",
            "movie": "Fast and Furious"
        },
        {
            "name": "Benoit",
            "surname": "Blanc",
            "movie": "Knives Out"
        },
    ]
    if (req.session.token) {
        try {
            dbData = await userAuth.getUserByUser(userName);
            dbData = JSON.parse(JSON.stringify(dbData));
            userId = dbData[0].id;
            userLang = await userProg.getUserProgLang(userId);
            // console.log(userLang);
            res.render("home", {
                helloPara: helloPara,
                username: username,
                moreData: moreData,
                dataArray: dataArray,
                dataObj: dataObj,
                userLang
            })
        } catch(error) {
            console.log("error", error);
        }
    } else {
        res.redirect("/")
    }
})

router.post("/userProgLang", authMiddleware, async (req, res) => {
    const userProg = new UserProg()
    const userId = req.session.userId
    const prog_name = req.body.programminglanguage
    try {
        await userProg.addUserProgLang(prog_name, userId)
        console.log("User programming language added");
    } catch (error) {
        console.log("error", error);
    }
    res.redirect("/home")
})

router.post("/deleteProg", authMiddleware, async (req, res) => {
    const userProg = new UserProg()
    const progLangId = req.body.userProgId;
    const userId = req.session.userId
    try {
        await userProg.deleteUserProgLang(progLangId, userId)
        console.log("User programming language deleted");
    } catch (error) {
        console.log("Error", error);
    }
    res.redirect("/home")
})

router.post("/updateUserProg", authMiddleware, async (req, res) => {
    const userProg = new UserProg()
    const progLangId = req.body.userProgId;
    console.log(progLangId);
    const userId = req.session.userId;
    const newProgName = req.body.newProgName;
    try {
        await userProg.updateUserProgLang(progLangId, newProgName, userId)
        console.log("User programming language updated");
    } catch (error) {
        console.log("Error", error);
    }
    res.redirect("/home")
})
module.exports = router;