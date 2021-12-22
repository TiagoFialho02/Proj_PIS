var express = require('express'); 
const requestHandlers = require("./www/scripts/request-handlers");
var fs = require("fs");
const app = express();

app.get('/', function (request, response) {
    fs.readFile(__dirname + "/www/index.html", function(err, data){
        response.end(data);
    });
});

app.get('/getAnimals', requestHandlers.getAnimals);

app.get('/getUsers', requestHandlers.getUsers);

app.get('/getPosts', requestHandlers.getPosts);

app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
});
