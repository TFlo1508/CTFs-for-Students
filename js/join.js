document.addEventListener("DOMContentLoaded", init);

let register = {
    email: "",
    password: "",
    passwordWdh: "",
}

function registerCB(data, status){
    if (status == 'success') {
        window.location = "C:/Users/flori/CTFs-for-Students/html/login.html";
    } else {
        console.log("Status: " + status);
        alert ("Objekt konnte nicht erstellt werden");
        regForm.reset();
    }
}

function createUser(register) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const User = JSON.stringify(register);
    console.log('Create User: '+User);

    $.post("http://localhost:8000/api/user",User,registerCB);

    const request = {
        method: "POST",
        headers: headers,
        body: User,
    }
}

function init() {
    console.log("Page ready!");

    let regForm = document.getElementById("register");
    let email = document.getElementById("floatingInput");
    let pwd = document.getElementById("floatingPassword")
    let pwdWdh = document.getElementById("floatingPasswordWdh");

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