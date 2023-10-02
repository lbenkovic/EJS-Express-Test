const express = require("express")
const app = express();
const session = require("express-session")

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const homeRoute = require("./routes/home.route")
const loginRoute = require("./routes/login.route")
const userRoute = require("./routes/user.route")
const dbRoute = require("./routes/progLang.route")
const signupRoute = require("./routes/signup.route")

app.use("/", homeRoute); // home
app.use("/", loginRoute); // login
app.use("/", userRoute); // "profil"
app.use("/", dbRoute) // db
app.use("/", signupRoute)

app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
});