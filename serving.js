var Burger = class Burger {
  constructor() {
    this.servingDiv = document.getElementById("serving");
    this.burgerElement = [];
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
      pickle: { width: "50%", left: "25%", offset: 0 },
      tomato: { width: "45%", left: "25%", offset: 0 },
      salad: { width: "50%", left: "25%", offset: 0 },
      plate: { width: "50%", left: "23%", offset: 30 }
    };
    this.sizeBurger = 30;
    this.inPreparation = false;
    this.speedIngredient = 50;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async addIngredient(document, interval, margin) {
    for (var m = 500; m > margin; m -= this.speedIngredient) {
      await this.moveIngredient(m, document, interval);
    }
    await this.moveIngredient(margin, document, interval);
  }

  async moveIngredient(margin, document, timing) {
    await this.sleep(timing);
    document.style.paddingBottom = margin.toString(10) + "px";
  }

  async prepare(listElement, speed) {
    if (!this.inPreparation) {
      this.inPreparation = true;
      var tmp = 0;

      for (var ingredient of listElement) {
        var imageIngredient = document.createElement("img");
        this.servingDiv.appendChild(imageIngredient);
        imageIngredient.style.position = "absolute";
        imageIngredient.style.width = this.positionInfo[ingredient].width;
        imageIngredient.style.left = this.positionInfo[ingredient].left;
        imageIngredient.style.bottom = "0px";
        imageIngredient.src = "./ressources/ingredients/" + ingredient + ".gif";
        await this.addIngredient(
          imageIngredient,
          speed,
          this.positionInfo[ingredient].offset + tmp * this.sizeBurger
        );
        this.burgerElement.push(imageIngredient);
        tmp++;
      }
      await burger.pushPlate(speed);
      this.inPreparation = false;
    }
  }

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

    for (var i = 0; i < (500/this.speedIngredient); i++) {
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

  init() {
    var order = document.getElementById("order");
    order.addEventListener("click", generateCommand);

    var emptyDiv = document.createElement("div");
    this.servingDiv.appendChild(emptyDiv);
    emptyDiv.position = "relative";
  }
};
