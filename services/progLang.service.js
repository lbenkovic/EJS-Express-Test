const db = require("./dbConnection.service")

class ProgrammingLanguages {
    dbTable = "programming_languages";
    order = "githut_rank"

    getAll() {
        const sql = `SELECT * FROM ${this.dbTable} ORDER BY ${this.order} ASC`
        // const sql = "SELECT * FROM " + this.dbTable + " ORDER BY " + this.order + " ASC;";

        return new Promise ((resolve, reject) => {
            db.query(sql, (err, data) => {
                if (err) {
                    reject(data);
                } else {
                    data = JSON.parse(JSON.stringify(data))
                    resolve(data);
                }
            })
        })
    }
}

module.exports = ProgrammingLanguages;