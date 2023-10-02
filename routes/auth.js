const config = require("../config.json")
const UserAuth = require("../services/users.service")
const session = require("express-session")
const jwt = require("jsonwebtoken")

async function authUser(username, password){
    const User = {username: username, password: password}
    const userService = new UserAuth()

    try {
        const response = await userService.getUserByUserAndPass(User);
        // console.log(response[0].id);
        // req.session.userId = response[0].id
        if (response[0].username && response[0].password){
            const authenticatedUser = {
                userId: response[0].id,
                username: response[0].username,
                password: response[0].password
            };
            // req.session.userId = response[0].id
            let token = jwt.sign(authenticatedUser, config.jwtSecretKey);
            return {
                token,
                username: authenticatedUser.username,
                userId: authenticatedUser.userId
            }
        } else {
            throw new Error("Unathorized")
        }
    } catch (error) {
        throw error;
    }
}
    function authMiddleware (req, res, next) {
        try {
            const token = req.session.token;
    
            if (!token) {
                return res.redirect("/")
            }
    
            jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
                if (err) {
                    return res.redirect("/")
                }
                req.jwt = decoded;
                console.log("Token verified");
                next();
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
//     function authMiddleware (req, res, next) {
//         try {
//             let authorization = req.headers["authorization"].split(" ");
//             console.log(authorization);
//             let type = authorization[0];
//             let token = authorization[1];
//             let refreshToken = req.headers["refreshtoken"]
//             let username = req.headers["username"];
//             if (type != "Bearer"){
//                 return res.status(401).json({error:"Unauthorized"})
//             } else {
//                 try {
//                     req.jwt = jwt.verify(token, config.jwtSecretKey);
//                     console.log("AUTH MIDDLEWARE: FIRST TOKEN");
//                     next();
//                 } catch (error){
//                     if (error.name == "TokenExpiredError") {
//                         try {
//                             if (refreshToken == null) {
//                                 return res.status(401).json({error: "Unauthorized"})
//                             }
//                             req.jwt = jwt.verify(refreshToken, config.jwtRefreshSecret)
//                             let authenticatedUser = {username: username}

//                             let token = jwt.sign(authenticatedUser, config.jwtSecretKey)
//                             req.jwt = jwt.verify(token, config.jwtSecretKey)
//                             console.log("TOKEN REFRESHED");
//                             next();
//                         }catch (error) {
//                             return res.status(401).json({ error: "Unauthorized"})
//                     }
//                 }else {
//                     return res.status(401).json({ error: "Unauthorized"})
//                 }
//             }
//         }
//     } catch(error) {
//         console.log(error);
//         return res.status(401).json({ error: "Unauthorized"})
//     }
// }
module.exports = {
    authUser,
    authMiddleware
}