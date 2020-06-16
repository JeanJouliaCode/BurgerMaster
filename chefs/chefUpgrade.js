function upgradeDoublePrice() {
    ingredientChart.bredTop.price = 5;
    changeBread();
}

function upgradeUpgradeLowest() {
    var ingredient = [

        { name: "bredTop", nb: 0 }, { name: "meat", nb: ingredientChart.meat.nbElement }, { name: "cheese", nb: ingredientChart.cheese.nbElement }, { name: "salad", nb: ingredientChart.salad.nbElement }, { name: "ketchup", nb: ingredientChart.ketchup.nbElement }, { name: "tomato", nb: ingredientChart.tomato.nbElement }, { name: "pickle", nb: ingredientChart.pickle.nbElement }, { name: "beacon", nb: ingredientChart.beacon.nbElement }, { name: "egg", nb: ingredientChart.egg.nbElement }, { name: "bredTopBlack", nb: ingredientChart.bredTopBlack.nbElement }
    ]

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
    priceBrugerMultiplicator = 3;
}