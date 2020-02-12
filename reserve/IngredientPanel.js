//list containing the reserves
var foodList = [];

//every information about the food
var ingredientChart = {
  bredTop: { unlock: true, nb: 17, price: 1, initPrice: 20, initSpeed: 16000 },
  meat: { unlock: true, nb: 17, price: 1, initPrice: 110, initSpeed: 15000 },
  ketchup: {
    unlock: true,
    nb: 10,
    price: 0.6,
    initPrice: 120,
    initSpeed: 30000
  },
  salad: { unlock: true, nb: 17, price: 0.4, initPrice: 130, initSpeed: 20000 },
  cheese: { unlock: true, nb: 17, price: 1, initPrice: 140, initSpeed: 21000 },
  pickle: {
    unlock: false,
    nb: 10,
    price: 2.3,
    initPrice: 150,
    initSpeed: 10000
  },
  tomato: {
    unlock: false,
    nb: 10,
    price: 1.2,
    initPrice: 160,
    initSpeed: 10000
  },
  beacon: {
    unlock: false,
    nb: 10,
    price: 3,
    initPrice: 170,
    initSpeed: 10000
  },
  bredTopBlack: {
    unlock: false,
    nb: 10,
    price: 4,
    initPrice: 180,
    initSpeed: 10000
  },
  egg: { unlock: false, nb: 17, price: 2, initPrice: 190, initSpeed: 100000 }
};

//ingredient that can be picked at random with out neading to be in a specific position
var regularIngredient = [
  "meat",
  "salad",
  "pickle",
  "tomato",
  "beacon",
  "egg",
  "cheese"
];

//class to manage food reserve
var IngredientPanel = class IngredientPanel {
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

    this.init();
  }

  //sleep method even if it's bad
  sleepM(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //sleep method even if it's bad
  async sleep() {
    for (var i = 0; i < this.speedOfDelivery; i += 10) {
      await this.sleepM(10);
    }
    return;
  }

  //upgrade the speed of delivery
  upgrade() {
    if (money > this.priceUpgrade && this.unlock) {
      money -= this.priceUpgrade;
      updateScore();
      this.speedOfDelivery *= 0.5;
      this.priceUpgrade += 10;
      this.speedDocument.textContent =
        (this.speedOfDelivery / 1000).toString(10) + "/s";
      this.button.textContent = this.priceUpgrade.toString(10) + "$";
    }
  }

  //unlocked the reserve
  unlockReserve() {
    this.document.style.backgroundColor = "rgb(238, 237, 237)";
    this.button.style.pointerEvents = "auto";
    this.button.style.backgroundColor = "rgb(238, 237, 237)";

    //display the speed of delivery
    this.speedDocument.textContent =
      (this.speedOfDelivery / 1000).toString(10) + "sec";
    //display the price of the upgrade
    this.button.textContent = this.priceUpgrade.toString(10) + "$";

    this.checkMoneyButton();

    //fill the associated reserve
    for (var i = 0; i < this.nbMax; i++) {
      this.add();
    }
    //start the regular delivery
    this.startLoop();

    this.unlock = true;

    ingredientChart[this.ingredient].unlock = true;
  }

  //color of button with out enough gold to buy
  checkMoneyButton() {
    if (this.unlock) {
      if (money < this.priceUpgrade) {
        this.button.style.backgroundColor = "rgb(150,150,150)";
        this.button.style.pointerEvents = "none";
      } else {
        this.button.style.backgroundColor = "rgb(250,250,250)";
        this.button.style.pointerEvents = "auto";
      }
    }
  }

  //initialize the reserve
  init() {
    this.speedDocument = document.getElementById(this.ingredient + "Speed");
    this.button = document.getElementById(this.ingredient + "Button");

    //listen for click on the upgrade button
    this.button.addEventListener("click", () => {
      this.upgrade();
    });

    //if the reserve start unlocked
    if (this.unlock) {
      //display the speed of delivery
      this.speedDocument.textContent =
        (this.speedOfDelivery / 1000).toString(10) + "sec";
      //display the price of the upgrade
      this.button.textContent = this.priceUpgrade.toString(10) + "$";

      this.checkMoneyButton();

      //fill the associated reserve
      for (var i = 0; i < this.nbMax; i++) {
        this.add();
      }
      //start the regular delivery
      this.startLoop();
    } else {
      //grey everything out
      this.document.style.backgroundColor = "grey";
      this.button.style.pointerEvents = "none";
      this.button.style.backgroundColor = "rgb(88,88,88)";
    }
  }

  //remove an ingredient
  remove() {
    if (this.listElement.length > 0) {
      var ingredient = this.listElement.pop();
      ingredient.parentNode.removeChild(ingredient);
      this.nbElement--;
    }
  }

  //add an ingredient
  add() {
    if (this.nbElement < this.nbMax) {
      var imageIngredient = document.createElement("img");
      imageIngredient.src =
        "ressources/ingredients/" + this.ingredient + ".png";
      imageIngredient.style.height = (100 / this.nbMax).toString(10) + "%";
      imageIngredient.classList.add("foodElement");
      this.document.appendChild(imageIngredient);
      this.listElement.push(imageIngredient);
      this.nbElement++;
    }
    if (burger.pending) {
      burger.prepare(command);
    }
  }

  //loop in charge on delivery
  async startLoop() {
    while (this.isReserveFilling) {
      await this.sleep();
      this.add();
    }
  }
};
