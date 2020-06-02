//list containing the reserves
var foodList = [];

//every information about the food
var ingredientChart = {
    bredTop: { unlock: true, nb: 20, nbElement: 2, price: 1, initPrice: 30, initSpeed: 22000 },
    meat: { unlock: true, nb: 20, nbElement: 10, price: 1, initPrice: 40, initSpeed: 18000 },
    ketchup: {
        unlock: true,
        nb: 20,
        nbElement: 10,
        price: 3,
        initPrice: 40,
        initSpeed: 28000
    },
    salad: {
        unlock: true,
        nb: 20,
        nbElement: 10,
        price: 2,
        initPrice: 40,
        initSpeed: 25000
    },
    cheese: {
        unlock: true,
        nb: 30,
        nbElement: 15,
        price: 3,
        initPrice: 40,
        initSpeed: 26000
    },
    pickle: {
        unlock: false,
        nb: 20,
        nbElement: 20,
        price: 4,
        initPrice: 260,
        initSpeed: 3660
    },
    tomato: {
        unlock: false,
        nb: 20,
        nbElement: 20,
        price: 200,
        initPrice: 160,
        initSpeed: 6650
    },
    beacon: {
        unlock: false,
        nb: 20,
        nbElement: 20,
        price: 6,
        initPrice: 300,
        initSpeed: 1960
    },
    bredTopBlack: {
        unlock: false,
        nb: 20,
        nbElement: 20,
        price: 7,
        initPrice: 640,
        initSpeed: 405
    },
    egg: {
        unlock: false,
        nb: 20,
        nbElement: 20,
        price: 8,
        initPrice: 400,
        initSpeed: 1120
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

        this.init();
    }

    //upgrade the speed of delivery
    upgrade() {
        if (money > this.priceUpgrade && this.unlock) {
            this.lightYellow();

            money -= this.priceUpgrade;
            this.speedOfDelivery = this.getNewSPeed(this.speedOfDelivery);
            ingredientChart[this.ingredient].initSpeed = this.speedOfDelivery;
            this.priceUpgrade = this.getNewPrice(this.priceUpgrade)
            ingredientChart[this.ingredient].initPrice = this.priceUpgrade;
            this.speedDocument.textContent =
                "every " + this.roundValue(this.speedOfDelivery / 1000, 2).toString(10) + "s";
            this.button.textContent = this.priceUpgrade.toString(10) + "$";

            for (var i = 0; i < 3; i++) {
                this.add();
            }

            updateScore();
            this.updateTootTip();
        }

    }

    async lightYellow() {
        this.reservePanel.style.backgroundColor = "#FF961B";
        this.reservePanel.style.transform = "scale(1.01)";
        await burger.sleep(100);
        if (this.ingredient == "pickle") {

            this.reservePanel.style.backgroundColor = "rgb(154, 212, 157)";
            return;
        } else {
            this.reservePanel.style.backgroundColor = "#FFFFFF";
        }
        this.reservePanel.style.transform = "scale(1)";
    }

    //getPrice
    getNewPrice(oldPrice) {
        switch (currentChef) {
            case '0':
                oldPrice += 7.5;
                break;
            case '1':
                oldPrice += 3.75;
                break;
            case '2':
                oldPrice += 2;
                break;
            case '3':
                oldPrice += 4.16;
                break;
            case '4':
                oldPrice += 10;
                break;
            case '5':
                oldPrice += 12;
                break;
        }
        return this.roundValue(oldPrice * 1.10);
    }

    getNewSPeed(oldSpeed) {
        switch (currentChef) {
            case '0':
                oldPrice += 890;
                break;
            case '1':
                oldPrice += 480;
                break;
            case '2':
                oldPrice += 280;
                break;
            case '3':
                oldPrice += 175;
                break;
            case '4':
                oldPrice += 117;
                break;
            case '5':
                oldPrice += 80;
                break;
        }
        return this.roundValue(oldSpeed * 0.90);
    }

    //unlocked the reserve
    unlockReserve() {
        this.document.style.backgroundColor = "rgb(238, 237, 237)";
        if (this.ingredient == "pickle") {
            this.document.style.backgroundColor = 'rgb(154, 212, 157)';
        }

        //display the speed of delivery
        this.speedDocument.textContent =
            "every " + this.roundValue(this.speedOfDelivery / 1000, 2).toString(10) + "s";
        //display the price of the upgrade
        this.button.textContent = this.priceUpgrade.toString(10) + "$";

        this.checkMoneyButton();

        //fill the associated reserve
        for (var i = 0; i < this.nbMax; i++) {
            this.add();
        }
        //start the regular delivery
        this.initLoop(this.speedOfDelivery);

        this.unlock = true;

        ingredientChart[this.ingredient].unlock = true;

        this.initValues = false;
    }

    //color of button with out enough gold to buy
    checkMoneyButton() {
        if (this.unlock) {
            if (money < this.priceUpgrade) {
                this.button.style.backgroundColor = "#10222C";
                this.button.style.pointerEvents = "none";
                this.button.style.boxShadow = 'none';
            } else {
                this.button.style.backgroundColor = "#007d96";
                this.button.style.pointerEvents = "auto";
                this.button.style.boxShadow = '6px 6px 0px 1px #142d3a';
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

        var hoverBool = false;

        this.button.addEventListener('mouseover', () => {
            hoverBool = true;
            if (this.unlock) {
                setTimeout(() => {
                    if (hoverBool) {
                        this.toolTip.style.visibility = 'visible';
                    }
                }, 500)
            }
        })

        this.button.addEventListener('mouseleave', () => {
            hoverBool = false;
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
                this.ketchupDiv.style.backgroundColor = "rgb(255, 76, 9)";
                this.ketchupDiv.style.borderRadius = "5px";
            }
            //display the speed of delivery
            this.speedDocument.textContent =
                "every " + this.roundValue(this.speedOfDelivery / 1000, 2).toString(10) + "s";
            //display the price of the upgrade
            this.button.textContent = this.priceUpgrade.toString(10) + "$";

            this.checkMoneyButton();

            //fill the associated reserve
            for (var i = 0; i < this.initNumberElement; i++) {
                this.add();
            }

            this.initLoop(this.speedOfDelivery);

            this.initValues = false;
        } else {
            //grey everything out
            this.document.style.backgroundColor = "#10222C";
            this.button.style.pointerEvents = "none";
            this.button.style.backgroundColor = "#10222C";
            this.button.style.boxShadow = 'none';
        }

    }

    initLoop(valueSpeed) {
        //start the regular delivery
        var worker = new Worker(URL.createObjectURL(new Blob(["(" + startLoop.toString() + ")()"], { type: 'text/javascript' })));

        worker.onmessage = (e) => {
            console.log('message to add')
            switch (e.data) {
                case 'add':
                    this.add();
            }
        }

        worker.postMessage(valueSpeed)
    }

    //remove an ingredient
    remove() {
        if (this.listElement.length > 0 || this.ingredient == "ketchup") {
            if (this.ingredient == "ketchup") {
                this.ketchupDiv.style.height =
                    (100 / this.nbMax) * (this.nbElement - 1).toString(10) + "%";
                this.ketchupDiv.style.borderRadius = "0px";
                this.ketchupDiv.style.borderBottomLeftRadius = "3px";
                this.ketchupDiv.style.borderBottomRightRadius = "3px";
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
                    this.ketchupDiv.style.borderRadius = "3px";
                } else {
                    this.ketchupDiv.style.borderRadius = "0px";
                    this.ketchupDiv.style.borderBottomLeftRadius = "3px";
                    this.ketchupDiv.style.borderBottomRightRadius = "3px";
                }
                this.ketchupDiv.style.height =
                    Math.round((100 / this.nbMax) * (this.nbElement + 1)).toString(10) +
                    "%";
            } else {
                var divImageIngredient = document.createElement("div");
                var imageIngredient = document.createElement("img");
                divImageIngredient.style.height = (100 / this.nbMax).toString(10) + "%";
                var Terminaison = (Math.random() > 0.6) ? "Dif" : "";
                imageIngredient.src =
                    "ressources/pileElement/" + this.ingredient + Terminaison + ".png";
                imageIngredient.style.height = "120%";
                if (this.ingredient === "cheese") {
                    imageIngredient.style.height = "190%";
                }
                imageIngredient.classList.add("foodElement");
                divImageIngredient.appendChild(imageIngredient);
                this.document.appendChild(divImageIngredient);
                this.listElement.push(divImageIngredient);
            }
            this.nbElement++;
            if (!this.initValues) {
                ingredientChart[this.ingredient].nbElement += 1;
            }
        }
        if (pending) {
            burger.prepare(command);
        }
    }

    //round
    roundValue(value, nb = 0) {
        return Math.round(value * Math.pow(10, nb)) / Math.pow(10, nb);
    }

};

function startLoop() {
    console.log('Im alive')

    var speedOfDelivery = 1000000;

    var isReserveFilling = true;

    //sleep method even if it's bad
    async function sleepM() {
        for (var i = 0; i < speedOfDelivery; i += 10) {
            await sleep(10);
        }
        return;
    }

    //sleep fonction
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function loop() {
        while (isReserveFilling) {
            await sleepM();
            postMessage('add');
            console.log('add')
        }
    }

    onmessage = function(e) {
        speedOfDelivery = e.data;

        console.log(e.data)

        loop();
    }

    console.log('Im alive 2')
}