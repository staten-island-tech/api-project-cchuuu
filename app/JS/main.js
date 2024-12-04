import "../CSS/style.css";
import { DOMselectors } from "./dom";

async function getData() {
  try {
    const response = await fetch("https://valorant-api.com/v1/weapons");
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      stats(data);
      displayCardsAndFilter(data);
    }
  } catch (error) {
    console.log(error);
    alert("Sorry, weapons are not loaded.");
  }
}
getData();

function clear() {
  DOMselectors.container.innerHTML = "";
}
function displayCards(data, weapons) {
  clear();
  const apiData = weapons || data.data;

  apiData.forEach((weapon) => {
    const cost = weapon.shopData ? weapon.shopData.cost : "N/A";
    DOMselectors.container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card w-1/5 h-[20vw] bg-red-500 rounded-3xl flex flex-col items-center justify-evenly m-8 border-4 border-black">
        <div class="card-body">
          <h2 class="cardtitle text-center font-bold text-xl">${weapon.displayName}</h2>
          <img src="${weapon.displayIcon}" alt="${weapon.displayName}" class="object-contain w-full h-full rounded-lg shadow-md border-black border-2"/>
          <h5 class="mt-2 text-center font-bold">Cost: $${cost}</h5>
          <button class="statsBtn bg-orange-100 rounded-lg w-[6vw] border-black border-2 text-black m-auto" data-id="${weapon.uuid}">Stats</button>
        </div>
      </div>
    `
    );
  });
}

function filterGuns(data, selectedCategory) {
  const apiData = data.data;
  return apiData.filter(
    (weapon) => weapon.shopData?.category === selectedCategory
  );
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

function stats(data) {
  DOMselectors.container.addEventListener("click", (event) => {
    if (event.target.classList.contains("statsBtn")) {
      event.preventDefault();
      const weaponId = event.target.getAttribute("data-id");
      const selectedWeapon = data.data.find(
        (weapon) => weapon.uuid === weaponId
      );

      if (selectedWeapon) {
        clear();
        DOMselectors.container.insertAdjacentHTML(
          "beforeend",
          `
              <div class="weapon-stats bg-red-500 p-4 rounded-lg mt-20 border-4 border-black">
                <h2 class="text-2xl font-bold">${
                  selectedWeapon.displayName
                }</h2>
                <img src="${selectedWeapon.displayIcon}" alt="${
            selectedWeapon.displayName
          }" class="object-contain w-full h-48 rounded-lg shadow-md"/>
                <p class="mt-2">Category: ${
                  selectedWeapon.shopData?.category || "N/A"
                }</p>
                <p>Cost: $${selectedWeapon.shopData?.cost || "N/A"}</p>
                <p>Fire Rate: ${
                  selectedWeapon.weaponStats?.fireRate || "N/A"
                }</p>
                <p>Magazine Size: ${
                  selectedWeapon.weaponStats?.magazineSize || "N/A"
                }</p>
                <p>Reload Time: ${
                  selectedWeapon.weaponStats?.reloadTimeSeconds || "N/A"
                }s</p>
                <button class="backBtn bg-orange-100 mt-4 p-2 w-[6vw] rounded-lg border-black border-2 text-black">Back</button>
              </div>
            `
        );

        document.querySelector(".backBtn").addEventListener("click", () => {
          displayCards(data, data.data);
        });
      }
    }
  });
}
