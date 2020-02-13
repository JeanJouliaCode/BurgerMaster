var orderList = [];

function displayOrder(listIngredientOriginal) {
  listIngredient = [...listIngredientOriginal];
  console.log("display order", listIngredient);
  for (var ingredient of orderList) {
    ingredient.parentNode.removeChild(ingredient);
  }
  orderList = [];

  listIngredient.shift();
  listIngredient.pop();
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
