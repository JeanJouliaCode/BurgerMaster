var burger;
var foodList = [];
var ingredientChart = {
  bredTop: { unlock: true, nb: 17 },
  meat: { unlock: true, nb: 17 },
  ketchup: { unlock: false, nb: 17 },
  salad: { unlock: true, nb: 15 },
  cheese: { unlock: true, nb: 17 },
  pickle: { unlock: false, nb: 17 },
  tomato: { unlock: false, nb: 17 },
  beacon: { unlock: false, nb: 17 },
  bredTopBlack: { unlock: false, nb: 17 },
  egg: { unlock: false, nb: 17 }
};

function startGame() {
  burger = new Burger();
  burger.init();

  var foodDiv = document.getElementsByClassName("food");
  for (var food of foodDiv) {
    var foodElement = new Reserve(
      food.id,
      ingredientChart[food.id].unlock,
      10,
      food,
      ingredientChart[food.id].nb
    );
    foodElement.init();
    foodList.push(foodElement);
  }
}

function removeReserve(ingredient) {
  if (
    ingredient == "bredTop" ||
    ingredient == "bredBottom" ||
    ingredient == "bredTopBlack" ||
    ingredient == "bredBottomBlack" ||
    ingredient == "plate"
  ) {
    if (
      ingredient == "bredTopBlack" ||
      ingredient == "bredTop" ||
      ingredient == "plate"
    ) {
      return;
    }
    ingredient = "bredTop";
  }
  for (var foodReserve of foodList) {
    if (foodReserve.ingredient === ingredient) {
      foodReserve.remove();
    }
  }
}

function generateCommand() {
  burger.prepare(
    ["plate", "bredBottom", "cheese", "meat", "salad", "bredTop"],
    10
  );
}
