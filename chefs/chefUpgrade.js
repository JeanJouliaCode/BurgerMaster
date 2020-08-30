function upgradeDoublePrice() {
    ingredientChart.bredTop.price = 5;
    displayOrder(command);
}

function upgradeUpgradeLowest() {
    var ingredient = [
        { name: "bredTop", nb: 0 },
        { name: "meat", nb: 0 },
        { name: "cheese", nb: 0 },
        { name: "salad", nb: 0 },
        { name: "ketchup", nb: 0 },
        { name: "tomato", nb: 0 },
        { name: "pickle", nb: 0 },
        { name: "beacon", nb: 0 },
        { name: "egg", nb: 0 },
        { name: "bredTopBlack", nb: 0 }
    ]

    var index = 0;
    for (var element of foodList) {
        ingredient[index].nb = element.unlock ? element.nbElement : 100;
        index++;
    }


    for (i = 0; i < ingredient.length; i++) {
        for (j = 0; j < (ingredient.length - i - 1); j++) {
            if (ingredient[j].nb > ingredient[j + 1].nb) {
                var tmp = ingredient[j];
                ingredient[j] = ingredient[j + 1];
                ingredient[j + 1] = tmp;
            }
        }
    }

    var upgrade1 = ingredient[0].name;

    var upgrade2 = ingredient[1].name;

    for (var food of foodList) {
        if (food.ingredient == upgrade1 || food.ingredient == upgrade2) {
            for (i = 0; i < 5; i++) {
                food.upgrade();
            }
        }
    }

}

function upgradeTowerBurger() {
    towerBurger = true;
}

function upgradeBiggerBurger() {
    offsetmax = 1;
}

function multiplyPriceBurger() {
    priceIncrease = true;
}

function alwaysKetchup() {
    isThereKetchup = true;
}

function randomMoreExpensiveBurger() {
    priceBrugerMultiplicator = 2;
}