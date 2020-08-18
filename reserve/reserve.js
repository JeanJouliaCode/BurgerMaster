var command = [];

var towerBurger = false;

var offsetmax = 0;

var isThereKetchup = false;

function generateCommand() {
    var isBredBlack = false;
    command = ["plate"];
    if (currentChef === 5) {
        if (Math.floor(Math.random() * 10) >= 4) {
            command.push("bredBottomBlack");
            isBredBlack = true;
        } else {
            command.push("bredBottom");
        }
    } else {
        command.push("bredBottom");
    }

    if (Math.floor(Math.random() * 10) >= 7 || isThereKetchup) {
        command.push("ketchup");
    }

    if (Math.floor(Math.random() * 10) >= 3) {
        command.push("meat");
    }

    var nbElementAdded = towerBurger && Math.random() > 0.80 ? 30 :
        Math.floor(
            Math.random() *
            (chefs["chef" + currentChef.toString(10)].max + offsetmax -
                chefs["chef" + currentChef.toString(10)].min +
                1)
        ) + chefs["chef" + currentChef.toString(10)].min;

    var i = 0;

    while (i < nbElementAdded) {
        var ingredient =
            regularIngredient[Math.floor(Math.random() * regularIngredient.length)];

        if (ingredientChart[ingredient].unlock) {
            var tmpCommand = [...command];
            tmpCommand.push(ingredient);
            if (currentChef > 1 || maxElementDUplicate(tmpCommand) < 3) {
                i++;
                command.push(ingredient);
            }

        }
    }

    if (isBredBlack) {
        command.push("bredTopBlack");
    } else {
        command.push("bredTop");
    }
    return command;
}

function countElement(array, variable) {
    var count = 0;
    for (var element of array) {
        console.log(variable, element);
        if (variable === element) {
            count++;
        }
    }
    return count;
}

function maxElementDUplicate(array) {
    var maxNum = 0;
    for (var element of array) {
        var tmpNum = countElement(array, element);
        if (tmpNum > maxNum) {
            maxNum = tmpNum;
        }
    }
    console.log(maxNum);
    return maxNum;
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
        if (ingredient == "bredBottom") {
            ingredient = "bredTop";
        } else {
            ingredient = "bredTopBlack";
        }
    }
    for (var foodReserve of foodList) {
        if (foodReserve.ingredient === ingredient) {
            foodReserve.remove();
        }
    }
}