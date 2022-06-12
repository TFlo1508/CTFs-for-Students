//---------------------------
//existiert User?
//Lege User an und leite weiter nach login
//~Lum
//-------------------------


//Führe init() aus wenn Dokument geladen
document.addEventListener("DOMContentLoaded", init);

//Register Objekt mit voreingestellten Values
let register = {
    id: "1", //Wert ist egal, weil immer hochinkrementiert
    benutzername: "",
    passwort: "",
    benutzerrolle: {
		id: "2", //normal, admin wäre 1 
		bezeichnung: "normal"
	}
}


function createUser(register) {
    const User = JSON.stringify(register);
    console.log('Create User: '+User);

    //Sendet Anfrage an Server mit Post-Request post(Location, JSON-Object, Funktionpointer )
    //achtung: JSON OBJECT als String übergeben !! --> (SQL Server)
    $.ajax ({
        url: "http://localhost:8000/api/benutzer/",
        type: "POST",
        data: User,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(){
            //Wechsle Ansicht
            window.location = "../html/login.html";
        }
    });
 
}

function init() {
    console.log("Page ready!");
    let regForm = document.getElementById("register");
    let email = document.getElementById("floatingInput");
    let pwd = document.getElementById("floatingPassword");
    let pwdWdh = document.getElementById("floatingPasswordWdh");

    //Wenn submit Button geklickt wird 
    regForm.addEventListener("submit", (clickevent) => {
        clickevent.preventDefault();
        register.benutzername = email.value;
        register.passwort = pwd.value; 
 
        //stimmen Passwörter überein
        if (register.passwort === pwdWdh.value) {
            console.log("Passwörter stimmen überein!");
            //Gibt es den Benutzer bereits könnte implementiert werden
            $.ajax ({
                //Sende benutzername über URL
                url: "http://localhost:8000/api/benutzer/eindeutig/"+register.benutzername,
                method: "GET",
                dataType: "json",
                success: function(response) {
                    console.log("Ergebnis",response);
                    //Falls Benutzer nicht existiert
                    
                    
                    if (response.eindeutig) {
                        createUser(register);
                    }
                    else {
                        //Wenn Benutzer existiert
                        alert("Benutzer existiert bereits");
                    }
                    
                } 
            });
            
        } else {
            console.log("Passwörter stimmen nicht überein!");
            alert ("Bitte geben Sie zwei mal das gleiche Passwort ein!");
            regForm.reset();
        }
    });
}