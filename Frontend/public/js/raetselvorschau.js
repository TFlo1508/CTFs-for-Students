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



var html_1 =  `<div class="col">
  <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item ctf-background-light">
  <h2 class="accordion-header" id="panelsStayOpen-heading` //Zahl

var html_2 =  `"> <button 
        class="accordion-button bg-dark text-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse`  //Zahl
  
var html_3 = `" aria-expanded="true"
        aria-controls="panelsStayOpen-collapse` //Zahl
     
var html_lvl = '">Level ';
var html_4 =`</button></h2> <div id="panelsStayOpen-collapse`//Zahl
   
var html_5 = `" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading` //Zahl
    
var html_6 =`"><div class="accordion-body">`
var frage ="";
        
//kein Refresh nach Button click
var html_7 = `<hr /> <form class="row g-4 ansForm" onsubmit="return false" id="`
        
var html_8 = `">
          <div class="col-4">
            <label for="tfAntwort" class="visually-hidden"
              >Antwort</label
            >
            <input
              type="text"
              class="form-control"
              id="` //ctfId

var html_9 =  `" placeholder="Antwort"
              required
            />
          </div>
          <div class="col-auto">
                <button onclick="displayAnswer(this)" id="` //ctfId
                 
                
var html_10 = `" type="submit" class="btn btn-outline-info mb-3">
                    Antwort überprüfen
               </button>
          </div>` // richtig/falsch Button (onclick())
         
 var html_11 =`</form>
      </div>
    </div>
  </div>`;

//Raetsel richti/falsch eingegeben
var richtig = `<div class="col-auto">
<span
  class="far fa-check-circle fa-2x text-success"
></span>
</div>`

var falsch =  `<button type="submit" class="btn btn-outline-danger mb-3">
Erneut überprüfen
</button>`


//one --> One oder two --> Two 
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Nummer --> Wort
  function wordify(num){
    var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                'seventeen', 'eighteen', 'nineteen'];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
                'ninety'];
  
    var numString = num.toString();
  
    if (num < 0) throw new Error('Negative numbers are not supported.');
  
    if (num === 0) return 'zero';
  
    //the case of 1 - 20
    if (num < 20) {
      return ones[num];
    }
  
    if (numString.length === 2) {
      return tens[numString[0]] + ' ' + ones[numString[1]];
    }
  
    //100 and more
    if (numString.length == 3) {
      if (numString[1] === '0' && numString[2] === '0')
        return ones[numString[0]] + ' hundred';
      else
        return ones[numString[0]] + ' hundred and ' + convert(+(numString[1] + numString[2]));
    }
  
    if (numString.length === 4) {
      var end = +(numString[1] + numString[2] + numString[3]);
      if (end === 0) return ones[numString[0]] + ' thousand';
      if (end < 100) return ones[numString[0]] + ' thousand and ' + convert(end);
      return ones[numString[0]] + ' thousand ' + convert(end);
    }
  }

var count=1;
function displayCTF(frage,ctfId) {
    //unterschiedlich: Level, bestimmte Attribute (Heading<One,Two,...>), id 
    html_all =html_1+capitalizeFirstLetter(wordify(count))+html_2+capitalizeFirstLetter(wordify(count))+html_3+capitalizeFirstLetter(wordify(count))+
    html_lvl+count+html_4+capitalizeFirstLetter(wordify(count))+html_5+capitalizeFirstLetter(wordify(count))+html_6+frage+html_7+html_8+ctfId+html_9+ctfId+html_10+html_11;   

    var raetsel = document.getElementsByClassName("col")[0];
    raetsel.innerHTML += html_all;
    count++;
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
                displayCTF(ctf.frage, ctf.id);
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
  let antwort = ansForm[count_2].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
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
