// Shopping cart array
let cart = [];

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

  cartList.innerHTML += `<li><strong>Total: ${total} kr</strong></li>`;
}

// Funktion för att ta bort produkter från varukorgen
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Sätt ihop listeners till "Add to cart" knapparna
document.addEventListener("DOMContentLoaded", () => {
  let buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let parent = event.target.closest("div");
      let name = parent.querySelector("h2").innerText;
      let price = parseInt(
        parent
          .querySelector("p")
          .innerText.replace("Pris: ", "")
          .replace("kr", "")
          .replace(/\s+/g, "")
      );

      addToCart(name, price);
    });
  });
});
