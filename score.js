var money = 250000;

var save = {
    money: 0,
    ingredientChart: null,
    chefs: null,
    currentChef: null,
    towerBurger: null,
    offsetmax: null,
    command: null,
    pending: null,
    priceBrugerMultiplicator: null,
    isThereKetchup: null,
    speed: null,
    elapsedTime: null,
}

function getItemLocalStorage() {

    var retrievedObject = localStorage.getItem('saveObject');
    var retrievedObjectTmp = JSON.parse(retrievedObject)
    if (retrievedObjectTmp && retrievedObjectTmp != null) {
        save = retrievedObjectTmp;
        money = save.money;
        chefs = save.chefs;
        currentChef = save.currentChef;
        ingredientChart = save.ingredientChart;
        towerBurger = save.towerBurger;
        offsetmax = save.offsetmax;
        command = save.command;
        pending = save.pending;
        priceBrugerMultiplicator = save.priceBrugerMultiplicator;
        isThereKetchup = save.isThereKetchup;
        speed = save.speed;
        elapsedTime = save.elapsedTime;
    }
}




function updateScore() {

    var score = document.getElementById("scoreDigit");
    if (money < 1000000) {
        score.textContent = (Math.round(money)).toString(10);
    } else {
        score.textContent = "error";
    }

    for (var ingredientButton of foodList) {
        ingredientButton.checkMoneyButton();
    }

    for (var chef of chefList) {
        chef.checkMoneyButton();
    }

}

function saveData() {
    save.ingredientChart = ingredientChart;
    save.money = money;
    save.chefs = chefs;
    save.currentChef = currentChef;
    save.towerBurger = towerBurger;
    save.offsetmax = offsetmax;
    save.command = command;
    save.pending = pending;
    save.priceBrugerMultiplicator = priceBrugerMultiplicator;
    save.isThereKetchup = isThereKetchup;
    save.speed = speed;
    save.elapsedTime = elapsedTime;
    localStorage.setItem('saveObject', JSON.stringify(save));
}