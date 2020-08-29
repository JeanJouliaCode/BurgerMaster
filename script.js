//create the display for the burger
var burger;

var date0;

//chef List
var chefList = [];

var isGameGoing = true;

var rulesDisplayed = false;

var resetDisplayed = false;

var contactDisplayed = false;

let startDate = new Date();
let elapsedTime = 0;

var reseting = false;


function startGame() {
    //currentChef = 0;
    getItemLocalStorage();
    //initialise the burger
    burger = new Burger();

    initTime();

    //fill up the food reserve
    initFoodReserve();

    initChef();

    initRules();
    initReset();
    initContact();

    iniEnding();
    initIcon();

    //get div order to maker burger when clicked for test purpose
    makeBurger();
}

async function makeBurger() {
    if (!pending) {
        burger.prepare(generateCommand());
    } else {
        displayOrder(command);
    }
    updateScore();
}

function initIcon() {
    (function() {
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = './ressources/icon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    })();
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

function initRules() {
    button = document.getElementById('ruleBtn');
    rules = document.getElementById('rule');
    cross = document.getElementById('cross');

    button.addEventListener('click', () => {
        if (rulesDisplayed) {
            rules.style.display = 'none';
        }
        if (!rulesDisplayed && !resetDisplayed) {
            rules.style.display = 'block';
        }
        rulesDisplayed = !rulesDisplayed;
    })

    cross.addEventListener('click', () => {
        rules.style.display = 'none';
        rulesDisplayed = false;
    })
}

function initReset() {
    button = document.getElementById('resetBtn');
    resetDiv = document.getElementById('resetDiv');
    resetCancel = document.getElementById('resetCancel');
    resetOk = document.getElementById('resetOk');

    button.addEventListener('click', () => {
        if (resetDisplayed) {
            resetDiv.style.display = 'none';
        }
        if (!resetDisplayed && !rulesDisplayed) {
            resetDiv.style.display = 'flex';
        }
        resetDisplayed = !resetDisplayed;
    })

    resetCancel.addEventListener('click', () => {
        resetDiv.style.display = 'none';
        resetDisplayed = false;
    })

    resetOk.addEventListener('click', () => {
        reseting = true;
        localStorage.setItem('saveObject', null);
        window.location.reload();
    })
}

function clipboard() {
    var copyText = document.getElementById("clipboard");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");

    alert("Copied the text: " + copyText.value);
}

function initContact() {
    button = document.getElementById('contactBtn');
    contact = document.getElementById('contact');
    cross = document.getElementById('crossContact');
    melLink = document.getElementById('melLink');

    button.addEventListener('click', () => {
        if (contactDisplayed) {
            contact.style.display = 'none';
        }
        if (!rulesDisplayed && !resetDisplayed && !contactDisplayed) {
            contact.style.display = 'block';
        }
        contactDisplayed = !contactDisplayed;
    })

    melLink.addEventListener('click', () => {
        window.location.replace("https://www.melissaledoux.fr/");
    })

    cross.addEventListener('click', () => {
        contact.style.display = 'none';
        contactDisplayed = false;
    })
}

function getTIme() {

}

function initTime() {

    const beforeunload = function() {
        const endDate = new Date();
        const spentTime = endDate.getTime() - startDate.getTime();
        elapsedTime += spentTime;

        if (!reseting) {
            saveData();
        }
        // elapsedTime contains the time spent on page in milliseconds
    };

    window.addEventListener('beforeunload', beforeunload);
}

function getTimeElapsed() {
    const endDate = new Date();
    const spentTime = endDate.getTime() - startDate.getTime();
    return elapsedTime + spentTime;
}

function iniEnding() {
    var endingBtn = document.getElementById('finishOk');

    endingBtn.addEventListener('click', () => {
        document.getElementById('finishMessage').style.display = 'none';
    });


}