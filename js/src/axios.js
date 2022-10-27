// HTML Element

const d = document;
let $numberAdvice = d.getElementById("numberAdvice");
let $messageAdvice = d.getElementById("messageAdvice");
let $otherAdviceButton = d.getElementById("otherAdviceButton");
let $adviceInfo = d.getElementById("adviceInfo");
let $loader = d.getElementById("loader");

// Axios
async function getAdvice(numberRandomSearch) {
  let url = `https://api.adviceslip.com/advice/${numberRandomSearch}`;
  switchLoader("active-get");
  try {
    let rst = await axios.get(url);
    let json = await rst.data;

    let numberAdvice = `${(await json).slip.id}`;
    let messageAdvice = `${(await json).slip.advice}`;

    $numberAdvice.textContent = `#${numberAdvice}`;
    $messageAdvice.textContent = `“${messageAdvice}”`;
    switchLoader("active-get");
  } catch (err) {
    switchLoader("active-get");
    $numberAdvice.textContent = `#404`;
    $messageAdvice.textContent = `“Sorry, an error occurred, please try again.”`;
  }
}

$otherAdviceButton.addEventListener("click", getAgain);

function switchLoader(active) {
  $loader.classList.toggle(active);
  $adviceInfo.classList.toggle(active);
}

function getAgain() {
  let randomNumber = Math.round(Math.random() * 220);
  getAdvice(randomNumber);
}
// open app
let numberTemp = 117;
getAdvice(numberTemp);
