var chefs = {
  chef0: {
    min: 1,
    max: 2,
    nbUnlocked: 5,
    speed: 40,
    unlocked: true,
    price: 10,
    ingredient: "",
    upgrade1: 20,
    upgrade2: 30,
    upgrade3: 40
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
    upgrade3: 60
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
    upgrade3: 90
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
    upgrade3: 120
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
    upgrade3: 150
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
    upgrade3: 180
  }
};

currentChef = 0;

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
    this.upgrade3 = upgrade3;

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
      money-=chefs[this.id]["upgrade" + doc.id];
      doc.children[1].src = "ressources/chefs/upgrade/spatula.png";

      switch (doc.children[0].id) {
        case "1":
          this.upgrade1 = true;
          console.log("chef" + this.id.toString(10) + " : upgrade1");
        case "2":
          console.log("chef" + this.id.toString(10) + " : upgrade2");
          this.upgrade2 = true;
        case "3":
          console.log("chef" + this.id.toString(10) + " : upgrade3");
          this.upgrade3 = true;
      }
      doc.style.justifyContent = "center";
      doc.removeChild(doc.children[0]);
      updateScore();
    }
  }

    //color of button with out enough gold to buy
  checkMoneyButton() {
    
    if (!this.unlocked) {
      console.log(this.id,"up");
      if (money < this.price && this.buttonPrice) {
        this.buttonPrice.style.backgroundColor = "rgb(150,150,150)";
        this.buttonPrice.style.pointerEvents = "none";
      } else {
        this.buttonPrice.style.backgroundColor = "rgb(250,250,250)";
        this.buttonPrice.style.pointerEvents = "auto";
      }
    }
    else{
      console.log(this.id,"down");
      for(var upgradeBtn of this.upgradeList){
        if(upgradeBtn.parentNode){
          var id = upgradeBtn.parentNode.id;
          var unlockState = false;
          switch(id){
            case "1":
              unlockState = this.upgrade1;
            case "2":
              unlockState = this.upgrade2;
            case "3":
              unlockState = this.upgrade3;
          }
          if (!unlockState) {
            if (money < chefs[this.id]["upgrade" + id]) {
              
              upgradeBtn.style.backgroundColor = "rgb(150,150,150)";
              upgradeBtn.style.pointerEvents = "none";
            } else {
              upgradeBtn.style.backgroundColor = "rgb(250,250,250)";
              upgradeBtn.style.pointerEvents = "auto";
            }
          }
        }

      }
    }
  }

  buy() {
    if (!this.unlocked && money >= this.price) {
      money -= this.price;
      this.unlocked = true;
      for(var chef of chefList){
        chef.document.children[0].style.backgroundColor = "grey";
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
      burger.changeSpeed();
    }

  }


  initUpgrade(upgrade) {
    upgrade.children[0].textContent = chefs[this.id]["upgrade" + upgrade.id];
    upgrade.children[0].addEventListener("click", () => {
      this.upgradeChef(upgrade);
    });
  }

  init() {
    this.document.children[0].children[3].src = this.imageSrc;

    this.upgradeList = [];

    for (var upgrade of this.document.children[0].children) {
      if (upgrade.id == "1" || upgrade.id == "2" || upgrade.id == "3") {
        this.upgradeList.push(upgrade.children[0]);
        var imageUpgrade = document.createElement("img");
        imageUpgrade.classList.add("upgradeImage");
        imageUpgrade.src = "ressources/chefs/upgrade/spatulaGrey.png";
        upgrade.appendChild(imageUpgrade);
        this.initUpgrade(upgrade);
      }
    }

    if (!this.unlocked) {
      this.buttonPrice= this.document.children[1];
      this.document.children[0].style.height = "0px";
      this.document.children[0].style.visibility = "hidden";
      this.document.children[1].textContent = this.price.toString(10) + "$";
      this.document.children[1].addEventListener("click", () => {
        this.buy();
      });
    } else {
      this.document.removeChild(this.document.children[1]);
      this.document.children[0].style.backgroundColor = "white";
    }
  }
};
