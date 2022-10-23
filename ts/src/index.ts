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
    setTimeout(() => {
      $numberAdvice.textContent = `#${numberAdvice}`;
      $messageAdvice.textContent = `“${messageAdvice}”`;

      switchLoader("active-get");
    }, 3000);
  } catch (error) {
    console.log(error);
  }
}

$otherAdviceButton.addEventListener("click", (e) => {
  let randomNumber: number = Math.round(Math.random() * 220);
  getAdvice(randomNumber);
});

function switchLoader(active: string) {
  $loader.classList.toggle(active);
  $adviceInfo.classList.toggle(active);
}
// open app
let numberTemp: number = 117;
getAdvice(numberTemp);
