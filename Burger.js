var pending = false;

var priceIncrease = false;

//is a burger beeing prepared
var inPreparation = false;

var priceBrugerMultiplicator = 1;

var speed = 0;

var speedList = [40, 35, 25, 19, 14, 11, 8, 6, 4, 3, 2, 1]

var nbBurger = 0;

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
            ketchup: { width: "44%", left: "25%", offset: 1 },
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

        this.speed = speedList[speed];

        this.speedIngredientPourcent = Math.floor(-0.19 * this.speed + 10);
    }

    changeSpeed() {
        this.speed = speedList[speed];
        this.speedIngredientPourcent = Math.floor(-0.19 * this.speed + 10);
    }

    displayChef() {
        this.chefImage = document.getElementById('chefImage');
        this.chefImage.src = "./ressources/chefs/chef" + currentChef.toString() + ".png";
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    //add ingredient and moving it down
    async addIngredient(document, margin, m, i, ingredient, listElement) {

        if (m > margin) {
            m -= this.speedIngredientPourcent;
            this.moveIngredient(m, document, this.speed);
            this.objAddIngredient = { 'document': document, 'margin': margin, 'm': m, 'i': i, 'ingredient': ingredient, 'listElement': listElement }
            this.worker.postMessage(this.speed.toString() + '-' + 'addIngredient')
            //this.addIngredient(document, margin, m, i, ingredient, listElement);
            return;
        }
        await this.moveIngredient(margin, document, this.speed);
        margin += this.positionInfo[ingredient].offset;
        this.preparePhaseDown(margin, listElement, i + 1);
    }

    //moving the image of the ingredient
    moveIngredient(margin, document) {
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

            this.preparePhaseDown(generalOffset, listElement, 0);
        }
    }

    preparePhaseDown(generalOffset, listElement, i) {
        if (listElement.length <= i) {
            this.lastPhase(listElement);
            return;
        }

        var ingredient = listElement[i];

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
        imageIngredient.src = "./ressources/ingredients/" + ingredient + (isThereKetchup && ingredient == "ketchup" ? "_bis" : "") + ".png";
        console.log(imageIngredient.src);

        this.burgerElement.push(imageIngredient);

        this.addIngredient(imageIngredient, generalOffset, 150, i, ingredient, listElement);

    }

    async lastPhase(listElement) {
        //push the burger out
        await burger.pushPlate(this.speed);

        money += this.getBurgerPrice(listElement);
    }

    //return burger price
    getBurgerPrice(listElement) {
        var priceBurger = 0.0;

        for (var element of listElement) {
            if (ingredientChart[element]) {
                priceBurger += ingredientChart[element].price;
            }
        }
        var multiply = priceBrugerMultiplicator != 1 && Math.random() > 0.9;
        if (multiply) {
            changeSpanColor()
        }
        return multiply ? priceBurger * priceBrugerMultiplicator : priceBurger;
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
        this.pushPlatePhase(speed, pixelArray, 0)
    }

    async pushPlatePhase(speed, pixelArray, i) {
        var tmp = 0
        if (i < 500 / this.speedIngredient) {
            for (var element of this.burgerElement) {
                pixelArray[tmp] = pixelArray[tmp] + this.speedIngredient;
                element.style.left = pixelArray[tmp].toString(10) + "px";
                tmp++;
            }
            i++;
            this.objPushPlatePhase = { 'speed': speed, 'pixelArray': pixelArray, 'i': i };
            this.worker.postMessage(this.speed.toString() + '-' + 'pushPlatePhase')
            //await this.pushPlatePhase(speed, pixelArray, i);
            return;
        }
        for (var element of this.burgerElement) {
            element.parentNode.removeChild(element);
        }
        this.burgerElement = [];

        inPreparation = false;

        //update displayed score
        updateScore();

        saveData();

        //make another burger
        makeBurger();

        nbBurger++;

    }

    //init the image by putting an empty div and alowing image to be stack on top of another
    init() {
        this.worker = new Worker(URL.createObjectURL(new Blob(["(" + workerTimer.toString() + ")()"], { type: 'text/javascript' })));
        this.worker.onmessage = (e) => {
            switch (e.data) {
                case 'addIngredient':
                    this.addIngredient(this.objAddIngredient.document, this.objAddIngredient.margin, this.objAddIngredient.m, this.objAddIngredient.i, this.objAddIngredient.ingredient, this.objAddIngredient.listElement);
                    break;
                case 'pushPlatePhase':
                    this.pushPlatePhase(this.objPushPlatePhase.speed, this.objPushPlatePhase.pixelArray, this.objPushPlatePhase.i);
                    break;
            }
        }
        var emptyDiv = document.createElement("div");
        this.servingDiv.appendChild(emptyDiv);
        emptyDiv.position = "relative";
        this.displayChef();
    }
};

function workerTimer() {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onmessage = function (e) {
        var info = e.data.split('-');
        waitTheTime(parseInt(info[0]), info[1])

    }

    async function waitTheTime(time, message) {
        await sleep(time);
        postMessage(message);
    }
}