import "../CSS/style.css";
import { DOMselectors } from "./dom";

async function getData() {
  try {
    const response = await fetch("https://valorant-api.com/v1/weapons");
    // Guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      displayCards(data);
    }
  } catch (error) {
    console.log(error);
    alert("Sorry, weapons are not loaded.");
  }
}

function displayCards(data) {
  const apiData = data.data;

  apiData.forEach((Weapon) => {
    const cost = Weapon.shopData ? Weapon.shopData.cost : "N/A";
    DOMselectors.container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card w-1/5 h-[20vw] bg-red-500 rounded-3xl flex flex-col items-center justify-evenly m-8 border-2 border-black">
          <div class="card-body">
            <h2 class="card-title text-center font-semibold">${Weapon.displayName}</h2>
            <img src="${Weapon.displayIcon}" alt="${Weapon.displayName}" class="object-contain w-full h-48 rounded-lg shadow-md"/>
            <h5 class="mt-2 text-center">Cost: $${cost}</h5>
          </div>
        </div>
      `
    );
  });
}

getData();
