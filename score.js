var money = 10000;

var save = {
  money: 0,
  ingredientChart: null,
  chefs: null,
  currentChef: null,
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
  }
}




function updateScore() {
  save.ingredientChart = ingredientChart;
  save.money = money;
  save.chefs = chefs;
  save.currentChef = currentChef;
  localStorage.setItem('saveObject', JSON.stringify(save));
  var score = document.getElementById("scoreDigit");
  score.textContent = (Math.round(money * 10) / 10).toString(10);
  for (var ingredientButton of foodList) {
    ingredientButton.checkMoneyButton();
  }

  for (var chef of chefList) {
    chef.checkMoneyButton();
  }
}
