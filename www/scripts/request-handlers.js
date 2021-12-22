const mysql = require("mysql");
require("dotenv").config();

const connectionOptions = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

function getAnimals(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let sql = mysql.format("SELECT * FROM animals");
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error')
        } else {
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.json(errorMessage);
            }
        }
    });
    connection.end();
}

function getUsers(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let sql = mysql.format("SELECT * FROM users");
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error')
        } else {
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.json(errorMessage);
            }
        }
    });
    connection.end();
}

function getPosts(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let sql = mysql.format("SELECT * FROM posts");
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error')
        } else {
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.json(errorMessage);
            }
        }
    });
    connection.end();
}

module.exports.getAnimals = getAnimals;
module.exports.getUsers = getUsers;
module.exports.getPosts = getPosts;