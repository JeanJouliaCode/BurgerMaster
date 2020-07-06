var span;

var orderList = [];

function displayOrder(listIngredientOriginal) {
    listIngredient = [...listIngredientOriginal];
    for (var ingredient of orderList) {
        ingredient.parentNode.removeChild(ingredient);
    }
    orderList = [];

    listIngredient.shift();
    listIngredient.pop();
    var order = document.getElementById("order");
    for (var ingredient of listIngredient) {
        var imageDiv = document.createElement("div");
        var imageIngredient = document.createElement("img");
        imageDiv.appendChild(imageIngredient);
        imageIngredient.src = "./ressources/ingredients/" + ingredient + ((ingredientChart.bredTop.price > 1 && ingredient == 'bredBottom') ? "Gold" : "") + ".png";
        imageDiv.classList.add("orderElement");
        imageIngredient.classList.add("orderElementImage");
        imageDiv.style.marginLeft = "2%";
        order.appendChild(imageDiv);
        orderList.push(imageDiv);
    }
    var spanDiv = document.createElement("div");
    span = document.createElement("span");
    spanDiv.appendChild(span);
    spanDiv.classList.add("orderLastElement");
    spanDiv.classList.add("orderElement");
    span.classList.add("orderElementSpan");
    span.textContent =

        Math.floor(burger.getBurgerPrice(listIngredientOriginal)).toString(10) +
        "$";
    span.style.fontFamily = "Sauce";
    order.appendChild(span);
    orderList.push(span);
}

function changeSpanColor() {
    span.style.color = '#FF961B';
}