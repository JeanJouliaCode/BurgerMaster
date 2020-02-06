var foodList = [];
var ingredientChart = {
  bredTop: { unlock: true, nb: 17, price: 1 },
  meat: { unlock: true, nb: 17, price: 1 },
  ketchup: { unlock: true, nb: 17, price: 0.6 },
  salad: { unlock: true, nb: 15, price: 0.4 },
  cheese: { unlock: true, nb: 17, price: 1 },
  pickle: { unlock: false, nb: 17, price: 2.3 },
  tomato: { unlock: false, nb: 17, price: 1.2 },
  beacon: { unlock: false, nb: 17, price: 3 },
  bredTopBlack: { unlock: false, nb: 17, price: 4 },
  egg: { unlock: false, nb: 17, price: 2 }
};

var regularIngredient = [
  "meat",
  "salad",
  "pickle",
  "tomato",
  "beacon",
  "egg",
  "cheese"
];

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
      this.nbElement--;
    }
  }

  add() {
    if (this.nbElement < this.nbMax) {
      var imageIngredient = document.createElement("img");
      imageIngredient.src =
        "ressources/ingredients/" + this.ingredient + ".gif";
      imageIngredient.style.height = (100 / this.nbMax).toString(10) + "%";
      imageIngredient.classList.add("foodElement");
      this.document.appendChild(imageIngredient);
      this.listElement.push(imageIngredient);
      this.nbElement++;
    }
  }
};
