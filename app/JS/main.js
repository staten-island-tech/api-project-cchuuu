import "../CSS/style.css";
import { DOMselectors } from "./dom";

async function getData() {
  try {
    const response = await fetch("https://valorant-api.com/v1/weapons/skins/");
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);

      const source = data.data;
      source.forEach((item) => {
        DOMselectors.container.insertAdjacentHTML(
          "beforeend",
          `<img src="${item.displayIcon}" alt="Weapon Skin Icon">`
        );
      });
    }
  } catch (error) {
    console.log(error);
    alert("Sorry error");
  }
}

getData();
