var burger;
var foodList = [];
var ingredientChart = {
  bredTop: { unlock: true },
  meat: { unlock: true },
  ketchup: { unlock: false },
  salad: { unlock: false },
  cheese: { unlock: true },
  pickle: { unlock: false },
  tomato: { unlock: false },
  beacon: { unlock: false },
  bredTopBlack: { unlock: false },
  egg: { unlock: false }
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
      food
    );
    foodElement.init();
    foodList.push(foodElement);
    console.log(food.id);
  }
}

function generateCommand() {
  console.log("click");
  burger.prepare(
    [
      "plate",
      "bredBottom",
      "ketchup",
      "cheese",
      "meat",
      "pickle",
      "tomato",
      "bredTop"
    ],
    50
  );
}
