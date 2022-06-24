//---------------------------
//Level Button inkrementieren pro Button
//Frage inserten 
//Antwort abgeleichen
//~Lum
//-------------------------


//Führe init() aus wenn Dokument geladen
document.addEventListener("DOMContentLoaded", init);
let ctf = {
    //id wird automatisch hochinkrementiert
    frage:"",
    antwort:""
}


//Raetsel richti/falsch eingegeben
var richtig = `<div class="col-auto"> <span class="far fa-check-circle fa-2x text-success" ></span></div>`

var falsch =  `<button type="submit" onclick="secondTry(this)" class="btn btn-outline-danger mb-3">Erneut überprüfen </button>`


//one --> One oder two --> Two 
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function displayCTF(ctf){
    displayRawCTF(ctf.id);
    rawCTF = document.getElementsByClassName("accordion-item");
    let CTFElement = rawCTF[rawCTF.length-1];
    let CTFElementHTML = CTFElement.children[1].children[0].innerHTML 
    CTFElement.children[1].children[0].innerHTML = ctf.frage + CTFElementHTML;  //  accordion-body
  };


//Funktion um ein Level Feld anzuzeigen
let levelCount = 1
function displayRawCTF(ctfId) {
    var raetselSammler = document.getElementsByClassName("col")[0];
    html = '<div data-id="'+ctfId+'" class="accordion-item ctf-background-light">\
    <h2 class="accordion-header" id="panelsStayOpen-heading'+ctfId+'">\
      <button class="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse'+ctfId+'" aria-expanded="true" aria-controls="panelsStayOpen-collapse'+ctfId+'">\
        Level '+levelCount+'\
      </button>\
    </h2>\
    <div id="panelsStayOpen-collapse'+ctfId+'" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading'+ctfId+'">\
      <div class="accordion-body">\
        <hr>\
        <form class="row g-4 ansForm" onsubmit="return false" id="'+ctfId+'">\
          <div class="col-4">\
            <label for="tfAntwort'+ctfId+'" class="visually-hidden">Antwort</label>\
            <input type="text" class="form-control" data-id="'+ctfId+'" id="tfAntwort'+ctfId+'" placeholder="Antwort" required="">\
              </div>\
              <div class="col-auto">\
                <button onclick="displayAnswer(this)" id="'+ctfId+'" type="submit" class="btn btn-outline-info mb-3">\
                  Antwort überprüfen\
                </button>\
              </div>\
        </form>\
        </div>\
      </div>\
      </div>';
      
    raetselSammler.innerHTML += html;
    levelCount++;
}

let ctfArray=[];
async function getCTFs() {
    await $.ajax ({
        //Sende benutzername über URL
        url: "http://localhost:8000/api/ctf/alle",
        type: "GET",
        dataType: "json",
        success: function(response) {
            //gehe durch alle JSONs in Liste
            for(ctf of response) {
                //schreibe jede Frage in HTML 
                displayCTF(ctf);
                ctfArray.push(ctf);
            }
        } 
    });
}

//Funktion um Antwort zu überprüfen
function displayAnswer(btn) {
  //Antwort von Button 
  let answer="";
  for (let i=0;i< ctfArray.length;i++) {
     if (btn.id==ctfArray[i].id) {
       answer =ctfArray[i].antwort;}
  }

  //alle Eingabe Forms 
  let inputForms = document.getElementsByClassName("ansForm");

  //für jeden Button
  for (let i=0;i< inputForms.length;i++) {

    if (btn.id==inputForms[i].id) {
      //Wenn  id von button gleich der Antwortfeld id entspricht:
      let eingabe = inputForms[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;

      let loesung = inputForms[i].getElementsByTagName("div")[1];
      if (eingabe===answer) {
         loesung.innerHTML = richtig;} 
      else {
         falsch =  '<button type="submit" onclick="secondTry(this)" id="'+btn.id+'" class="btn btn-outline-danger mb-3">Erneut überprüfen </button>';
         loesung.innerHTML = falsch;
        }
    }
  }
}


//Funktion wird aufegrufen nachdem falsche Eingabe eingegeben wird
function secondTry(btn) {
  //Antwort von Button 
  let answer="";
  for (let i=0;i< ctfArray.length;i++) {
     if (btn.id==ctfArray[i].id) {
       answer =ctfArray[i].antwort;}
  }
  
  //alle Antwort Forms 
  let inputForms = document.getElementsByClassName("ansForm");
  
  //für jeden Button
  console.log("btn.id "+btn.id);
  for (let i=0;i< inputForms.length;i++) {
    if (btn.id==inputForms[i].id) {
      let eingabe = inputForms[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
      let loesung = inputForms[i].getElementsByTagName("div")[1];
      if (eingabe===answer) {
         loesung.innerHTML = richtig;} 
      else {
         loesung.innerHTML = falsch;
      }
    }
  }
}





async function init() {
    console.log("Page ready!");
    //Mache Rätsel sichtbar
    await getCTFs();



}
