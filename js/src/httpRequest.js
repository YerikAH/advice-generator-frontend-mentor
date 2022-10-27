// HTML Element

const d = document;
let $numberAdvice = d.getElementById("numberAdvice");
let $messageAdvice = d.getElementById("messageAdvice");
let $otherAdviceButton = d.getElementById("otherAdviceButton");
let $adviceInfo = d.getElementById("adviceInfo");
let $loader = d.getElementById("loader");

// XMLHttpRequest

let xhttp = new XMLHttpRequest();

xhttp.addEventListener("readystatechange", (e) => {
  if (xhttp.readyState !== 4) {
    return;
  }
  if (xhttp.status >= 200 && xhttp.status < 300) {
    let json = JSON.parse(xhttp.responseText);
    let numberAdvice = json.slip.id;
    let messageAdvice = json.slip.advice;
    switchLoader();
    $numberAdvice.textContent = `#${numberAdvice}`;
    $messageAdvice.textContent = `“${messageAdvice}”`;
  } else {
    switchLoader();
    $numberAdvice.textContent = `#404`;
    $messageAdvice.textContent = `“Sorry, an error occurred, please try again.”`;
  }
});
$otherAdviceButton.addEventListener("click", getAgain);

// functions

function getData(number) {
  switchLoader();
  let url = `https://api.adviceslip.com/advice/${number}`;
  xhttp.open("GET", url);
  xhttp.send();
}

function getAgain() {
  let randomNumber = Math.round(Math.random() * 220);
  getData(randomNumber);
}

function switchLoader() {
  let classChangeHTML = "active-get";
  $loader.classList.toggle(classChangeHTML);
  $adviceInfo.classList.toggle(classChangeHTML);
}

//open app

let theNumberInitial = 117;
getData(theNumberInitial);
