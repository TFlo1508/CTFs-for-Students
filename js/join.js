document.addEventListener("DOMContentLoaded", init);

function createUser(email, password) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json")

    var emailVal = email;
    var pwdVal = password;

    /* Was muss hier noch hin?
    - Erstellung des Benutzer-Objekts für den Server
    - POST-Request für den Server
    - Auswertung der Response des Servers
    - Meldung, wenn erfolgreich --> Benutzer erstellt (Alert)
    - Meldung, wenn nicht erfolgreich --> Benutzer nicht erstellt (Alert)
    */
    const User = JSON.stringify({
        benutzername: emailVal,
        passwort: pwdVal,
        benutzerrolle: {id:1},
        person: {id:3}
    })

    const request = {
        method: "POST",
        headers: headers,
        body: User,
    }

    fetch("http://localhost:8000/api/benutzer/", request);
}

function init() {
    console.log("Page ready!");

    var regForm = document.getElementById("register");
    var email = document.getElementById("floatingInput");
    var pwd = document.getElementById("floatingPassword")
    var pwdWdh = document.getElementById("floatingPasswordWdh");

    regForm.addEventListener("submit", (clickevent) => {
        clickevent.preventDefault();
        var emailVal = email.value;
        var pwdVal = pwd.value;
        var pwdWdhVal = pwdWdh.value;

        if (pwdVal == pwdWdhVal) {
            console.log("Passwörter stimmen überein!");
            var newUser = createUser(emailVal,pwdVal);
            window.location = "C:/Users/flori/CTFs-for-Students/html/login.html"
        } else {
            console.log("Passwörter stimmen nicht überein!");
            alert ("Bitte geben Sie zwei mal das gleiche Passwort ein!");
            regForm.reset();
        }
    });

}