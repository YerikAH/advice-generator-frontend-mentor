// HTML Element

const d = document;
let $numberAdvice = d.getElementById("numberAdvice");
let $messageAdvice = d.getElementById("messageAdvice");
let $otherAdviceButton = d.getElementById("otherAdviceButton");
let $adviceInfo = d.getElementById("adviceInfo");
let $loader = d.getElementById("loader");

// Fetch promise

function getAdvice(numberRandomSearch) {
  switchLoader();
  let url = `https://api.adviceslip.com/advice/${numberRandomSearch}`;
  fetch(url)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((res) => {
      let numberAdvice = res.slip.id;
      let messageAdvice = res.slip.advice;
      $numberAdvice.textContent = `#${numberAdvice}`;
      $messageAdvice.textContent = `“${messageAdvice}”`;
      switchLoader();
    })
    .catch((err) => {
      switchLoader();
      $numberAdvice.textContent = `#404`;
      $messageAdvice.textContent = `“Sorry, an error occurred, please try again.”`;
    });
}

//functions

$otherAdviceButton.addEventListener("click", getAgain);

function switchLoader() {
  let classChangeHTML = "active-get";
  $loader.classList.toggle(classChangeHTML);
  $adviceInfo.classList.toggle(classChangeHTML);
}

function getAgain() {
  let randomNumber = Math.round(Math.random() * 220);
  getAdvice(randomNumber);
}
// open app
let numberTemp = 117;
getAdvice(numberTemp);
