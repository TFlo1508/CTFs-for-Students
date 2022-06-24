const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4500;

app.use(express.static(__dirname + '/public'));
// sendFile will go here

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/index.html'));
});


app.get('/join.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/join.html'));
});

app.get('/kontakt.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/kontakt.html'));
});

app.get('/login.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/login.html'));
});

app.get('/profil.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/profil.html'));
});

app.get('/raetsel_admin_edit.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/raetsel_admin_edit.html'));
});

app.get('/raetsel_admin.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/raetsel_admin.html'));
});

app.get('/raetselvorschau_login', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/raetselvorschau_login'));
});


app.get('/raetselvorschau.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/raetselvorschau.html'));
});



app.get('/ueber_uns.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html/ueber_uns.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);