var money = 250000;

var save = {
  money: 0,
  ingredientChart: null,
  chefs: null,
  currentChef: null,
  towerBurger: null,
  offsetmax: null,
  command : null,
  pending : null,
  priceIncrease: null,
  isThereKetchup: null,
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
    priceIncrease = save.priceIncrease;
    isThereKetchup = save.isThereKetchup;
  }
}




function updateScore() {
  save.ingredientChart = ingredientChart;
  save.money = money;
  save.chefs = chefs;
  save.currentChef = currentChef;
  save.towerBurger = towerBurger;
  save.offsetmax = offsetmax;
  save.command = command;
  save.pending = pending;
  save.priceIncrease = priceIncrease;
  save.isThereKetchup = isThereKetchup;
  localStorage.setItem('saveObject', JSON.stringify(save));
  var score = document.getElementById("scoreDigit");
  score.textContent = (Math.round(money * 10) / 10).toString(10);
  if(tamponTmp!= 0){
    for (var ingredientButton of foodList) {
      ingredientButton.checkMoneyButton();
    }

    for (var chef of chefList) {
      chef.checkMoneyButton();
    }
  }
}
