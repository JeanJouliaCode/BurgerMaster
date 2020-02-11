//create the display for the burger
var burger;

//chef List
var chefList = [];

var isGameGoing = true;

function startGame() {
  //initialise the burger
  burger = new Burger();

  //fill up the food reserve
  initFoodReserve();

  updateScore();

  initChef();

  //get div order to maker burger when clicked for test purpose
  makeBurger();
}

function makeBurger() {
  if (!burger.pending) {
    burger.prepare(generateCommand(), 10);
  }
  //burger.prepare(generateCommand(),chefs["chef"+ currentChef.toString(10)].speed )
}

function initFoodReserve() {
  //get the foodContainer div and initialize them
  var foodDiv = document.getElementsByClassName("ingredientPile");
  for (var food of foodDiv) {
    var ingredientPanel = new IngredientPanel(
      food.id, // ingredient name
      ingredientChart[food.id].unlock, // is it locked
      ingredientChart[food.id].initSpeed, // speed of delivery
      food, // HTML Document
      ingredientChart[food.id].nb, // maximum number of food in reserve
      ingredientChart[food.id].initPrice
    );

    //add element to the list
    foodList.push(ingredientPanel);
  }
}

function initChef() {
  for (chef of document.getElementsByClassName("locked")) {
    var newChef = new Chef(
      chef,
      false,
      false,
      false,
      "./ressources/chefs/" + chef.id + ".png",
      100,
      chefs[chef.id].speed,
      chefs[chef.id].unlocked
    );
    chefList.push(newChef);
  }
}
