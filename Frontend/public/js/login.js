//---------------------------
//Prüfung ob Benutzer existiert
//Stimmt pw mit Datenbank?
//Admin-> raetselvorschau_loesung     
//Normal-> raetselvorschau_login
//~Flo
//-------------------------


document.addEventListener("DOMContentLoaded", init);

//login Objekt erstellen
let login = {
    benutzername: "",
    passwort: "",
}

//Funktion die Passwort von User abgleicht
function loginUser(login) {
    console.log("Versuche einzuloggen");
    console.log("LOGIN JSON",login);
    $.ajax ({
        //Existiert Benutzer ?
        url: "http://localhost:8000/api/benutzer/zugang/",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(login),
        success: function(response) {
            //Wenn admin
            if (response.benutzerrolle.bezeichnung === "admin")
                window.location = "../html/raetsel_admin.html";
            //Wenn normal
            else {
                window.location = "../html/raetselvorschau_login.html";
            }
        },
        //Wenn PW falsch ==> 400 Request
        error: function (response){
            alert("Versuche es mit BruteForce");
            let logForm = document.getElementById("login");
            logForm.reset();            
        
         }  

    })};


function init() {
    console.log("Page ready!");

    let logForm = document.getElementById("login");
    let bn = document.getElementById("floatingInput");
    let pw = document.getElementById("floatingPassword")

    logForm.addEventListener("submit", (clickevent) => {
        clickevent.preventDefault();
        login.benutzername= bn.value;
        login.passwort= pw.value;
        console.log("login");
        $.ajax ({
            //Existiert Benutzer ?
            url: "http://localhost:8000/api/benutzer/existiert/"+login.benutzername,
            method: "GET",
            dataType: "json",
            success: function(response) {
                console.log("Ergebnis",response);
                //Wenn Benutzer vorhanden
                //Wenn PAsswort falsch --> alert()
                if (response.existiert) {
                    loginUser(login);
                }
                else {
                    //Falls Benutzer nicht existiert
                    alert("Benutzer existiert nicht");
                }
            } 
        });
    });

    
}