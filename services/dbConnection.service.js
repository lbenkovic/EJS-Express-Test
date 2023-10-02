const fs = require("fs")
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"))
const mysql = require("mysql");

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    connectTimeout: config.db.connectTimeout
})

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Database connected successfully");
    connection.release();
})

module.exports = pool;