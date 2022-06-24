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

var falsch =  `<button type="submit" class="btn btn-outline-danger mb-3">Erneut überprüfen </button>`


//one --> One oder two --> Two 
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function displayCTF(ctf){
    displayRawCTF(ctf.id);
    rawCTF = document.getElementsByClassName("accordion-item");
    CTFElement = rawCTF[rawCTF.length-1];
    let CTFElementHTML = CTFElement.children[1].children[0].innerHTML 
    CTFElement.children[1].children[0].innerHTML = ctf.frage + CTFElementHTML;  //  accordion-body
  };


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
        <form class="row g-4 ansForm" onsubmit="return false">\
          <div class="col-4">\
            <label for="tfAntwort'+ctfId+'" class="visually-hidden">Antwort</label>\
            <input type="text" class="form-control" data-id="'+ctfId+'" id="tfAntwort'+ctfId+'" placeholder="Antwort" required="">\
              </div>\
              <div class="col-auto">\
                <button onclick="displayAnswer(this)" data-id="'+ctfId+'" type="submit" class="btn btn-outline-info mb-3">\
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
            }
        } 
    });
}


var count_2=0;
function displayAnswer(btn) {
  //Bei click wird Button übergeben
  //Danach soll geguckt werden ob Antwort feld passt
  //--> form.div[0].input  --> das input Feld variiert
  //Je nach dem soll dann das richitge Feld angezeigt werden --> richtig/falsch
  //id des geklickten Btns 

  //antwort aus AntwortForm
  let ansForm = document.getElementsByClassName("ansForm");
  console.log(ansForm);
  let antwortArray = document.querySelector("input[data-id="+btn.data-id+"]");
  console.log(antwortArray);
  let loesung = ansForm[count_2].getElementsByTagName("div")[1];
  
  count_2++;
  if (antwort==="blau") {
     loesung.innerHTML = richtig; 
  } 
  else {
     loesung.innerHTML = falsch; 
  }
  
  console.log(antwort);



  /*//Wenn submit Button geklickt wird 
  answerForm.addEventListener("submit", (clickevent) => {
      clickevent.preventDefault();});

  btn = document.getElementById(btn);
  


  console.log(btn.textContent);
  alert("hey")*/

}


async function init() {
    console.log("Page ready!");
    //Mache Rätsel sichtbar
    await getCTFs();


}
