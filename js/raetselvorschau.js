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
var html_4 =`</button>
    </h2>
    <div
      id="panelsStayOpen-collapse`//Zahl
   
var html_5 = `" class="accordion-collapse collapse show"
      aria-labelledby="panelsStayOpen-heading` //Zahl
    
var html_6 =`"><div class="accordion-body">`
var frage ="";
        
var html_7 = `<hr />
        <form class="row g-4">
          <div class="col-4">
            <label for="tfAntwort" class="visually-hidden"
              >Antwort</label
            >
            <input
              type="text"
              class="form-control"
              id="tfAntwort"
              placeholder="Antwort"
              required
            />
          </div>
          <div class="col-auto">
            <a
              href="./raetselvorschau_loesung.html"
              class="btn btn-outline-info mb-3"
              >Antwort überprüfen</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>`;

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
function displayCTF(frage) {
    //Level hochinkrementieren
    html_all =html_1+capitalizeFirstLetter(wordify(count))+html_2+capitalizeFirstLetter(wordify(count))+html_3+capitalizeFirstLetter(wordify(count))+
    html_lvl+count+html_4+capitalizeFirstLetter(wordify(count))+html_5+capitalizeFirstLetter(wordify(count))+html_6+frage+html_7;   

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
                displayCTF(ctf.frage);
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
