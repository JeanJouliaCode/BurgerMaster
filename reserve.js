var Reserve = class Reserve {
  constructor(ingredient, unlock, speed, document) {
    this.speedOfDelivery = speed;
    this.unlock = unlock;
    this.ingredient = ingredient;
    this.document = document;
    this.listElement = [];

    this.elementInfo = {
      bredTop: { nb: 10 },
      meat: { nb: 10 },
      ketchup: { nb: 10 },
      salad: { nb: 10 },
      cheese: { nb: 10 },
      pickle: { nb: 10 },
      tomato: { nb: 10 },
      beacon: { nb: 10 },
      bredTopBlack: { nb: 10 },
      egg: { nb: 10 }
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  init() {
    if (this.unlock) {
      for (var i = 0; i < this.elementInfo[this.ingredient].nb; i++) {
        var imageIngredient = document.createElement("img");
        imageIngredient.src =
          "ressources/ingredients/" + this.ingredient + ".gif";
        imageIngredient.classList.add("foodElement");
        this.document.appendChild(imageIngredient);
        this.listElement.push(imageIngredient);
      }
    } else {
      this.document.style.backgroundColor = "grey";
    }
  }
};
