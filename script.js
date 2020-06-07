//create the display for the burger
var burger;

var date0;

//chef List
var chefList = [];

var isGameGoing = true;

function startGame() {
    //currentChef = 0;
    getItemLocalStorage();
    //initialise the burger
    burger = new Burger();

    document.getElementById('meat').addEventListener('click', () => {
        localStorage.setItem('saveObject', null);
        console.warn('reset')
    })

    //fill up the food reserve
    initFoodReserve();

    initChef();

    //get div order to maker burger when clicked for test purpose
    makeBurger();
}

async function makeBurger() {
    console.log('pending', pending)
    console.log('%c word is :' + pending, ' color: #DB0004');
    if (!pending) {
        burger.prepare(generateCommand());
    } else {
        displayOrder(command);
    }
    updateScore();
}

function initFoodReserve() {
    //get the foodContainer div and initialize them
    var foodDiv = document.getElementsByClassName("ingredientPile");
    for (var food of foodDiv) {
        var ingredientPanel = new IngredientPanel(
            food.id, // ingredient name
            ingredientChart[food.id].unlock, // is it locked
            ingredientChart[food.id].initSpeed, // speed of delivery
            food, // HTML Document
            ingredientChart[food.id].nb, // maximum number of food in reserve
            ingredientChart[food.id].initPrice,
            ingredientChart[food.id].nbElement
        );

        //add element to the list
        foodList.push(ingredientPanel);
    }
}

function initChef() {
    for (chef of document.getElementsByClassName("locked")) {
        var newChef = new Chef(
            chef,
            chefs[chef.id].upgrade1locked,
            chefs[chef.id].upgrade2locked,
            "./ressources/chefs/" + chef.id + ".png",
            chefs[chef.id].price,
            chefs[chef.id].unlocked,
            chef.id
        );
        chefList.push(newChef);
    }
}