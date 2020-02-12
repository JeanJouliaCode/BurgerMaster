var orderList = [];

function displayOrder(listIngredient) {
  for (var ingredient of orderList) {
    ingredient.parentNode.removeChild(ingredient);
  }
  orderList = [];

  listIngredient.shift();
  var order = document.getElementById("order");
  for (var ingredient of listIngredient) {
    console.log("lement", listIngredient);
    var imageIngredient = document.createElement("img");
    imageIngredient.src = "./ressources/ingredients/" + ingredient + ".png";
    imageIngredient.classList.add("orderElement");
    order.appendChild(imageIngredient);
    orderList.push(imageIngredient);
  }
}
