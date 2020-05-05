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
      console.log('doc',doc)
      switch (doc.id) {
        case "1":
          this.upgrade1 = false;
          break
        case "2":
          this.upgrade2 = false;
          switch (this.id) {
            case "chef0":
              upgradeDoublePrice();
              break;
            case "chef1":
              alwaysKetchup();     
              break;
            case "chef2":
              upgradeUpgradeLowest();            
              break;
            case "chef3":
              upgradeBiggerBurger();
              break;
            case 'chef4':
              multiplyPriceBurger();
              break;
            case "chef5":
              upgradeTowerBurger();
              break;
          }
          break;
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
          var id = upgradeBtn.id;
          var locked = false;
          switch (id) {
            case "2":
              locked = this.upgrade2;
              break;
            case "1":
              locked = this.upgrade1;
              break;
          }
          console.log('fggf',this.id,locked , this.upgrade1,this.upgrade2)
          if (locked ) {
            if (money < chefs[this.id]["upgrade" + id] || parseInt(this.id.substring(4)) !== currentChef) {
              upgradeBtn.children[0].style.backgroundColor = "#10222C";
              upgradeBtn.children[0].style.pointerEvents = "none";
              upgradeBtn.children[0].style.boxShadow = 'none';
            } else {
              upgradeBtn.children[0].style.backgroundColor = "#007d96";
              upgradeBtn.children[0].style.pointerEvents = "auto";
              upgradeBtn.children[0].style.boxShadow = '6px 6px 0px 1px #142d3a';
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
      for(var up of chefList[parseInt(this.id.substring(4)) - 1].upgradeList){
        console.log('gfgf')
        console.log('hey',chefList[parseInt(this.id.substring(4)) - 1]['upgrade'+up.id])
        if(chefList[parseInt(this.id.substring(4)) - 1]['upgrade'+up.id] ){
          up.style.backgroundColor = '#142d3a';
        }
        
      }

      var chefImage = document.getElementById(this.id + "Img");
      chefImage.src = './ressources/chefs/' + this.id + '.png';

      burger.changeSpeed();

      updateScore();
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

    upgrade.addEventListener('mouseover', () => {
      hoverBool = true;
      if (this.unlocked) {
        setTimeout(() => {
          if (hoverBool) {
            if (upgrade.id === "1") {
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

    upgrade.addEventListener('mouseleave', () => {
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
    this.upgradeList = [];

    //this.document.children[0].children[0].style.backgroundColor = "blue";

    for (var upgrade of this.document.children[0].children) {
      if (upgrade.id == "1" || upgrade.id == "2") {
        //upgrade.style.backgroundColor = "blue";
        this.upgradeList.push(upgrade);
        var imageUpgrade = document.createElement("img");
        imageUpgrade.classList.add("upgradeImage");
        imageUpgrade.src = "ressources/chefs/upgrade/spatulaGrey.png";
        if(parseInt(this.id.substring(4)) < currentChef && chefs[this.id]["upgrade" + upgrade.id + "locked"]){
          console.log(upgrade.id , this.id)
          upgrade.style.backgroundColor = '#142d3a';
        }
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
      console.warn(parseInt(this.id.substring(4)))
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
