const mysql = require("mysql");
require("dotenv").config();
var axios = require("axios").default;
const jwt = require('jsonwebtoken');
var fs = require("fs");
var uuid = require('uuid');
const imagesFolderPath = "/Users/tiago/Documents/GitHub/Proj_PSI/images/";
const imagesFolderPathToRead = "C:/Users/tiago/Documents/GitHub/Proj_PSI/images/";
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
        'orderBy': 'breed'
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
        'type': "dog",
        'orderBy': 'breed'
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
        'orderBy': 'breed'
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
    let code = uuid.v1();
    console.log(req.body.profile_imageName)
    if(req.body.profile_imageName == "profile_placeholder.png"){
        fileLink = "http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg";
    }else{
        fileLink = "http://10.0.2.2:8080/getProfileImage/" + (code + req.body.profile_imageName); 

        fs.writeFile(imagesFolderPath + (code + req.body.profile_imageName), req.body.profile_imageFile,  {encoding:'base64'}, err => {
            if (err) {
                console.error("erro")
                return;
            }
        });
    }
    let is_enterprise = req.body.is_enterprise;
    if(email && username && password && birthdate && is_enterprise)
    {
        let sqlScript1  = `INSERT INTO users (email, username, password, birthdate, profile_image, is_enterprise, is_preferences_set) VALUES ('${email}', '${username}', '${password}', '${birthdate}', '${fileLink}', '${is_enterprise}', 'false')`;
        let sql1 = mysql.format(sqlScript1);
        let connection1 = mysql.createConnection(connectionOptions);
        connection1.connect();
        connection1.query(sql1, function (err, rows, fields) {
            if (err) {
                console.log('Connection Error2 ' + err); 
                res.send("Invalid Data");          
            }else{
                res.send("success")
            }
        });
        connection1.end();
    }else{
        res.send("Invalid Data");
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
    let sqlScript  = "SELECT id, username, profile_image, is_preferences_set, p_type, p_age, p_gender, p_breed  FROM users WHERE email = '" + email + "' AND password = '"+ password + "'";
    let sql = mysql.format(sqlScript);
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error');
        } else {
            if (rows.length > 0) {
                let r = JSON.stringify(rows);
                const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
                return res.json({ auth: true, token: token , id: rows[0].id , email: email, username: rows[0].username, profileImage : rows[0].profile_image, 
                    is_preferences_set : rows[0].is_preferences_set, p_type : rows[0].p_type, p_age : rows[0].p_age, p_gender : rows[0].p_gender, p_breed : rows[0].p_breed});
            } else {
                res.send("failed");
            }
        }
    });
    
    connection.end();
}

function postUserPreferences(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let preference = req.body.is_preferences_set;
    let type = req.body.type;
    let age = req.body.age;
    let gender = req.body.gender;
    let breed = req.body.breed;
    let userId = req.body.userId;   
    let sqlScript  = "UPDATE `users` SET `is_preferences_set` = '" + preference + "', `p_type` = '" + type + "', `p_age` = '" + age + "', `p_gender` = '" + gender + "', `p_breed` = '" + breed + "' WHERE `users`.`id` = " + userId;
    let sql = mysql.format(sqlScript);
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error');
        } else {
            res.send("success");
        }
    });
    
    connection.end();
}

function postGetPosts(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let type = req.body.type;
    let age = req.body.age;
    let gender = req.body.gender;
    let breed = req.body.breed;
    let sql;
        if(age=="-1")
            age = " AND (`animals`.`age` < 1)"
        else if(age=="1-2")
            age = " AND (`animals`.`age` = 1 OR `animals`.`age` = 2)"
        else if(age=="3-5")
            age = " AND (`animals`.`age` = 3 OR `animals`.`age` = 4 OR `animals`.`age` = 5)"
        else if(age=="+5")
            age = " AND (`animals`.`age` > 5)"
        else
            age = ""
        sql = mysql.format("SELECT `posts`.`id` postId, `posts`.`description`, `posts`.`pub_date`, `users`.`id` userId, " + 
        "`users`.`email`, `users`.`username`,`users`.`profile_image`, `animals`.`id` animalId, `animals`.`type`, `animals`.`breed`, `animals`.`age`, " + 
        "`animals`.`gender`, `animals`.`photo`, `animals`.`name` FROM `posts`, `users`, `animals` " + 
        "WHERE `posts`.`id_user` = `users`.`id` AND `posts`.`is_active` = 1 AND `posts`.`id_animal` = `animals`.`id`" + type + age + gender + breed + " ORDER BY pub_date DESC");
    let connection = mysql.createConnection(connectionOptions);
    console.log(sql)
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error');
        } else {
            if (rows.length > 0) {
                console.log(rows)
                res.json(rows);
            } else {
                res.send("noRows");
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

function getProfileImage(req, res){
    let fileName = req.body.fileName == undefined ? req.params.fileName : req.body.fileName;
    fs.readFile(imagesFolderPathToRead + fileName, function(err, data){
        res.send(data)
    });
}

function postAddFavoritePost(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let userId = req.body.userId;
    let postId = req.body.postId;
    
    let sql = mysql.format("INSERT INTO `favorites`(`id_user`, `id_post`) VALUES ('" + userId + "','" + postId + "')");
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error');
        } else {
            res.send("Added");
        }
    });
    connection.end();
}

function postRemoveFavoritePost(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let userId = req.body.userId;
    let postId = req.body.postId;
    
    let sql = mysql.format("DELETE FROM `favorites` WHERE `id_user` =" + userId + " AND `id_post` = " + postId);
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
        } else {
            res.send("Deleted");
        }
    });
    connection.end();
}

function postVerifyFavoritePost(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let userId = req.body.userId;
    let postId = req.body.postId;
    
    let sql = mysql.format("SELECT * FROM `favorites` WHERE `id_user` =" + userId + " AND `id_post` = " + postId);
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
        } else {
            if(rows.length > 0)
                res.send("Found");
            else
                res.send("Not Found");
        }
    });
    connection.end();
}

function postGetFavoritePost(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let userId = req.body.userId;
    let sql = mysql.format("SELECT `posts`.`id` postId, `posts`.`description`, `posts`.`pub_date`, `users`.`id` userId, `users`.`email`, `users`.`username`, " + 
    "`users`.`profile_image`, `animals`.`id` animalId, `animals`.`type`, `animals`.`breed`, `animals`.`age`, `animals`.`gender`, " +
    "`animals`.`photo`, `animals`.`name` FROM `posts`, `users`, `animals`, `favorites` "+
    "WHERE `posts`.`id` = `favorites`.`id_post` AND `posts`.`is_active` = 1 AND `posts`.`id_animal` = `animals`.`id` AND " + 
    "`favorites`.`id_user` = " + userId + "  AND `users`.`id` = `favorites`.`id_user` ORDER BY posts.pub_date DESC");
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.json(errorMessage);
            console.log('Connection Error');
        } else {
            if (rows.length > 0) {
                console.log(rows)
                res.json(rows);
            } else {
                res.send("noRows");
            }
        }
    });
    connection.end();
}

function postUpdateUser(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let userId = req.body.userId;
    let password = req.body.password;
    let sql = mysql.format("UPDATE `users` SET `password`= '" + password + "' WHERE `id` = " + userId);
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.send("");
            console.log('Connection Error');
        } else {
            res.send("updated");
        }
    });
    connection.end();
}

function postInsertAnimal(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let type = req.body.type;
    let breed = req.body.breed;
    let age = req.body.age;
    let gender = req.body.gender;
    let photo = req.body.photo;
    let name = req.body.name;
    let userId = req.body.userId;
    let code = uuid.v1();

    if(req.body.imageFile == undefined || req.body.imageFile == ""){
        fileLink = "http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg";
    }else{
        fileLink = "http://10.0.2.2:8080/getProfileImage/" + (code + photo); 

        fs.writeFile(imagesFolderPath + (code + photo), req.body.imageFile,  {encoding:'base64'}, err => {
            if (err) {
                console.error(err)
                return;
            }
        });
    }

    let sql = mysql.format("INSERT INTO `animals`(`type`, `breed`, `age`, `gender`, `photo`, `name`, `id_user`) VALUES " + 
    "('" + type + "','" + breed + "','" + age + "','" + gender + "','" + fileLink + "','" + name + "', " + userId + ")");
    console.log(sql)
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.send("error");
            console.log('Connection Error');
        } else {
            res.send("inserted");
        }
    });
    connection.end();
}

function postGetAnimals(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let userId = req.body.userId;
    let sqlScript = "SELECT `id`, `breed`, `name` FROM `animals` WHERE `id_user` = " + userId;
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
                res.json("NOTFOUND");
            }
        }
    });
    connection.end();
}

function postPosts(req, res) {
    var errorMessage = {
        internalCode: "",
        postalDescription: "***Connection Error***"
    };
    let sql = mysql.format("INSERT INTO `posts`(`id_user`, `id_animal`, `description`) VALUES ('" + req.body.userId + "','" + req.body.animalId + "', '" + req.body.description + "')");
    let connection = mysql.createConnection(connectionOptions);
    console.log(sql)
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            res.send("ERROR");
            console.log('Connection Error');
        } else {
            res.send("inserted");
        }
    });
    connection.end();
}

module.exports.getAnimalsInfoForItem = getAnimalsInfoForItem;
module.exports.postExistingUsers = postExistingUsers;
module.exports.postUser = postUser;
module.exports.postGetPosts = postGetPosts;
module.exports.getDogBreeds = getDogBreeds;
module.exports.getCatBreeds = getCatBreeds;
module.exports.getBothBreeds = getBothBreeds;
module.exports.getProfileImage = getProfileImage;
module.exports.postUserPreferences = postUserPreferences;
module.exports.postRemoveFavoritePost = postRemoveFavoritePost;
module.exports.postAddFavoritePost = postAddFavoritePost;
module.exports.postVerifyFavoritePost = postVerifyFavoritePost;
module.exports.postGetFavoritePost = postGetFavoritePost;
module.exports.postUpdateUser = postUpdateUser;
module.exports.postInsertAnimal = postInsertAnimal;
module.exports.postGetAnimals = postGetAnimals;
module.exports.postPosts = postPosts;
