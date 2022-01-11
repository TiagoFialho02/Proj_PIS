const mysql = require("mysql");
require("dotenv").config();
var axios = require("axios").default;

const connectionOptions = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

var catAxiosOptions = {
    method: 'GET',
    url: 'https://animalbreedapi.herokuapp.com/api/breeds',
    headers:{
        'API_KEY' : process.env.ANIMAL_BREEDS_API_KEY,
        'ContentType' : 'application/json'
    },
    data:{
        'type': "dog"
    }
}

var dogAxiosOptions = {
    method: 'GET',
    url: 'https://animalbreedapi.herokuapp.com/api/breeds',
    headers:{
        'API_KEY' : process.env.ANIMAL_BREEDS_API_KEY,
        'ContentType' : 'application/json'
    },
    data:{
        'type': "cat"
    }
}

function getAnimalsInfoForItem(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let sqlScript = "SELECT * FROM animals WHERE";
    let type = req.body.type;
    let breed = req.body.breed;
    let age	= req.body.age;
    let gender = req.body.gender;
    let photo = req.body.photo;

    if(type){
        if(sqlScript == "SELECT * FROM animals WHERE")
            sqlScript += " type = ?";
        else
            sqlScript += " AND type = ?";
    }else if(breed){
        if(sqlScript == "SELECT * FROM animals WHERE")
            sqlScript += " breed = ?";
        else
        sqlScript += " AND breed = ?";
    }else if(age){
        if(sqlScript == "SELECT * FROM animals WHERE")
            sqlScript += " age = ?";
        else
        sqlScript += " AND age = ?";
    }else if(gender){
        if(sqlScript == "SELECT * FROM animals WHERE")
            sqlScript += " gender = ?";
        else
        sqlScript += " AND gender = ?";
    }else if(photo){
        if(sqlScript == "SELECT * FROM animals WHERE")
            sqlScript += " photo = ?";
        else
            sqlScript += " AND photo = ?";
    }else{
        sqlScript = "SELECT * FROM animals";
    } 
    console.log(sqlScript);

    let sql = mysql.format(sqlScript);
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error');
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
            console.log('Connection Error');
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
            console.log('Connection Error');
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

function getDogBreeds(req, res) {
    axios.request(dogAxiosOptions).then(function (response){
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });
}

function getCatBreeds(req, res) {
    axios.request(catAxiosOptions).then(function (response){
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });
}

module.exports.getAnimalsInfoForItem = getAnimalsInfoForItem;
module.exports.getUsers = getUsers;
module.exports.getPosts = getPosts;
module.exports.getDogBreeds = getDogBreeds;
module.exports.getCatBreeds = getCatBreeds;