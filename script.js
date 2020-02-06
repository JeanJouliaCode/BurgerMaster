//create the display for the burger
var burger;

function startGame() {
  //initialise the burger
  burger = new Burger();
  burger.init();

  //get the foodContainer div and initialize them
  var foodDiv = document.getElementsByClassName("food");
  for (var food of foodDiv) {
    var foodElement = new Reserve(
      food.id, // ingredient name
      ingredientChart[food.id].unlock, // is it locked
      8000, // speed of delivery
      food, // HTML Document
      ingredientChart[food.id].nb // maximum number of food in reserve
    );

    // init element with ingredient
    foodElement.init();

    //add element to the list
    foodList.push(foodElement);
  }

  //get div order to maker burger when clicked for test purpose
  var order = document.getElementById("order");
  order.addEventListener("click", this.makeBurger);

  updateScore();
}

function makeBurger() {
  //burger.prepare(generateCommand(),chefs["chef"+ currentChef.toString(10)].speed )
  burger.prepare(generateCommand(), 1);
}
