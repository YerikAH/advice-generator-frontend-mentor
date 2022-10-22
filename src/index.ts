import { Welcome } from "./models";

async function getAdvice() {
  let url: string = "https://api.adviceslip.com/advice";
  try {
    let rst: Response = await fetch(url);
    let json: Promise<Welcome> = await rst.json();
    if (!rst.ok) {
      throw {
        statusText: rst.statusText,
        status: rst.status,
      };
    }
    console.log((await json).slip);
  } catch (error) {
    console.log(error);
  }
}
getAdvice();
