var express = require('express'); 
const requestHandlers = require("./www/scripts/request-handlers");
var fs = require("fs");
var axios = require("axios").default;
const { response } = require('express');
require("dotenv").config();

const app = express();

var options = {
    method: 'GET',
    url: 'https://animalbreedapi.herokuapp.com/api/breeds',
    headers:{
        'API_KEY' : process.env.API_KEY,
        '' : ''
    }
}

app.get('/', function (request, response) {
    fs.readFile(__dirname + "/www/index.html", function(err, data){
        response.end(data);
    });
});

app.get('/getAnimals', requestHandlers.getAnimals);

app.get('/getUsers', requestHandlers.getUsers);

app.get('/getPosts', requestHandlers.getPosts);

axios.request(options.then(function (responde){
    console(response.data);
}).catch(function(error){
    console.log(error);
}))

app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
});
