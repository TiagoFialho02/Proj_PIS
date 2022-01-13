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
        'type': "cat"
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
        'type': "dog"
    }
}

function getAnimalsInfoForItem(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let sqlScript = "SELECT * FROM animals WHERE";
    if(req.body){
        let type = req.body.type;
        let breed = req.body.breed;
        let age	= req.body.age;
        let gender = req.body.gender;
        let photo = req.body.photo;

        if(type){
            if(sqlScript == "SELECT * FROM animals WHERE")
                sqlScript += " type = '" + type + "'";
            else
                sqlScript += " AND type = '" + type + "'";
        }
        if(breed){
            if(sqlScript == "SELECT * FROM animals WHERE")
                sqlScript += " breed = '" + breed + "'";
            else
                sqlScript += " AND breed = '" + breed + "'";
        }
        if(age){
            if(sqlScript == "SELECT * FROM animals WHERE")
                sqlScript += " age = '" + age + "'";
            else
                sqlScript += " AND age = '" + age + "'";
        }
        if(gender){
            if(sqlScript == "SELECT * FROM animals WHERE")
                sqlScript += " gender = '" + gender + "'";
            else
                sqlScript += " AND gender = '" + gender + "'";
        }
        if(photo){
            if(sqlScript == "SELECT * FROM animals WHERE")
                sqlScript += " photo = '" + photo + "'";
            else
                sqlScript += " AND photo = '" + photo + "'";
        }
    }else{
        sqlScript = "SELECT * FROM animals";
    } 
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

function postExistingUsers(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let email = req.body.email;
    let password = "";
    if(req.body.password){
        password = req.body.password;
    }
    console.log(email + "<->" + password);
    let sqlScript  = "SELECT username FROM users WHERE email = '" + email + "' AND password = '"+ password +"'";
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
                res.send(rows);
            } else {
                res.send("failed");
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
module.exports.postExistingUsers = postExistingUsers;
module.exports.getPosts = getPosts;
module.exports.getDogBreeds = getDogBreeds;
module.exports.getCatBreeds = getCatBreeds;