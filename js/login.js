document.addEventListener("DOMContentLoaded", init);

//login Objekt erstellen
let login = {
    email: "",
    password: "",
}

//Funktion die mich auf die Rätselvorschauseite schickt 
function loginCB(data, status){
    if (status == 'success') {
        //window.location = "../html/raetselvorschau_login.html";
    } else {
        console.log("Status: " + status);
        alert ("Objekt konnte nicht erstellt werden");
        logForm.reset();
    }
}


function loginUser(login) {
    const User = JSON.stringify(login);
    console.log('login: '+User);

    $.post("http://localhost:8000/api/user",User,loginCB);


}

function init() {
    console.log("Page ready!");

    let logForm = document.getElementById("login");
    let email = document.getElementById("floatingInput");
    let pwd = document.getElementById("floatingPassword")

    logForm.addEventListener("submit", (clickevent) => {
        clickevent.preventDefault();
        login.email = email.value;
        login.password = pwd.value;
    });

    loginUser(login);
}