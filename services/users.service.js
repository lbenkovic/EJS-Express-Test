const db = require("./dbConnection.service")

class UserAuth {
    dbTable = "users"
    getUsers() {

        try {
            const sql = `SELECT * FROM ${this.dbTable}`;
            return new Promise ((resolve, reject) => {
                db.query(sql, (err, data) => {
                    if (err) {
                        reject(data)
                    } else {
                        resolve(data);
                    }
                })
            })
        } catch (error) {
            console.error('Error reading users from db:', error);
            return [];
        }
    }
    getUserByUserAndPass(User) {
        const sql = `SELECT id,username,password FROM ${this.dbTable} WHERE username LIKE '${User.username}' AND password LIKE '${User.password}'`
        return new Promise ((resolve, reject) => {
            db.query(sql, (err, data) => {
                if (err) {
                    reject(data)
                } else {
                    // console.log(data);
                    resolve(data)
                }
            })
        })
    }
    getUserByUser(User){
        const sql = `SELECT id,username FROM ${this.dbTable} WHERE username LIKE '${User.username}'`
        return new Promise ((resolve, reject) => {
            db.query(sql, (err, data) => {
                if (err) {
                    reject(data)
                } else {
                    resolve(data)
                }
            })
        })
    }
    updateUsername(userId, newUsername){
        const sql = `UPDATE ${this.dbTable} SET username = ? WHERE id = ?`
        return new Promise ((resolve, reject) => {
            db.query(sql, [newUsername, userId], (err, data) => {
                if(err) {
                    console.log(err);
                    reject(data)
                } else {
                    resolve(data)
                }
            })
        })
    }
    deleteUser(User){
        const sql = `DELETE FROM ${this.dbTable} WHERE id = ? AND username = ? AND password = ?`
        return new Promise ((resolve, reject) => {
            db.query(sql, [User.userId, User.userName, User.userPass], (err, data) => {
                if(err) {
                    console.log(err);
                    reject(data)
                } else {
                    console.log(data);
                    resolve(data)
                }
            })
        })
    }
    createUser(User){
        const sql = `INSERT INTO ${this.dbTable}(username,password) VALUES (?,?)`
        return new Promise ((resolve, reject) => {
            db.query(sql, [User.username, User.password], (err, data) => {
                if(err) {
                    console.log(err);
                    reject(data)
                } else {
                    // console.log(data);
                    resolve(data)
                }
            })
        })
    }
}

module.exports = UserAuth;
