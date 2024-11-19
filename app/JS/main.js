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
      console.log(data);
      console.log(data.data.shopData);
    }
  } catch (error) {
    console.log(error);
    alert("Sorry, weapons are not loaded.");
  }
}

function displayCards(data) {
  const apiData = data.data;

  apiData.forEach((Weapon) => {
    DOMselectors.container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card w-96 bg-base-100 shadow-xl p-4 m-4 rounded-xl border-2 border-black">
          <figure><img src="${Weapon.displayIcon}" alt="${Weapon.displayName}" class="object-contain w-full h-48" /></figure>
          <div class="card-body">
            <h2 class="card-title">${Weapon.displayName}</h2>
            <p>Cost: $${Weapon.shopData.cost}</p>
          </div>
        </div>
      `
    );
  });
}

getData();
