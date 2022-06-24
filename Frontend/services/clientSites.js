const helper = require('../helper.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('Service - Client Seiten anzeigen');




serviceRouter.get('/index.html', function(request, response) {
    response.sendFile(path.join(__dirname, '/index.html'));

});


