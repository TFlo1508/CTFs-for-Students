const helper = require('../helper.js');
const CtfDao = require('../dao/ctfDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service ctf');

serviceRouter.get('/ctf/gib/:id', function(request, response) {
    console.log('Service CTF: Client requested one record, id=' + request.params.id);
    console.log('Hallo Welt'); 
    const ctfDao = new CtfDao(request.app.locals.dbConnection);
    try {
        var obj = ctfDao.loadById(request.params.id);
        console.log('Service CTF: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service CTF: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/ctf/alle', function(request, response) {
    console.log('Service CTF: Client requested all records');

    const ctfDao = new CtfDao(request.app.locals.dbConnection);
    try {
        var arr = ctfDao.loadAll();
        console.log('Service CTF: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service CTF: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/ctf/existiert/:id', function(request, response) {
    console.log('Service CTF: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const ctfDao = new CtfDao(request.app.locals.dbConnection);
    try {
        var exists = ctfDao.exists(request.params.id);
        console.log('Service CTF: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service CTF: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

//bearbeitet
serviceRouter.post('/ctf', function(request, response) {
    console.log('Service CTF: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.frage)) 
        errorMsgs.push('frage fehlt');
    if (helper.isUndefined(request.body.antwort)) 
        errorMsgs.push('antwort fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service CTF: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const ctfDao = new CtfDao(request.app.locals.dbConnection);
    try {
        var obj = ctfDao.create(request.body.frage, request.body.antwort);
        console.log('Service CTF: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service CTF: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/ctf', function(request, response) {
    console.log('Service CTF: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.frage)) 
        errorMsgs.push('frage fehlt');
    if (helper.isUndefined(request.body.antwort)) 
        errorMsgs.push('antwort fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service CTF: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const ctfDao = new CtfDao(request.app.locals.dbConnection);
    try {
        var obj = ctfDao.update(request.body.id, request.body.frage, request.body.antwort);
        console.log('Service CTF: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service CTF: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/ctf/:id', function(request, response) {
    console.log('Service CTF: Client requested deletion of record, id=' + request.params.id);

    const ctfDao = new CtfDao(request.app.locals.dbConnection);
    try {
        var obj = ctfDao.loadById(request.params.id);
        ctfDao.delete(request.params.id);
        console.log('Service CTF: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service CTF: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;