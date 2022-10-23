import { Welcome } from "./models";

// HTML Element

const d = document;
let $numberAdvice: HTMLElement = d.getElementById("numberAdvice")!;
let $messageAdvice: HTMLElement = d.getElementById("messageAdvice")!;
let $otherAdviceButton: HTMLElement = d.getElementById("otherAdviceButton")!;
let $adviceInfo: HTMLElement = d.getElementById("adviceInfo")!;
let $loader: HTMLElement = d.getElementById("loader")!;

// Async await
async function getAdvice(numberRandomSearch: number): Promise<void> {
  let url: string = `https://api.adviceslip.com/advice/${numberRandomSearch}`;

  switchLoader("active-get");

  try {
    let rst: Response = await fetch(url);
    let json: Promise<Welcome> = await rst.json();

    if (!rst.ok) {
      throw {
        statusText: rst.statusText,
        status: rst.status,
      };
    }

    let numberAdvice: string = `${(await json).slip.id}`;
    let messageAdvice: string = `${(await json).slip.advice}`;

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

function switchLoader(active: string): void {
  $loader.classList.toggle(active);
  $adviceInfo.classList.toggle(active);
}

function getAgain(): void {
  let randomNumber: number = Math.round(Math.random() * 220);
  getAdvice(randomNumber);
}
// open app
let numberTemp: number = 117;
getAdvice(numberTemp);
