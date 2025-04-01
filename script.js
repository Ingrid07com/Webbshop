// Deklarera en varukorg array
let cart = [];

//Kolla om de är en stored cart in localStorage
//Om hittad, laddas den sparade korgen upp på varukorgs displayen

if (JSON.parse(localStorage.getItem("cart"))) {
  cart = JSON.parse(localStorage.getItem("cart"));
  updateCart();
}

// Funktion för att lägga till  produkter till varukorgen
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

// Funktion för att uppdatera varukorg displayen
function updateCart() {
  let cartList = document.querySelector("ul");
  cartList.innerHTML = "";
  let total = 0;

  // Funktion för att spara varukorgen i localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  cart.forEach((item, index) => {
    total += item.price;
    cartList.innerHTML += `
        <li class="VarukorgText" >${item.name} - ${item.price} kr 
        <button class="RemoveKnappar" onclick="removeFromCart(${index})">Remove</button>
        </li>`;
  });
  //Gör en lista med en totala kostnaden
  cartList.innerHTML += `<li><strong>Total: ${total} kr</strong></li>`;
}

// Funktion för att ta bort produkter från varukorgen
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Sätt ihop listeners till "Add to cart" knapparna
document.addEventListener("DOMContentLoaded", () => {
//QuerySelector kollar om de finns ett element i html koden
  let buttons = document.querySelectorAll("button");


//Skapa en forEach loop så man kan lägga till flertal varor
  buttons.forEach((button) => {

//AddEventListener lägger till element med ett click
    button.addEventListener("click", (event) => {
  //Hittar de närmsta förälder-elementet i diven som omger de klcikande elementet
      let parent = event.target.closest("div");
      let name = parent.querySelector("h2").innerText;
      let price = parseInt(
        parent
          .querySelector("p")
          .innerText.replace("Pris: ", "")

//Tar bort texten kronor i en sträng
          .replace("kr", "")

//Tar bort mellanrum i en sträng
          .replace(/\s+/g, "")
      );

      //Använd funktionen för att skriva ut de man lagt till i varukorgen med namn och pris
      addToCart(name, price);
    });
  });
});
