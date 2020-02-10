var foodList = [];
var ingredientChart = {
  bredTop: { unlock: true, nb: 17, price: 1, initPrice: 100, initSpeed: 5500 },
  meat: { unlock: true, nb: 17, price: 1, initPrice: 110, initSpeed: 6200 },
  ketchup: {
    unlock: true,
    nb: 17,
    price: 0.6,
    initPrice: 120,
    initSpeed: 10100
  },
  salad: { unlock: true, nb: 15, price: 0.4, initPrice: 130, initSpeed: 4300 },
  cheese: { unlock: true, nb: 17, price: 1, initPrice: 140, initSpeed: 6300 },
  pickle: {
    unlock: false,
    nb: 17,
    price: 2.3,
    initPrice: 150,
    initSpeed: 5000
  },
  tomato: {
    unlock: false,
    nb: 17,
    price: 1.2,
    initPrice: 160,
    initSpeed: 5100
  },
  beacon: { unlock: false, nb: 17, price: 3, initPrice: 170, initSpeed: 8000 },
  bredTopBlack: {
    unlock: false,
    nb: 17,
    price: 4,
    initPrice: 180,
    initSpeed: 7000
  },
  egg: { unlock: false, nb: 17, price: 2, initPrice: 190, initSpeed: 2000 }
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
  constructor(ingredient, unlock, speed, document, nbmax, initPrice) {
    this.speedOfDelivery = speed;
    this.unlock = unlock;
    this.ingredient = ingredient;
    this.document = document;
    this.listElement = [];
    this.nbElement = 0;
    this.nbMax = nbmax;
    this.priceUpgrade = initPrice;
    this.isReserveFilling = true;
    this.speedDocument = null;
    this.button = null;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  init() {
    this.speedDocument = document.getElementById(this.ingredient + "Speed");
    this.button = document.getElementById(this.ingredient + "Button");
    if (this.unlock) {
      this.speedDocument.textContent = this.speedOfDelivery.toString(10) + "%";
      this.button.textContent = this.priceUpgrade.toString(10) + "$";
      for (var i = 0; i < this.nbMax; i++) {
        this.add();
      }
      this.startLoop();
    } else {
      this.document.style.backgroundColor = "grey";
      this.button.style.pointerEvents = "none";
      this.button.style.backgroundColor = "rgb(88,88,88)";
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

  async startLoop() {
    while (this.isReserveFilling) {
      await this.sleep(this.speedOfDelivery);
      this.add();
    }
  }
};
