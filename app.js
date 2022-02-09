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

app.post('/postExistingUsers', requestHandlers.postExistingUsers);

app.post('/postUser', requestHandlers.postUser);

app.post('/api/postPosts', requestHandlers.postPosts);

app.get('/api/getDogBreeds', requestHandlers.getDogBreeds);

app.get('/api/getCatBreeds', requestHandlers.getCatBreeds);

app.get('/api/getBothBreeds', requestHandlers.getBothBreeds);

app.get('/getProfileImage/:fileName?', requestHandlers.getProfileImage);

app.post('/api/postUserPreferences', requestHandlers.postUserPreferences);

app.post('/api/postRemoveFavoritePost', requestHandlers.postRemoveFavoritePost);

app.post('/api/postAddFavoritePost', requestHandlers.postAddFavoritePost);

app.post('/api/postVerifyFavoritePost', requestHandlers.postVerifyFavoritePost);

app.post('/api/postGetFavoritePost', requestHandlers.postGetFavoritePost);

app.post('/api/postUpdateUser', requestHandlers.postUpdateUser);

app.post('/api/postInsertAnimal', requestHandlers.postInsertAnimal);

app.post('/api/postGetAnimals', requestHandlers.postGetAnimals);

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
