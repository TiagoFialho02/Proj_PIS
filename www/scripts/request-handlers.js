const mysql = require("mysql");
require("dotenv").config();
var axios = require("axios").default;
const jwt = require('jsonwebtoken');

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
        'type': "cat",
        'orderBy': 'type'
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
        'type': "cat",
        'orderBy': 'type'
    }
}

var BothAxiosOptions = {
    method: 'GET',
    url: 'https://animalbreedapi.herokuapp.com/api/breeds',
    headers:{
        'API_KEY' : process.env.ANIMAL_BREEDS_API_KEY,
        'ContentType' : 'application/json'
    },
    data:{
        'orderBy': 'type'
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

function postUser(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let birthdate = req.body.birthDate;
    let image = (req.body.profile_image == null) ? "": req.body.profile_image;
    let is_enterprise = req.body.is_enterprise;
    if(email && username && password && birthdate && is_enterprise)
    {
        let sqlScript1  = `INSERT INTO users (email, username, password, birthdate, profile_image, is_enterprise) VALUES ('${email}', '${username}', '${password}', '${birthdate}', '${image}', '${is_enterprise}')`;
        let sql1 = mysql.format(sqlScript1);
        let connection1 = mysql.createConnection(connectionOptions);
        connection1.connect();
        connection1.query(sql1, function (err, rows, fields) {
            if (err) {
                console.log('Connection Error2 ' + err);
            }else{ 
            } 
        });
        connection1.end();
    }else{
        res.send("failed");
    }
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
    let sqlScript  = "SELECT id, username FROM users WHERE email = '" + email + "' AND password = '"+ password +"'";
    let sql = mysql.format(sqlScript);
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error');
        } else {
            if (rows.length > 0) {
                const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
                console.log(JSON.stringify(rows));
                return res.json({ auth: true, token: token , id: rows['id'] , email: email, username: rows['username']});
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
        res.send(response.data);
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });
}

function getCatBreeds(req, res) {
    axios.request(catAxiosOptions).then(function (response){
        res.send(response.data);
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });
}

function getBothBreeds(req, res) {
    axios.request(BothAxiosOptions).then(function (response){
        res.send(response.data);
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });
}

module.exports.getAnimalsInfoForItem = getAnimalsInfoForItem;
module.exports.postExistingUsers = postExistingUsers;
module.exports.postUser = postUser;
module.exports.getPosts = getPosts;
module.exports.getDogBreeds = getDogBreeds;
module.exports.getCatBreeds = getCatBreeds;
module.exports.getBothBreeds = getBothBreeds;