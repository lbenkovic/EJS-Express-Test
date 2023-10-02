const db = require("./dbConnection.service")

class ProgrammingLanguagesChapters {
    dbTable = "programming_languages_chapter"

    getChapters(id) {
        const sql = `SELECT * FROM ${this.dbTable} WHERE programming_language_id = ${id};`
    
        return new Promise ((resolve, reject) => {
            db.query(sql, (err, data) => {
                if(err) {
                    reject(data)
                } else {
                    // console.log("GET CHAPTERS DATA:",data);
                    data = JSON.parse(JSON.stringify(data))
                    resolve(data)
                }
            })
        })
    }
}

module.exports = ProgrammingLanguagesChapters;