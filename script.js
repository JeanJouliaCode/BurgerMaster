var burger;
var foodList = [];
var ingredientChart = {
  bredTop: { unlock: true, nb: 17 },
  meat: { unlock: true, nb: 17 },
  ketchup: { unlock: true, nb: 17 },
  salad: { unlock: true, nb: 15 },
  cheese: { unlock: true, nb: 17 },
  pickle: { unlock: false, nb: 17 },
  tomato: { unlock: false, nb: 17 },
  beacon: { unlock: false, nb: 17 },
  bredTopBlack: { unlock: false, nb: 17 },
  egg: { unlock: false, nb: 17 }
};

var regularIngredient= ["meat","salad","pickle","tomato","beacon","egg","cheese"]

currentChef = 0;

var chefs= {
  chef0 : {min : 1 , max : 2 , nbUnlocked: 5 , speed : 50},
  chef1 : {min : 1 , max : 3, nbUnlocked: 6, speed : 25},
  chef2 : {min : 2 , max : 4, nbUnlocked: 7, speed : 12},
  chef3 : {min : 3 , max : 5, nbUnlocked: 8, speed : 6},
  chef4 : {min : 4 , max : 6, nbUnlocked: 9, speed : 3},
  chef5 : {min : 5 , max : 7, nbUnlocked: 10, speed : 1},
}

function startGame() {
  burger = new Burger();
  burger.init();

  var foodDiv = document.getElementsByClassName("food");
  for (var food of foodDiv) {
    var foodElement = new Reserve(
      food.id,
      ingredientChart[food.id].unlock,
      8000,
      food,
      ingredientChart[food.id].nb
    );
    foodElement.init();
    foodList.push(foodElement);
  }

  var order = document.getElementById("order");
  order.addEventListener("click", this.makeBurger);
}

function makeBurger(){
  //burger.prepare(generateCommand(),chefs["chef"+ currentChef.toString(10)].speed )
  burger.prepare(generateCommand(),10 )
}

function checkReserve(listIngredient){
  isReserveEnough = true;
  var reserveCount = {}
  for(var foodReserve of foodList){
    reserveCount[foodReserve.ingredient]=foodReserve.nbElement;
  }

  for(var ingredient of listIngredient){
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
        continue;
      }
      ingredient = "bredTop";
    }
    reserveCount[ingredient]--;
    isReserveEnough = reserveCount[ingredient]<0 ? false : isReserveEnough;
  }
  return isReserveEnough;
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
  command = ["plate"]
  if(currentChef === 5){
    command.push("bredBottomBlack")
  }
  else{
    command.push("bredBottom")
  }

  if(Math.floor(Math.random() * 10)>=7){
    command.push("ketchup")
  }

  if(Math.floor(Math.random() * 10)>=2){
    command.push("meat")
  }

  var nbElementAdded = Math.floor(Math.random() * (chefs["chef"+ currentChef.toString(10)].max-chefs["chef"+ currentChef.toString(10)].min+1))+chefs["chef"+ currentChef.toString(10)].min
  var i = 0;
  while( i < nbElementAdded){
    var ingredient = regularIngredient[Math.floor(Math.random() * regularIngredient.length)];

    if(ingredientChart[ingredient].unlock){
      i++
      command.push(ingredient);
    }
  }

  if(currentChef === 5){
    command.push("bredTopBlack")
  }
  else{
    command.push("bredTop")
  }
  console.log(command)
  return command;

}
