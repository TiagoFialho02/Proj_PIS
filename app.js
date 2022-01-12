var express = require('express'); 
const requestHandlers = require("./www/scripts/request-handlers");
var fs = require("fs");
var countUrlAccess = [];
const { response } = require('express');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extend: false}))

//Middleware: contagem de acesso aos requests
app.use(function (req, res, next) {
    if (countUrlAccess[req.url]) {        
        countUrlAccess[req.url] += 1;    
    } else {       
        countUrlAccess[req.url] = 1;    
    }
    console.log(countUrlAccess.sort());    
    next();
});

app.get('/', function (request, response) {
    fs.readFile(__dirname + "/www/index.html", function(err, data){
        response.end(data);
    });
});

app.get('/getAnimalsInfoForItem', requestHandlers.getAnimalsInfoForItem);

app.get('/getExistingUsers', requestHandlers.getExistingUsers);

app.get('/getPosts', requestHandlers.getPosts);

app.get('/getDogBreeds', requestHandlers.getDogBreeds);

app.get('/getCatBreeds', requestHandlers.getCatBreeds);

app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
});
