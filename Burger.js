var pending = false;

//is a burger beeing prepared
var inPreparation = false;

var Burger = class Burger {
  constructor() {
    // get div of the burger
    this.servingDiv = document.getElementById("serving");

    //list of burger image
    this.burgerElement = [];

    //setting for the different burger image
    this.positionInfo = {
      bredTop: { width: "49%", left: "23%", offset: 5 },
      bredBottom: { width: "48%", left: "23%", offset: 6 },
      bredTopBlack: { width: "49%", left: "23%", offset: 5 },
      bredBottomBlack: { width: "48%", left: "23%", offset: 6 },
      beacon: { width: "45%", left: "25%", offset: 5 },
      cheese: { width: "45%", left: "24%", offset: 2 },
      egg: { width: "45%", left: "24%", offset: 2 },
      ketchup: { width: "44%", left: "25%", offset: 2 },
      meat: { width: "45%", left: "24.5%", offset: 6 },
      pickle: { width: "40%", left: "26%", offset: 2 },
      tomato: { width: "43%", left: "26%", offset: 2 },
      salad: { width: "45%", left: "25%", offset: 2 },
      plate: { width: "55%", left: "20%", offset: 5 }
    };

    //vertical pixel movement at each turn
    this.speedIngredient = 40;

    //image of the chef
    this.chefImage = null;

    //init the burger and chef image
    this.init();

    this.speed = chefs["chef" + currentChef.toString(10)].speed;

    this.speedIngredientPourcent = Math.floor(-0.24 * this.speed + 10);
  }

  changeSpeed() {
    this.speed = chefs["chef" + currentChef.toString(10)].speed;
    this.speedIngredientPourcent = Math.floor(-0.24 * this.speed + 10);
  }

  //sleep fonction
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //add ingredient and moving it down
  async addIngredient(document, margin) {
    for (var m = 150; m > margin; m -= this.speedIngredientPourcent) {
      await this.moveIngredient(m, document, this.speed);
    }
    await this.moveIngredient(margin, document, this.speed);
  }

  //moving the image of the ingredient
  async moveIngredient(margin, document, timing) {
    await this.sleep(timing);
    document.style.paddingBottom = margin.toString(10) + "%";
  }

  //prepare the burger
  async prepare(listElement) {
    //check if the reserve can prepare this generated burger
    if (pending == false) {
      displayOrder(listElement);
    }
    if (!checkReserve(listElement)) {
      pending = true;

      return;
    }
    pending = false;
    //if a bruger is already being prepared, it's prevent from preparing one again
    if (!inPreparation) {
      inPreparation = true;
      var generalOffset = 25;

      //put each ingredient on the plate
      for (var ingredient of listElement) {
        await this.sleep(this.speed * 30);
        removeReserve(ingredient);

        //create image
        var imageIngredient = document.createElement("img");
        this.servingDiv.appendChild(imageIngredient);

        imageIngredient.style.position = "absolute";
        imageIngredient.style.width = this.positionInfo[ingredient].width;
        imageIngredient.style.left = this.positionInfo[ingredient].left;
        imageIngredient.style.bottom = "0px";
        imageIngredient.style.visibility = "visible";
        imageIngredient.style.paddingBottom = "150%";
        imageIngredient.style.zIndex = "10";
        imageIngredient.src = "./ressources/ingredients/" + ingredient + ".png";

        await this.addIngredient(imageIngredient, generalOffset);

        generalOffset += this.positionInfo[ingredient].offset;

        this.burgerElement.push(imageIngredient);
      }

      await this.sleep(this.speed * 20);

      //push the burger out
      await burger.pushPlate(this.speed);

      money += this.getBurgerPrice(listElement);



      inPreparation = false;

      //update displayed score
      updateScore();

      //make another burger
      makeBurger();
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
  }
};
