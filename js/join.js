//Führe init() aus wenn Dokument geladen
document.addEventListener("DOMContentLoaded", init);

//Register Objekt
let register = {
    email: "",
    password: "",
    passwordWdh: "",
}

//Funktion um Ansicht zu ändern
async function registerCB(data, status){
    if (status == 'success') {
        //nach Registrierung --> Login Seite
        //window.location = "../html/login.html";
    } else {
        console.log("Status: " + status);
        alert ("Objekt konnte nicht erstellt werden");
        regForm.reset();
    }
}




function createUser(register) {
    const User = JSON.stringify(register);
    console.log('Create User: '+User);

    //Sendet Anfrage an Server mit Post-Request post(Location, JSON-Object, Funktionpointer )
    //achtung: JSON OBJECT als String übergeben !! --> (SQL Server)

    //$.post("http://localhost:8000/api/user",User,registerCB);
    $.post("http://localhost:8000/api/benutzer",User,registerCB);
 
}

function init() {
    console.log("Page ready!");

    let regForm = document.getElementById("register");
    let email = document.getElementById("floatingInput");
    let pwd = document.getElementById("floatingPassword")
    let pwdWdh = document.getElementById("floatingPasswordWdh");

    //Wenn submit Button geklickt wird 
    regForm.addEventListener("submit", (clickevent) => {
        clickevent.preventDefault();
        register.email = email.value;
        register.password = pwd.value;
        register.passwordWdh = pwdWdh.value;

        if (register.password == register.passwordWdh) {
            console.log("Passwörter stimmen überein!");
            let newUser = createUser(register);
            //window.location = "C:/Users/flori/CTFs-for-Students/html/login.html"
        } else {
            console.log("Passwörter stimmen nicht überein!");
            alert ("Bitte geben Sie zwei mal das gleiche Passwort ein!");
            regForm.reset();
        }
    });
}