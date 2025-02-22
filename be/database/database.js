const mysql = require('mysql2');

const connection = mysql.createConnection({
    database: "nginxbalancertest",
    host: "localhost",
    user: "root",
    password: "root",
})

connection.connect(function (err) {
    if (err) console.log(err)

    console.log("Database Connected")
})

module.exports = {
    connection
}