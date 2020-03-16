//list containing the reserves
var foodList = [];

//every information about the food
var ingredientChart = {
  bredTop: { unlock: true, nb: 17, nbElement: 17, price: 1, initPrice: 20, initSpeed: 16000 },
  meat: { unlock: true, nb: 17, nbElement: 17, price: 1, initPrice: 110, initSpeed: 15000 },
  ketchup: {
    unlock: true,
    nb: 17,
    nbElement: 17,
    price: 1,
    initPrice: 120,
    initSpeed: 30000
  },
  salad: {
    unlock: true, nb: 17,
    nbElement: 17, price: 2, initPrice: 130, initSpeed: 20000
  },
  cheese: {
    unlock: true, nb: 17,
    nbElement: 17, price: 3, initPrice: 140, initSpeed: 21000
  },
  pickle: {
    unlock: false,
    nb: 17,
    nbElement: 17,
    price: 4,
    initPrice: 150,
    initSpeed: 10000
  },
  tomato: {
    unlock: false,
    nb: 17,
    nbElement: 17,
    price: 5,
    initPrice: 160,
    initSpeed: 10000
  },
  beacon: {
    unlock: false,
    nb: 17,
    nbElement: 17,
    price: 6,
    initPrice: 170,
    initSpeed: 10000
  },
  bredTopBlack: {
    unlock: false,
    nb: 17,
    nbElement: 17,
    price: 7,
    initPrice: 180,
    initSpeed: 10000
  },
  egg: {
    unlock: false, nb: 17,
    nbElement: 17, price: 8, initPrice: 190, initSpeed: 100000
  }
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
  constructor(ingredient, unlock, speed, document, nbmax, initPrice, numberElement) {
    this.speedOfDelivery = speed;
    this.unlock = unlock;
    this.ingredient = ingredient;
    this.document = document;
    this.listElement = [];
    this.nbElement = 0;
    this.initNumberElement = numberElement;
    this.nbMax = nbmax;
    this.priceUpgrade = initPrice;
    this.isReserveFilling = true;
    this.speedDocument = null;
    this.button = null;
    this.ketchupDiv = null;
    this.toolTip = null;
    this.initValues = true;

    console.warn(this.ingredient, numberElement)

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
      this.speedOfDelivery = this.getNewSPeed(this.speedOfDelivery);
      ingredientChart[this.ingredient].initSpeed = this.speedOfDelivery;
      this.priceUpgrade = this.getNewPrice(this.priceUpgrade)
      ingredientChart[this.ingredient].initPrice = this.priceUpgrade;
      this.speedDocument.textContent =
        this.roundValue(this.speedOfDelivery / 1000, 5).toString(10) + " sec";
      this.button.textContent = this.priceUpgrade.toString(10) + "$";
      updateScore();
    }
    this.updateTootTip();
  }

  //getPrice
  getNewPrice(oldPrice) {
    return this.roundValue(oldPrice * 1.10);
  }

  getNewSPeed(oldSpeed) {
    return this.roundValue(oldSpeed * 0.90);
  }

  //unlocked the reserve
  unlockReserve() {
    this.document.style.backgroundColor = "rgb(238, 237, 237)";
    this.button.style.pointerEvents = "auto";
    this.button.style.backgroundColor = "rgb(238, 237, 237)";

    //display the speed of delivery
    this.speedDocument.textContent =
      (this.speedOfDelivery / 1000).toString(10) + " sec";
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

    this.initValues = false;
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

  updateTootTip() {
    this.toolTip.childNodes[1].textContent = '1 every ' + this.roundValue(this.speedOfDelivery / 1000, 0) + " secondes";
    this.toolTip.childNodes[7].textContent = '1 every ' + this.roundValue(this.getNewSPeed(this.speedOfDelivery) / 1000, 0) + " secondes";
  }

  //initialize the reserve
  init() {
    this.speedDocument = document.getElementById(this.ingredient + "Speed");
    this.button = document.getElementById(this.ingredient + "Button");
    this.toolTip = document.getElementById(this.ingredient + "ToolTip");
    this.reservePanel = document.getElementById(this.ingredient);

    //listen for click on the upgrade button
    this.button.addEventListener("click", () => {
      this.upgrade();
    });

    this.reservePanel.addEventListener('mouseover', () => {
      if (this.unlock) {
        this.toolTip.style.visibility = 'visible';
      }

    })

    this.reservePanel.addEventListener('mouseleave', () => {
      if (this.unlock) {
        this.toolTip.style.visibility = 'hidden';
      }
    })

    this.updateTootTip();

    //if the reserve start unlocked
    if (this.unlock) {
      if (this.ingredient == "ketchup") {
        this.ketchupDiv = document.createElement("div");
        this.document.appendChild(this.ketchupDiv);
        this.ketchupDiv.style.width = "100%";
        this.ketchupDiv.style.backgroundColor = "red";
        this.ketchupDiv.style.borderRadius = "8px";
      }
      //display the speed of delivery
      this.speedDocument.textContent =
        this.roundValue(this.speedOfDelivery / 1000, 5).toString(10) + " sec";
      //display the price of the upgrade
      this.button.textContent = this.priceUpgrade.toString(10) + "$";

      this.checkMoneyButton();

      //fill the associated reserve
      for (var i = 0; i < this.initNumberElement; i++) {
        this.add();
      }
      //start the regular delivery
      this.startLoop();

      this.initValues = false;
    } else {
      //grey everything out
      this.document.style.backgroundColor = "grey";
      this.button.style.pointerEvents = "none";
      this.button.style.backgroundColor = "rgb(88,88,88)";
    }

  }

  //remove an ingredient
  remove() {
    if (this.listElement.length > 0 || this.ingredient == "ketchup") {
      if (this.ingredient == "ketchup") {
        this.ketchupDiv.style.height =
          (100 / this.nbMax) * (this.nbElement - 1).toString(10) + "%";
        this.ketchupDiv.style.borderRadius = "0px";
        this.ketchupDiv.style.borderBottomLeftRadius = "8px";
        this.ketchupDiv.style.borderBottomRightRadius = "8px";
      } else {
        var ingredient = this.listElement.pop();
        ingredient.parentNode.removeChild(ingredient);
      }
      this.nbElement--;
      if (!this.initValues) {
        ingredientChart[this.ingredient].nbElement -= 1;
      }
    }
  }

  //add an ingredient
  add() {
    if (this.nbElement < this.nbMax) {
      if (this.ingredient == "ketchup") {
        if (this.nbElement == this.nbMax - 1) {
          this.ketchupDiv.style.borderRadius = "8px";
        } else {
          this.ketchupDiv.style.borderRadius = "0px";
          this.ketchupDiv.style.borderBottomLeftRadius = "8px";
          this.ketchupDiv.style.borderBottomRightRadius = "8px";
        }
        this.ketchupDiv.style.height =
          Math.round((100 / this.nbMax) * (this.nbElement + 1)).toString(10) +
          "%";
      } else {
        var imageIngredient = document.createElement("img");
        imageIngredient.src =
          "ressources/ingredients/" + this.ingredient + ".png";
        imageIngredient.style.height = (100 / this.nbMax).toString(10) + "%";
        imageIngredient.classList.add("foodElement");
        this.document.appendChild(imageIngredient);
        this.listElement.push(imageIngredient);
      }
      this.nbElement++;
      if (!this.initValues) {
        ingredientChart[this.ingredient].nbElement += 1;
      }
    }
    if (burger.pending) {
      burger.prepare(command);
    }
  }

  //round
  roundValue(value, nb = 0) {
    return Math.round(value * Math.pow(10, nb)) / Math.pow(10, nb);
  }

  //loop in charge on delivery
  async startLoop() {
    while (this.isReserveFilling) {
      await this.sleep();
      this.add();
    }
  }
};
