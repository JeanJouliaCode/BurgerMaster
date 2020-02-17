var money = 100000;

function updateScore() {
  var score = document.getElementById("scoreDigit");
  score.textContent = (Math.round(money * 10) / 10).toString(10);
  for (var ingredientButton of foodList) {
    ingredientButton.checkMoneyButton();
  }
}
