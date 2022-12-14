"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// HTML Element
const d = document;
let $numberAdvice = d.getElementById("numberAdvice");
let $messageAdvice = d.getElementById("messageAdvice");
let $otherAdviceButton = d.getElementById("otherAdviceButton");
let $adviceInfo = d.getElementById("adviceInfo");
let $loader = d.getElementById("loader");
// Async await
function getAdvice(numberRandomSearch) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://api.adviceslip.com/advice/${numberRandomSearch}`;
        switchLoader("active-get");
        try {
            let rst = yield fetch(url);
            let json = yield rst.json();
            if (!rst.ok) {
                throw {
                    statusText: rst.statusText,
                    status: rst.status,
                };
            }
            let numberAdvice = `${(yield json).slip.id}`;
            let messageAdvice = `${(yield json).slip.advice}`;
            $numberAdvice.textContent = `#${numberAdvice}`;
            $messageAdvice.textContent = `“${messageAdvice}”`;
            switchLoader("active-get");
        }
        catch (err) {
            switchLoader("active-get");
            $numberAdvice.textContent = `#404`;
            $messageAdvice.textContent = `“Sorry, an error occurred, please try again.”`;
        }
    });
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
