const mysql = require("mysql");
require("dotenv").config();
var axios = require("axios").default;

const connectionOptions = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

var axiosOptions = {
    method: 'GET',
    url: 'https://animalbreedapi.herokuapp.com/api/breeds',
    headers:{
        'API_KEY' : process.env.ANIMAL_BREEDS_API_KEY,
        'ContentType' : 'application/json'
    },
}

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

function getBreeds(req, res) {
    axios.request(axiosOptions).then(function (response){
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });
}

module.exports.getAnimals = getAnimals;
module.exports.getUsers = getUsers;
module.exports.getPosts = getPosts;
module.exports.getBreeds = getBreeds;