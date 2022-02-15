var express = require('express'); 
var bodyparser = require('body-parser'); 
const requestHandlers = require("./www/scripts/request-handlers");
var fs = require("fs");
var countUrlAccess = [];
const { response } = require('express');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyparser.json({
    limit: '100mb'
}));
app.use(bodyparser.urlencoded({
    limit: '100mb',
    parameterLimit: 100000,
    extended: true 
}));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(function (req, res, next) {
    if (countUrlAccess[req.url]) {        
        countUrlAccess[req.url] += 1;    
    } else {       
        countUrlAccess[req.url] = 1;    
    }
    console.log(countUrlAccess.sort());    
    next();
});

app.use('/api', function (req, res, next) {
    verifyJWT(req, res, next);
});

app.get('/api/getAnimalsInfoForItem', requestHandlers.getAnimalsInfoForItem);

app.post('/getExistingUsers', requestHandlers.getExistingUsers);

app.post('/postUser', requestHandlers.postUser);

app.post('/api/getPosts', requestHandlers.getPosts);

app.get('/api/getDogBreeds', requestHandlers.getDogBreeds);

app.get('/api/getCatBreeds', requestHandlers.getCatBreeds);

app.get('/api/getBothBreeds', requestHandlers.getBothBreeds);

app.get('/getProfileImage/:fileName?', requestHandlers.getProfileImage);

app.post('/api/updateUserPreferences', requestHandlers.updateUserPreferences);

app.post('/api/deleteFavoritePost', requestHandlers.deleteFavoritePost);

app.post('/api/postFavoritePost', requestHandlers.postFavoritePost);

app.post('/api/verifyFavoritePost', requestHandlers.verifyFavoritePost);

app.post('/api/getFavoritePost', requestHandlers.getFavoritePost);

app.post('/api/updateUser', requestHandlers.updateUser);

app.post('/api/postAnimal', requestHandlers.postAnimal);

app.post('/api/getAnimalsByUser', requestHandlers.getAnimalsByUser);

app.post('/api/postPost', requestHandlers.postPost);

app.delete('/api/deletePost', requestHandlers.deletePost);

app.delete('/api/deleteAnimal', requestHandlers.deleteAnimal);

app.put('/api/updatePost', requestHandlers.updatePost);

app.put('/api/updateAnimal', requestHandlers.updateAnimal);

app.delete('/api/deleteUser', requestHandlers.deleteUser);

function verifyJWT(req, res, next){
    
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ 
        auth: false, message: 'No token provided.' 
    });    
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ 
            auth: false, message: 'Failed to authenticate token.' 
        });
        
        // se tudo estiver ok, salva no request para uso posterior      
        req.email = decoded.email;      
        next();    
    });
}

app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
});
