function generateCommand() {
  command = ["plate"];
  if (currentChef === 5) {
    command.push("bredBottomBlack");
  } else {
    command.push("bredBottom");
  }

  if (Math.floor(Math.random() * 10) >= 5) {
    command.push("ketchup");
  }

  if (Math.floor(Math.random() * 10) >= 25) {
    command.push("meat");
  }

  var nbElementAdded =
    Math.floor(
      Math.random() *
        (chefs["chef" + currentChef.toString(10)].max -
          chefs["chef" + currentChef.toString(10)].min +
          1)
    ) + chefs["chef" + currentChef.toString(10)].min;
  var i = 0;
  while (i < nbElementAdded) {
    var ingredient =
      regularIngredient[Math.floor(Math.random() * regularIngredient.length)];

    if (ingredientChart[ingredient].unlock) {
      i++;
      command.push(ingredient);
    }
  }

  if (currentChef === 5) {
    command.push("bredTopBlack");
  } else {
    command.push("bredTop");
  }
  return command;
}

function checkReserve(listIngredient) {
  isReserveEnough = true;
  var reserveCount = {};
  for (var foodReserve of foodList) {
    reserveCount[foodReserve.ingredient] = foodReserve.nbElement;
  }

  for (var ingredient of listIngredient) {
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
    isReserveEnough = reserveCount[ingredient] < 0 ? false : isReserveEnough;
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
