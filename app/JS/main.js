import "../CSS/style.css";

async function getData() {
  try {
    const response = await fetch(
      "https://valorant-api.com/v1/weapons/skins/89be9866-4807-6235-2a95-499cd23828df"
    );
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);

      const displayIconUrl = data.data.displayIcon;

      document
        .querySelector(".container")
        .insertAdjacentHTML(
          "beforeend",
          `<img src="${displayIconUrl}" alt="Weapon Skin Icon">`
        );
    }
  } catch (error) {
    console.log(error);
    alert("Sorry error");
  }
}

getData();
