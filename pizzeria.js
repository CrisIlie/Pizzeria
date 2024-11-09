// cart value
let cartValue = 0;

function getExtraPizzaCost(ingredientList) {
  let extraCost = 0;
  // Check for selected extra ingredients
  const checkboxes = ingredientList.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      extraCost += parseFloat(checkbox.value);
    }
  });
  return extraCost;
}

// Ingredient definitions
const ingredients = {
  tomatoSauce: { name: "Tomato Sauce", price: 0.5 },
  basil: { name: "Fresh Basil", price: 0.3 },
  mozarella: { name: "Mozzarella", price: 1.0 },
  cherryTomatoes: { name: "Cherry Tomatoes", price: 0.7 },
  emmentaler: { name: "Emmentaler", price: 1.5 },
  blueCheese: { name: "Blue Cheese", price: 1.8 },
  gorgonzola: { name: "Gorgonzola", price: 2.0 },
  pepperoni: { name: "Pepperoni", price: 1.5 },
  mixedPeppers: { name: "Mixed Peppers", price: 0.8 },
  ham: { name: "Ham", price: 1.5 },
  mushrooms: { name: "Mushrooms", price: 0.6 },
  corn: { name: "Corn", price: 0.4 },
  greenPeppers: { name: "Green Peppers", price: 0.5 }
};

const toppings = {
  tomatoBase: "Tomato Base",
  bbqBase: "BBQ Base",
  garlicHerbBase: "Garlic & Herb Base",
  chocolateBase: "Chocolate Base"
};

// READY TO BE ORDERED PIZZAS ARRAY OF OBJECTS WITH DETAILS
const readyMadePizzas = [
  {
    name: "Pizza margherita",
    id: "margherita",
    topping: [toppings.tomatoBase],
    ingredients: [
      ingredients.tomatoSauce,
      ingredients.basil,
      ingredients.mozarella,
      ingredients.cherryTomatoes
    ],
    price: 9
  },
  {
    name: "Pizza quattro formaggi",
    id: "quatro",
    topping: [toppings.tomatoBase],
    ingredients: [
      ingredients.mozarella,
      ingredients.emmentaler,
      ingredients.blueCheese,
      ingredients.gorgonzola
    ],
    price: 14
  },
  {
    name: "Pizza pepperoni",
    id: "Pepperoni",
    topping: [toppings.tomatoBase],
    ingredients: [
      ingredients.tomatoSauce,
      ingredients.mozarella,
      ingredients.pepperoni,
      ingredients.mixedPeppers
    ],
    price: 13
  },
  {
    name: "Pizza Salerno",
    id: "salerno",
    topping: [toppings.tomatoBase],
    ingredients: [
      ingredients.tomatoSauce,
      ingredients.mozarella,
      ingredients.ham,
      ingredients.mushrooms
    ],
    price: 11
  },
  {
    name: "Pizza Roma",
    id: "roma",
    topping: [toppings.tomatoBase],
    ingredients: [
      ingredients.tomatoSauce,
      ingredients.mozarella,
      ingredients.ham,
      ingredients.corn,
      ingredients.greenPeppers
    ],
    price: 13
  },
  {
    name: "Create own pizza",
    id: "customPizza",
    topping: [toppings.tomatoBase],
    ingredients: ["you choose!"],
    price: 5
  }
];

// Function to display pizzas 
function displayPizzas(pizzas) {
  const pizzaList = document.getElementById("pizza-list");
  pizzaList.innerHTML = ""; // Clear the list before adding pizzas

  pizzas.forEach((pizza) => {
    const pizzaDiv = document.createElement("div");
    pizzaDiv.className = "pizza";
    pizzaDiv.id = pizza.id;

    const pizzaName = document.createElement("h2");
    pizzaName.textContent = pizza.name;
    pizzaDiv.appendChild(pizzaName);

    const toppingList = document.createElement("p");
    toppingList.textContent = `Sauce: ${pizza.topping.join(", ")}`;
    pizzaDiv.appendChild(toppingList);

    const ingredientsList = document.createElement("p");
    ingredientsList.textContent = `Toppings: ${pizza.ingredients
      .map((ingredient) => ingredient.name)
      .join(", ")}`;
    pizzaDiv.appendChild(ingredientsList);

    // list of ingredients button
    const ingredientButton = document.createElement("button");
    ingredientButton.className = "ingredient-btn";
    ingredientButton.textContent = "Add Ingredients";
    pizzaDiv.appendChild(ingredientButton);

    const ingredientList = document.createElement("ul");
    ingredientList.className = "ingredient-list";
    for (const key in ingredients) {
      const ingredient = ingredients[key];
      const ingredientItem = document.createElement("li");

      // checkboxes for list of ingredients
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = key;
      checkbox.name = ingredient.name;
      checkbox.value = ingredient.price;
      checkbox.addEventListener('click', () => {
        const extraCost = getExtraPizzaCost(ingredientList);
        totalPizzaValue.innerText = (pizza.price + extraCost).toFixed(2);
      });

      const label = document.createElement("label");
      label.htmlFor = key;
      label.textContent = `${ingredient.name} - $${ingredient.price.toFixed(2)}`;

      ingredientItem.appendChild(checkbox);
      ingredientItem.appendChild(label);
      ingredientList.appendChild(ingredientItem);
    }
    ingredientList.style.display = "none"; // Hide ingredients initially
    pizzaDiv.appendChild(ingredientList);

    // Order value
    const pizzaPrice = document.createElement("p");
    pizzaPrice.textContent = `Base price: $${pizza.price}`;
    pizzaDiv.appendChild(pizzaPrice);

    // Extra pizza price
    const pizzaPriceTotal = document.createElement("p");
    pizzaPriceTotal.textContent = `Total price: $`;
    pizzaDiv.appendChild(pizzaPriceTotal);

    // Total pizza value
    const totalPizzaValue = document.createElement('span');
    totalPizzaValue.innerText = pizza.price.toFixed(2);
    pizzaPriceTotal.appendChild(totalPizzaValue);

    // Add to cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.className = "btn";
    // Onclick button
    addToCartButton.addEventListener("click", () => {
      const extraCost = getExtraPizzaCost(ingredientList);
      // Update cart value
      cartValue += pizza.price + extraCost;
      document.getElementById("cart-value").innerText = cartValue.toFixed(2);
    });

    addToCartButton.textContent = "Add to cart";
    pizzaDiv.appendChild(addToCartButton);

    pizzaList.appendChild(pizzaDiv);

    // Toggle ingredient list visibility
    ingredientButton.addEventListener("click", () => {
      if (ingredientList.style.display === "none") {
        ingredientList.style.display = "block";
        ingredientButton.textContent = "Hide Ingredients";
      } else {
        ingredientList.style.display = "none";
        ingredientButton.textContent = "Add Ingredients";
      }
    });
  });
}

// Call the displayPizzas function to display the ready-made pizzas
displayPizzas(readyMadePizzas);

// LOGIN BUTTON
//declare variables to store username and password
let username;
let password;

// Get element from HTML
const loginButton = document.getElementById("login");

// Add event listener - button click triggers function
loginButton.addEventListener("click", loginFunc);

//create login function
function loginFunc() {
  //prompt input of username and password
  username = prompt("Please choose a username:");
  password = prompt("Please choose a password:");
  //Display the username and password in an alert box
  alert(`Username: ${username}\nPassword: ${password}`);
  
    // Log the username and password to ensure they are being set correctly
  console.log(`Set username: ${username}`);
  console.log(`Set password: ${password}`);
}

//CHECKOUT BUTTON

//get element from HTML
const checkoutButton = document.getElementById("checkout");

// add event listener that triggers function
checkoutButton.addEventListener("click", checkoutFunc);

//create checkout function
function checkoutFunc() {
  // Log the username and password to ensure they are being set correctly
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);
  const inUsername = prompt(`Your cart comes to €${cartValue} please enter your Username:`);
  
  if (inUsername == username) {
  const inPassword = prompt(`please enter the Password for username${inUsername}`);
    if (inPassword == password) {
      alert(`Yay! your Pizza is in the oven!`);
    }
    else {
      alert(`your username and password did not match please try again`);
    }
  }
  else {
    alert(`The username ${inUsername} does not exist please try again`);
  }
}

// Go to top button

let toTopBtn = document.getElementById("top-btn");

// While scrolling down 50px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {   
      toTopBtn.style.opacity = "1";
      toTopBtn.style.visibility = "visible";
    } else {
      toTopBtn.style.opacity = "0";
      toTopBtn.style.visibility = "hidden";
    }
};

// While clicking on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}