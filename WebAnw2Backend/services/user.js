const helper = require('../helper.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service User');

serviceRouter.post('/user', function(request, response) {
    console.log('Service User: Client requested creation of new record' + request.body.User);
    //console.log(request.body.User);
    response.status(200).json({ 'fehler': false, 'nachricht': 'Alles funktioniert!'});
});

module.exports = serviceRouter;