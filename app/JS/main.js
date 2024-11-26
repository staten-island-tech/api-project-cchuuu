import "../CSS/style.css";
import { DOMselectors } from "./dom";

async function getData() {
  try {
    const response = await fetch("https://valorant-api.com/v1/weapons");
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      displayCardsAndFilter(data);
    }
  } catch (error) {
    console.log(error);
    alert("Sorry, weapons are not loaded.");
  }
}
getData();
function displayCards(data, weapons) {
  const apiData = weapons || data.data;

  apiData.forEach((weapon) => {
    const cost = weapon.shopData ? weapon.shopData.cost : "N/A";
    DOMselectors.container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card w-1/5 h-[20vw] bg-red-500 rounded-3xl flex flex-col items-center justify-evenly m-8 border-2 border-black">
          <div class="card-body">
            <h2 class="cardtitle text-center font-bold text-xl">${weapon.displayName}</h2>
            <img src="${weapon.displayIcon}" alt="${weapon.displayName}" class="object-contain w-full h-48 rounded-lg shadow-md"/>
            <h5 class="mt-2 text-center font-bold">Cost: $${cost}</h5>
            <form>
            <button class="skinsBtn bg-orange-100 rounded-lg w-[6vw] border-black border-2">Skins</button>
            <button class="statsBtn bg-orange-100 rounded-lg w-[6vw] border-black border-2">Stats</button>
            </form>
          </div>
        </div>
      `
    );
  });
}

function filterGuns(data, category) {
  const apiData = data.data;
  const category = weapon.shopData ? weapon.shopData.category : "N/A";
  return apiData.filter((weapon) => weapon.shopData.category === category);
}

function displayCardsAndFilter(data) {
  displayCards(data, data.data);

  DOMselectors.allBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayCards(data, data.data);
  });

  DOMselectors.pistolsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const pistols = filterGuns(data, "Pistols");
    displayCards(data, pistols);
  });

  DOMselectors.riflesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const rifles = filterGuns(data, "Rifles");
    displayCards(data, rifles);
  });

  DOMselectors.shotgunsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const shotguns = filterGuns(data, "Shotguns");
    displayCards(data, shotguns);
  });
}
