const db = require("./dbConnection.service")

class UserProg {
    dbTable = "user_prog"

    getUserProgLang(user_id) {
        const sql = `SELECT id,name_prog,user_id FROM ${this.dbTable} WHERE user_id = ${user_id}`

        return new Promise ((resolve, reject) => {
            db.query(sql, (err, data) => {
                if (err) {
                    reject(data)
                } else {
                    data = JSON.parse(JSON.stringify(data))
                    resolve(data)
                }
            })
        })
    }
    addUserProgLang(prog_name, user_id) {
        const sql = `INSERT INTO ${this.dbTable}(name_prog, user_id) VALUES (?,?)`

        return new Promise ((resolve, reject) => {
            db.query(sql, [prog_name, user_id], (err, data) => {
                if (err) {
                    console.log(err);
                    reject(data)
                } else {
                    console.log(data);
                    resolve(data)
                }
            })
        })
    }
    deleteUserProgLang(progLangId, userId) {
        const sql = `DELETE FROM ${this.dbTable} WHERE id = ? AND user_id = ?--`

        return new Promise ((resolve, reject) => {
            db.query(sql, [progLangId, userId], (err, data) => {
                if (err) {
                    console.log(err);
                    reject(data)
                } else {
                    console.log(data);
                    resolve(data)
                }
            })
        })
    }
    updateUserProgLang(progLangId, progName, userId) {
        const sql = `UPDATE ${this.dbTable} SET name_prog = ? WHERE user_id = ? AND id = ?`

        return new Promise ((resolve, reject) => {
            db.query(sql, [progName, userId, progLangId], (err, data) => {
                if (err) {
                    console.log(err);
                    reject(data)
                } else {
                    console.log(data);
                    resolve(data)
                }
            })
        })
    }
}

module.exports = UserProg;