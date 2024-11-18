import "../CSS/tailwind.css";
import { DOMselectors } from "./dom";

async function getData() {
  try {
    const response = await fetch("https://valorant-api.com/v1/weapons/skins/");
    // Guard clause
    if (response.status != 200) {
      throw new Error(reponse);
    } else {
      const data = await response.json();
      console.log(data);

      displayCards(data);
    }
  } catch (error) {
    console.log(error);
    alert("Sorry, skins are not loaded.");
  }
}

function displayCards(data) {
  const apiData = data.data;
  apiData.forEach((Skin) => {
    DOMselectors.container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card w-1/5 h-80 bg-peachpuff rounded-3xl flex flex-col items-center justify-evenly m-8 border-2 border-black">
          <h3 class="headers centertext">${Skin.displayName}</h3>
          <img src="${Skin.displayIcon}" alt="${Skin.displayName}" class="image object-contain w-3/4">
        </div>
      `
    );
  });
}
getData();
