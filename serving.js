var Burger = class Burger {
  constructor() {
    // get div of the burger
    this.servingDiv = document.getElementById("serving");

    //list of burger image
    this.burgerElement = [];

    //setting for the different burger image
    this.positionInfo = {
      bredTop: { width: "53%", left: "22%", offset: 0 },
      bredBottom: { width: "47%", left: "23%", offset: 0 },
      bredTopBlack: { width: "50%", left: "25%", offset: 0 },
      bredBottomBlack: { width: "50%", left: "25%", offset: 0 },
      beacon: { width: "50%", left: "25%", offset: 0 },
      cheese: { width: "50%", left: "23%", offset: -20 },
      egg: { width: "50%", left: "23%", offset: 0 },
      ketchup: { width: "48%", left: "24%", offset: -30 },
      meat: { width: "55%", left: "23%", offset: -40 },
      pickle: { width: "45%", left: "25%", offset: 0 },
      tomato: { width: "45%", left: "25%", offset: 0 },
      salad: { width: "50%", left: "25%", offset: 0 },
      plate: { width: "50%", left: "23%", offset: 30 }
    };

    // timing between each turn
    this.ySpeed = 30;

    //is a burger beeing prepared
    this.inPreparation = false;

    //vertical pixel movement at each turn
    this.speedIngredient = 40;

    this.pending = false;

    this.chefImage;
  }

  //sleep fonction
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //add ingredient and moving it down
  async addIngredient(document, interval, margin) {
    for (var m = 500; m > margin; m -= this.speedIngredient) {
      await this.moveIngredient(m, document, interval);
    }
    await this.moveIngredient(margin, document, interval);
  }

  //moving the image of the ingredient
  async moveIngredient(margin, document, timing) {
    await this.sleep(timing);
    document.style.paddingBottom = margin.toString(10) + "px";
  }

  //prepare the burger
  async prepare(listElement, speed) {
    this.pending = false;

    //check if the reserve can prepare this generated burger
    if (!checkReserve(listElement)) {
      this.pending = true;
      return;
    }

    //if a bruger is already being prepared, it's prevent from preparing one again
    if (!this.inPreparation) {
      this.inPreparation = true;
      var tmp = 0;

      //put each ingredient on the plate
      for (var ingredient of listElement) {
        await this.sleep(speed * 30);
        removeReserve(ingredient);

        //create image
        var imageIngredient = document.createElement("img");
        this.servingDiv.appendChild(imageIngredient);

        imageIngredient.style.position = "absolute";
        imageIngredient.style.width = this.positionInfo[ingredient].width;
        imageIngredient.style.left = this.positionInfo[ingredient].left;
        imageIngredient.style.bottom = "0px";
        imageIngredient.style.visibility = "visible";
        imageIngredient.style.paddingBottom = "600px";
        imageIngredient.style.zIndex = "10";
        imageIngredient.src = "./ressources/ingredients/" + ingredient + ".gif";

        await this.addIngredient(
          imageIngredient,
          speed,
          this.positionInfo[ingredient].offset + tmp * this.ySpeed
        );
        this.burgerElement.push(imageIngredient);
        tmp++;
      }

      //push the burger out
      await burger.pushPlate(speed);

      money += this.getBurgerPrice(listElement);

      //update displayed score
      updateScore();

      this.inPreparation = false;
    }
  }

  //return burger price
  getBurgerPrice(listElement) {
    var priceBurger = 0.0;

    for (var element of listElement) {
      if (ingredientChart[element]) {
        priceBurger += ingredientChart[element].price;
      }
    }
    return priceBurger;
  }

  //push the plate and everything to the side
  async pushPlate(speed) {
    var pixelArray = [];
    for (var element of this.burgerElement) {
      var marginPixel =
        parseInt(
          element.style.left.substring(0, element.style.left.length - 1)
        ) / 100;
      pixelArray.push(marginPixel * this.servingDiv.clientWidth);
      element.style.left =
        (marginPixel * this.servingDiv.clientWidth).toString(10) + "px";
    }

    for (var i = 0; i < 500 / this.speedIngredient; i++) {
      var tmp = 0;
      await this.sleep(speed);
      for (var element of this.burgerElement) {
        pixelArray[tmp] = pixelArray[tmp] + this.speedIngredient;
        element.style.left = pixelArray[tmp].toString(10) + "px";
        tmp++;
      }
    }

    for (var element of this.burgerElement) {
      element.parentNode.removeChild(element);
    }
    this.burgerElement = [];
  }

  //init the image by putting an empty div and alowing image to be stack on top of another
  init() {
    var emptyDiv = document.createElement("div");
    this.servingDiv.appendChild(emptyDiv);
    emptyDiv.position = "relative";

    this.chefImage = document.createElement("img");
    this.servingDiv.appendChild(this.chefImage);
    this.chefImage.classList.add("servingChef");
    this.chefImage.src = "./ressources/chefs/chef0.png";
  }
};
