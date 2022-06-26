//---------------------------
//
//
//
//~Sidal
//-------------------------


//Führe init() aus wenn Dokument geladen
document.addEventListener("DOMContentLoaded", init);

let ctf = {
    //id wird automatisch hochinkrementiert
    frage:"",
    antwort:""
}

async function sendCTF() {
    $.ajax ({
        //Sende benutzername über URL
        url: "http://localhost:8000/api/ctf/",
        type: "POST",
        data: JSON.stringify(ctf),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            console.log("Ergebnis",response);
        } 
    });
    window.location = "../html/raetsel_admin.html";
}

function showCTFs() {
    $.ajax ({
        //Sende benutzername über URL
        url: "http://localhost:8000/api/ctf/alle",
        type: "GET",
        dataType: "json",
        success: function(response) {
            //gehe durch alle JSONs in Liste
            for(ctf of response) {
                console.log(ctf);
            }
        } 
    });
}

async function init() {
    console.log("Page ready!");

    let ctfForm = document.getElementById("ctf");
    let frage = document.getElementById("frageArea");
    let antwort = document.getElementById("antwortArea");

    ctfForm.addEventListener("submit", (clickevent) => { 
        clickevent.preventDefault();
        ctf.frage = frage.value;
        ctf.antwort = antwort.value; 

        //Sende an Frage + Antwort an Server
        sendCTF(); 
        alert("räetsel erstellt");
        //Knopf funktioniert nicht

        //Gehe wieder zurück
       
    });
}


//Eppler: persistiert auch im Browser ... wenn Webseite neugeladen wird,
// wird dann delete Req an Server geschickt