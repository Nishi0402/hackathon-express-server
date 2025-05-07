"use strict";

const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "W1_89664_Nishigandha",
    password: "manager",
    database: "quotes_db"

})

module.exports = pool 
