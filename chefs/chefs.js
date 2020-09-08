var chefs = {
    chef0: {
        min: 1,
        max: 2,
        nbUnlocked: 5,
        speed: 28,
        unlocked: true,
        price: 0,
        ingredient: "",
        upgrade1: 150,
        upgrade2: 80,
        upgrade1locked: true,
        upgrade2locked: true,
    },
    chef1: {
        min: 1,
        max: 3,
        nbUnlocked: 6,
        speed: 23,
        unlocked: false,
        price: 600,
        ingredient: "tomato",
        upgrade1: 450,
        upgrade2: 400,
        upgrade1locked: true,
        upgrade2locked: true,
    },
    chef2: {
        min: 2,
        max: 4,
        nbUnlocked: 7,
        speed: 16,
        unlocked: false,
        price: 3000,
        ingredient: "pickle",
        upgrade1: 3000,
        upgrade2: 2000,
        upgrade1locked: true,
        upgrade2locked: true,
    },
    chef3: {
        min: 3,
        max: 5,
        nbUnlocked: 8,
        speed: 8,
        unlocked: false,
        price: 9000,
        ingredient: "beacon",
        upgrade1: 6000,
        upgrade2: 7000,
        upgrade1locked: true,
        upgrade2locked: true,
    },
    chef4: {
        min: 4,
        max: 6,
        nbUnlocked: 9,
        speed: 4,
        unlocked: false,
        price: 30000,
        ingredient: "egg",
        upgrade1: 13000,
        upgrade2: 11000,
        upgrade1locked: true,
        upgrade2locked: true,
    },
    chef5: {
        min: 5,
        max: 7,
        nbUnlocked: 10,
        speed: 2,
        unlocked: false,
        price: 80000,
        ingredient: "bredTopBlack",
        upgrade1: 70000,
        upgrade2: 60000,
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
        unlocked,
        id
    ) {
        this.upgrade1 = upgrade1;
        this.upgrade2 = upgrade2;

        this.imageSrc = imageSrc;
        if (price > 80000) {
            this.price = 80000;
        }
        else {
            this.price = price;
        }
        this.unlocked = unlocked;
        this.document = document;
        this.buttonPrice = null;

        this.id = id;

        this.upgradeList = [];

        this.init();
    }

    upgradeChef(doc) {
        if (money >= chefs[this.id]["upgrade" + doc.id]) {
            money -= chefs[this.id]["upgrade" + doc.id]; // update money
            chefs[this.id]["upgrade" + doc.id + "locked"] = false; // Change locked state upgrade
            doc.children[1].src = "ressources/chefs/upgrade/" + this.id + "Upgrade" + doc.id + ".png"; // change spatula image to colored one
            this.toolTipUpgrade.style.visibility = 'hidden'; // hide tooltip when object selected 

            switch (doc.id) { //Which upgrade of the chef has been upgraded
                case "1":
                    this.upgrade1 = false; // Upgrade 1 is not locked anymore
                    speed++;
                    burger.changeSpeed();
                    break
                case "2":
                    this.upgrade2 = false; // Upgrade 2 is not locked anymore
                    switch (this.id) {
                        case "chef0":
                            upgradeDoublePrice(); // Increase price of burger 
                            break;
                        case "chef1":
                            alwaysKetchup(); // There is always ketchup in the burger 
                            break;
                        case "chef2":
                            upgradeUpgradeLowest(); // Tow lowest reserve get upgraded 3 times for 3      
                            break;
                        case "chef3":
                            upgradeBiggerBurger(); // Burger are generally bigger
                            break;
                        case 'chef4':
                            randomMoreExpensiveBurger(); // burger price is increased
                            break;
                        case "chef5":
                            upgradeTowerBurger(); // there is a chance for burger to be very tall 
                            break;
                    }
                    break;
            }

            if (currentChef == 5) {
                var finished = true;
                for (var chef of chefList) {
                    finished = !finished ? finished : !chef.upgrade1;
                    finished = !finished ? finished : !chef.upgrade2;
                }
                if (finished) {

                    var time = this.msToTime(getTimeElapsed());
                    var timeStr = (time[0] != 0) ? ((time[0] + " hour") + ((time[0] > 1) ? "s" : "")) : "";
                    timeStr += (time[1] != 0) ? ((" " + time[1] + " minute") + ((time[1] > 1) ? "s" : "")) : "";
                    timeStr += (time[2] != 0) ? ((" " + time[2] + " seconde") + ((time[2] > 1) ? "s" : "")) : "";
                    document.getElementById('time').textContent = timeStr;
                    document.getElementById('nbBurger').textContent = this.roundValue(nbBurger).toString();
                    document.getElementById('finishMessage').style.display = 'flex';
                }
            }

            doc.style.justifyContent = "center"; // make the image go to teh center of the upgrade
            doc.removeChild(doc.children[0]); // remove the button
            updateScore(); //update the score to save the changes
        }
    }

    msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? 0 + hours : hours;
        minutes = (minutes < 10) ? 0 + minutes : minutes;
        seconds = (seconds < 10) ? 0 + seconds : seconds;

        return [hours, minutes, seconds];
    }


    //round
    roundValue(value, nb = 0) {
        return Math.round(value * Math.pow(10, nb)) / Math.pow(10, nb);
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
            for (var upgradeBtn of this.upgradeList) { // go throught the list of upgrade
                var id = upgradeBtn.id; // get id of upgrade
                var locked = false;
                switch (id) { //check if the current upgrade is locked
                    case "2":
                        locked = this.upgrade2;
                        break;
                    case "1":
                        locked = this.upgrade1;
                        break;
                }
                if (locked) { //if locked, don't update button
                    if (money < chefs[this.id]["upgrade" + id]) { // if upgrade worth more than you have, make the button locked
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
        // if you have enough money and that the chef is the one after to current one 
        if (!this.unlocked && money >= this.price && parseInt(this.id.substring(4)) == currentChef + 1) {
            money -= this.price;
            this.unlocked = true;
            for (var chef of chefList) { //kill current chef
                chef.document.children[0].style.backgroundColor = "#10222C";
                var chefImage = document.getElementById(chef.id + "Img");
                chefImage.src = './ressources/chefs/' + chef.id + "Dead" + '.png';
            }

            this.document.children[0].style.backgroundColor = "#007d96";
            this.document.children[0].style.height = "100%";
            this.document.children[0].style.visibility = "visible";
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
            speed++;
            burger.changeSpeed();
            burger.displayChef();
            updateScore();
        }
    }

    initUpgrade(upgrade) {
        var price = chefs[this.id]["upgrade" + upgrade.id];
        if (price > 3000) {
            price = this.roundValue(price / 1000).toString() + "K$"
        } else {
            price = chefs[this.id]["upgrade" + upgrade.id].toString() + "$";
        }
        upgrade.children[0].textContent = price;
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
                        } else {
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
                imageUpgrade.src = "ressources/chefs/upgrade/" + this.id + "Upgrade" + upgrade.id + "Gray" + ".png";
                upgrade.appendChild(imageUpgrade);
                this.initUpgrade(upgrade);
                if (!chefs[this.id]["upgrade" + upgrade.id + "locked"]) {
                    upgrade.children[1].src = "ressources/chefs/upgrade/" + this.id + "Upgrade" + upgrade.id + ".png";
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
            if (parseInt(this.id.substring(4)) === currentChef) {
                var chefImage = document.getElementById(this.id + "Img");
                chefImage.src = './ressources/chefs/' + this.id + '.png';
                this.document.children[0].style.backgroundColor = "#007d96";
            } else {
                var chefImage = document.getElementById(this.id + "Img");
                this.document.children[0].style.backgroundColor = '#10222C';
                chefImage.src = './ressources/chefs/' + this.id + "Dead" + '.png';
            }

        }
    }
};