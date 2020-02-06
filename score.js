var money = 0;

function updateScore() {
  var score = document.getElementById("scoreDigit");
  score.textContent = (Math.round(money * 10) / 10).toString(10) + "-E";
}
