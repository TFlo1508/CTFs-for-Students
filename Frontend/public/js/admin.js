//---------------------------
//CTF's mit GET Request laden
//diese dann in die Tabelle 
//per js einfügen 
//~Max
//-------------------------


//Führe init() aus wenn Dokument geladen
document.addEventListener("DOMContentLoaded", init);

let ctf = {
    //id wird automatisch hochinkrementiert
    frage:"",
    antwort:""
}

function displayCTF(ctfJSON) {
    var ctfTabelle = document.getElementById("ctfTabelle").getElementsByTagName('tbody')[0];
    var row = ctfTabelle.insertRow();
    
    //id
    var idSpalte =  row.insertCell();
    var ctfId = document.createTextNode(ctfJSON.id);
    idSpalte.appendChild(ctfId);

    //frage
    var frageSpalte =  row.insertCell();
    var ctfFrage = document.createTextNode(ctfJSON.frage);
    frageSpalte.appendChild(ctfFrage);
    
    //antwort
    var antwortSpalte =  row.insertCell();
    var ctfAntwort = document.createTextNode(ctfJSON.antwort);
    antwortSpalte.appendChild(ctfAntwort);
    
    //edit und delete Felder
    var edit = '<td> <a href="raetsel_admin_edit.html" class="btn btn-sm btn-outline-info mx-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Datensatz bearbeiten" > <span class="fas fa-edit"></span> </a>';                              
    var del =  '<button onclick="deleteCtf('+ctfJSON.id+')" type="button" class="btn btn-sm btn-outline-danger position-fixed" data-bs-toggle="tooltip" data-bs-placement="top" title="Datensatz löschen"> <span class="fas fa-trash"></span> </button> </td>';
                        
    var interaktion =  row.insertCell();
    interaktion.innerHTML = edit + del;
}

async function getCTFs() {
    await $.ajax ({
        //Sende benutzername über URL
        url: "http://localhost:8000/api/ctf/alle",
        type: "GET",
        dataType: "json",
        success: function(response) {
            //gehe durch alle JSONs in Liste
            for(ctf of response) {
                //schreibe jedes ctf in HTML 
                displayCTF(ctf);
            }
        } 
    });
}

async function deleteCtf(ctfId) {
    await $.ajax ({
        //Sende benutzername über URL
        url: "http://localhost:8000/api/ctf/"+ctfId,
        type: "DELETE",
        success: function(response) {
            console.log("Rätsel mit Id ="+ctfId+" gelöscht");
            window.location = "../html/raetsel_admin.html";
        } 
    });
}

async function init() {
    console.log("Page ready!"); 
    //Mache Rätsel sichtbar
    await getCTFs();
}
