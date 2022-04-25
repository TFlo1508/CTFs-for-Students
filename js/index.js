//Das ist die Datei mit meinem Servercode
//package-lock file juckt uns nicht 

const express = require("express"); //import Express
const app = express(); //ganze Library in einer Variable

//listening
app.listen(3000, ()=>console.log("hört auf port 3000"));
//danach muss ich node index.js ausführen damit das läuft

//Nutzer angegebenen Ordner wenn Client sich verbindet
app.use(express.static("OrdnerFuerClients"))

