var Reserve = class Reserve {
  constructor(ingredient, unlock, speed, document, nbmax) {
    this.speedOfDelivery = speed;
    this.unlock = unlock;
    this.ingredient = ingredient;
    this.document = document;
    this.listElement = [];
    this.nbElement = 0;
    this.nbMax = nbmax;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  init() {
    if (this.unlock) {
      for (var i = 0; i < this.nbMax; i++) {
        this.add();
      }
    } else {
      this.document.style.backgroundColor = "grey";
    }
  }

  remove() {
    if (this.listElement.length > 0) {
      var ingredient = this.listElement.pop();
      ingredient.parentNode.removeChild(ingredient);
    }
  }

  add() {
    if (this.nbElement < this.nbMax) {
      var imageIngredient = document.createElement("img");
      imageIngredient.src =
        "ressources/ingredients/" + this.ingredient + ".gif";
      imageIngredient.classList.add("foodElement");
      this.document.appendChild(imageIngredient);
      this.listElement.push(imageIngredient);
      this.nbElement++;
    }
  }
};
