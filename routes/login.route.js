const express = require("express");
const router = express.Router();
const session = require("express-session")
const { authUser } = require("./auth")

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Auth
    try {
        let result = await authUser(username, password);
        if (result instanceof Error && result.message == "Unathorized") {
            res.redirect("/")
        }
        // console.log(result);
        req.session.userId = result.userId
        req.session.token = result.token;
        req.session.username = username;
        req.session.password = password;
        res.redirect("/home");
    } catch (error) {
        console.log("User doesnt exist/Wrong credentials");
        res.redirect("/")
    }
})

router.get("/", (req, res) => {
    const token = req.session.token;
    if (!token){
        res.render('login')
    }
    else {
        res.redirect("/home")
    }
})

router.get("/odjava", (req, res) => {
    delete res.locals;
    if (req.session) {
        req.session.destroy(function(err) {
          if(err){
            console.log(err)
          } else {
            console.log("Logged out");
            res.redirect('/');
          }
        });
      } else {
        res.redirect('/');
      }
})

module.exports = router;
