var chefs = {
  chef0: {
    min: 1,
    max: 2,
    nbUnlocked: 5,
    speed: 20,
    unlocked: true,
    price: 10,
    ingredient: "",
    upgrade1: 20,
    upgrade2: 30,
    upgrade1locked: true,
    upgrade2locked: true,
  },
  chef1: {
    min: 1,
    max: 3,
    nbUnlocked: 6,
    speed: 20,
    unlocked: false,
    price: 20,
    ingredient: "tomato",
    upgrade1: 40,
    upgrade2: 50,
    upgrade1locked: true,
    upgrade2locked: true,
  },
  chef2: {
    min: 2,
    max: 4,
    nbUnlocked: 7,
    speed: 10,
    unlocked: false,
    price: 30,
    ingredient: "pickle",
    upgrade1: 70,
    upgrade2: 80,
    upgrade1locked: true,
    upgrade2locked: true,
  },
  chef3: {
    min: 3,
    max: 5,
    nbUnlocked: 8,
    speed: 5,
    unlocked: false,
    price: 40,
    ingredient: "beacon",
    upgrade1: 100,
    upgrade2: 110,
    upgrade1locked: true,
    upgrade2locked: true,
  },
  chef4: {
    min: 4,
    max: 6,
    nbUnlocked: 9,
    speed: 3,
    unlocked: false,
    price: 50,
    ingredient: "egg",
    upgrade1: 130,
    upgrade2: 140,
    upgrade1locked: true,
    upgrade2locked: true,
  },
  chef5: {
    min: 5,
    max: 7,
    nbUnlocked: 10,
    speed: 1,
    unlocked: false,
    price: 60,
    ingredient: "bredTopBlack",
    upgrade1: 160,
    upgrade2: 170,
    upgrade1locked: true,
    upgrade2locked: true,
  }
};

var currentChef = 0;

var Chef = class Chef {
  constructor(
    document,
    upgrade1,
    upgrade2,
    upgrade3,
    imageSrc,
    price,
    speed,
    unlocked,
    id
  ) {
    this.upgrade1 = upgrade1;
    this.upgrade2 = upgrade2;

    this.imageSrc = imageSrc;
    this.price = price;
    this.speed = speed;
    this.unlocked = unlocked;
    this.document = document;
    this.buttonPrice = null;

    this.id = id;

    this.upgradeList = [];

    this.init();
  }

  upgradeChef(doc) {
    if (money >= chefs[this.id]["upgrade" + doc.id]) {
      money -= chefs[this.id]["upgrade" + doc.id];
      chefs[this.id]["upgrade" + doc.id + "locked"] = false;
      doc.children[1].src = "ressources/chefs/upgrade/spatula.png";
      this.toolTipUpgrade.style.visibility = 'hidden';

      switch (doc.children[0].id) {
        case "1":
          this.upgrade1 = true;
          console.log("chef" + this.id.toString(10) + " : upgrade1");
        case "2":
          console.log("chef" + this.id.toString(10) + " : upgrade2");
          this.upgrade2 = true;
      }
      doc.style.justifyContent = "center";
      doc.removeChild(doc.children[0]);
      updateScore();
    }
  }

  //color of button with out enough gold to buy
  checkMoneyButton() {
    if (!this.unlocked) {
      if (money < this.price && this.buttonPrice) {
        this.buttonPrice.style.backgroundColor = "#10222C";
        this.buttonPrice.style.pointerEvents = "none";
        this.buttonPrice.style.boxShadow = 'none';
      } else {
        this.buttonPrice.style.backgroundColor = "#007d96";
        this.buttonPrice.style.pointerEvents = "auto";
        this.buttonPrice.style.boxShadow = '6px 6px 0px 1px #142d3a';
      }
    } else {
      for (var upgradeBtn of this.upgradeList) {
        if (upgradeBtn.parentNode) {
          var id = upgradeBtn.parentNode.id;
          var unlockState = false;
          switch (id) {
            case "1":
              unlockState = this.upgrade1;
            case "2":
              unlockState = this.upgrade2;
          }
          if (!unlockState) {
            if (money < chefs[this.id]["upgrade" + id]) {
              upgradeBtn.style.backgroundColor = "#10222C";
              upgradeBtn.style.pointerEvents = "none";
              upgradeBtn.style.boxShadow = 'none';
            } else {
              upgradeBtn.style.backgroundColor = "#007d96";
              upgradeBtn.style.pointerEvents = "auto";
              upgradeBtn.style.boxShadow = '6px 6px 0px 1px #142d3a';
            }
          }
        }
      }
    }
  }

  buy() {
    if (!this.unlocked && money >= this.price && parseInt(this.id.substring(4)) == currentChef + 1) {
      money -= this.price;
      this.unlocked = true;
      for (var chef of chefList) {
        chef.document.children[0].style.backgroundColor = "#10222C";
        var chefImage = document.getElementById(chef.id + "Img");
        chefImage.src = './ressources/chefs/' + chef.id + "Dead" + '.png';
      }
      this.document.children[0].style.backgroundColor = "white";
      this.document.children[0].style.height = "100%";
      this.document.children[0].style.visibility = "visible";
      updateScore();
      currentChef = parseInt(this.id.substring(4));
      chefs[this.id].unlocked = true;
      this.document.removeChild(this.document.children[1]);
      for (var reserve of foodList) {
        if (reserve.ingredient === chefs[this.id].ingredient) {
          reserve.unlockReserve();
        }
      }

      var chefImage = document.getElementById(this.id + "Img");
      chefImage.src = './ressources/chefs/' + this.id + '.png';

      burger.changeSpeed();
    }
  }

  initUpgrade(upgrade) {
    upgrade.children[0].textContent = chefs[this.id]["upgrade" + upgrade.id] + "$";
    upgrade.children[0].addEventListener("click", () => {
      this.upgradeChef(upgrade);
    });

    var hoverBool = false;

    document.getElementById(this.id + "upgrade" + "1").style.display = "none";
    document.getElementById(this.id + "upgrade" + "2").style.display = "none";

    upgrade.children[0].addEventListener('mouseover', () => {
      hoverBool = true;
      if (this.unlocked) {
        setTimeout(() => {
          if (hoverBool && chefs[this.id]["upgrade" + upgrade.id + "locked"]) {

            console.warn(upgrade.id)
            console.warn(this.id + "upgrade" + "1")
            if (upgrade.id === "1") {
              console.warn("1")
              document.getElementById(this.id + "upgrade" + "1").style.display = "block";
              document.getElementById(this.id + "upgrade" + "2").style.display = "none";
            }
            else {
              document.getElementById(this.id + "upgrade" + "2").style.display = "block";
              document.getElementById(this.id + "upgrade" + "1").style.display = "none";
            }
            this.toolTipUpgrade.style.visibility = 'visible';
          }
        }, 500)
      }
    })

    upgrade.children[0].addEventListener('mouseleave', () => {
      hoverBool = false;
      if (this.unlocked) {
        this.toolTipUpgrade.style.visibility = 'hidden';
        document.getElementById(this.id + "upgrade" + "1").style.display = "none";
        document.getElementById(this.id + "upgrade" + "2").style.display = "none";
      }
    })
  }

  init() {
    this.document.children[0].children[3].src = this.imageSrc;
    this.toolTip = document.getElementById(this.id + "InfoBubble");
    this.toolTipUpgrade = document.getElementById(this.id + "InfoBubbleUpgrade");
    this.chefDiv = document.getElementById(this.id + "Img");
    console.log("test", this.chefDiv)
    this.upgradeList = [];

    for (var upgrade of this.document.children[0].children) {
      if (upgrade.id == "1" || upgrade.id == "2") {
        this.upgradeList.push(upgrade.children[0]);
        var imageUpgrade = document.createElement("img");
        imageUpgrade.classList.add("upgradeImage");
        imageUpgrade.src = "ressources/chefs/upgrade/spatulaGrey.png";
        upgrade.appendChild(imageUpgrade);
        this.initUpgrade(upgrade);
        if (!chefs[this.id]["upgrade" + upgrade.id + "locked"]) {
          upgrade.children[1].src = "ressources/chefs/upgrade/spatula.png";
          upgrade.style.justifyContent = "center";
          upgrade.removeChild(upgrade.children[0]);
        }
      }
    }

    var hoverBool = false;

    this.chefDiv.addEventListener('mouseover', () => {
      hoverBool = true;
      if (this.unlocked) {
        setTimeout(() => {
          if (hoverBool) {
            this.toolTip.style.visibility = 'visible';
          }
        }, 500)
      }
    })

    this.chefDiv.addEventListener('mouseleave', () => {
      hoverBool = false;
      if (this.unlocked) {
        this.toolTip.style.visibility = 'hidden';
      }
    })

    if (!this.unlocked) {
      this.buttonPrice = this.document.children[1];
      this.document.children[0].style.height = "0px";
      this.document.children[0].style.visibility = "hidden";
      this.document.children[1].textContent = this.price.toString(10) + "$";
      this.document.children[1].addEventListener("click", () => {
        this.buy();
      });
    } else {
      this.document.removeChild(this.document.children[1]);
      console.warn(parseInt(this.id.substring(4)), currentChef)
      if (parseInt(this.id.substring(4)) === currentChef) {
        this.document.children[0].style.backgroundColor = "white";
      }
      else {
        var chefImage = document.getElementById(this.id + "Img");
        this.document.children[0].style.backgroundColor = '#10222C';
        chefImage.src = './ressources/chefs/' + this.id + "Dead" + '.png';
      }

    }
  }
};
