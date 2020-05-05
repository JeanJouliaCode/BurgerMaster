//create the display for the burger
var burger;

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
  
  // var list = [];
  // for(var i= 0 ; i<6 ; i++){
  //   var price = 0;
  //   for(var j = 0 ; j < 1000 ; j++){
  //     price += burger.getBurgerPrice(generateCommand());
  //   }
  //   list.push({"c": currentChef , "price" :price/1000 })
  //   currentChef++;
  // }

  // console.log('nothing',list)
  // currentChef = 0;
  // upgradeDoublePrice();
  
  // var list = [];
  // for(var i= 0 ; i<6 ; i++){
  //   var price = 0;
  //   for(var j = 0 ; j < 1000 ; j++){
  //     price += burger.getBurgerPrice(generateCommand());
  //   }
  //   list.push({"c": currentChef , "price" :price/1000 })
  //   currentChef++;
  // }

  // console.log('upgradeDoublePrice',list)
  // currentChef = 0;
  // alwaysKetchup()
  
  // var list = [];
  // for(var i= 0 ; i<6 ; i++){
  //   var price = 0;
  //   for(var j = 0 ; j < 1000 ; j++){
  //     price += burger.getBurgerPrice(generateCommand());
  //   }
  //   list.push({"c": currentChef , "price" :price/1000 })
  //   currentChef++;
  // }

  // console.log('alwaysKetchup',list)
  // currentChef = 0;
  // upgradeUpgradeLowest()
  
  // var list = [];
  // for(var i= 0 ; i<6 ; i++){
  //   var price = 0;
  //   for(var j = 0 ; j < 1000 ; j++){
  //     price += burger.getBurgerPrice(generateCommand());
  //   }
  //   list.push({"c": currentChef , "price" :price/1000 })
  //   currentChef++;
  // }
  
  // console.log('upgradeUpgradeLowest',list)
  // currentChef = 0;
  // upgradeBiggerBurger()
  
  // var list = [];
  // for(var i= 0 ; i<6 ; i++){
  //   var price = 0;
  //   for(var j = 0 ; j < 1000 ; j++){
  //     price += burger.getBurgerPrice(generateCommand());
  //   }
  //   list.push({"c": currentChef , "price" :price/1000 })
  //   currentChef++;
  // }

  // console.log('upgradeBiggerBurger',list)
  // currentChef = 0;
  // multiplyPriceBurger()

  // var list = [];
  // for(var i= 0 ; i<6 ; i++){
  //   var price = 0;
  //   for(var j = 0 ; j < 1000 ; j++){
  //     price += burger.getBurgerPrice(generateCommand());
  //   }
  //   list.push({"c": currentChef , "price" :price/1000 })
  //   currentChef++;
  // }

  // console.log('multiplyPriceBurger',list)
  // currentChef = 0;
  // upgradeTowerBurger()

  // var list = [];
  // for(var i= 0 ; i<6 ; i++){
  //   var price = 0;
  //   for(var j = 0 ; j < 1000 ; j++){
  //     price += burger.getBurgerPrice(generateCommand());
  //   }
  //   list.push({"c": currentChef , "price" :price/1000 })
  //   currentChef++;
  // }

  // console.log('upgradeTowerBurger',list)


  // return;

  // for(i = 0 ; i<50 ; i+=3){
  //   console.log('speed',i);
  //   var t1 = new Date();
  //   burger.changeSpeed(i)
  //   await burger.prepare(['bredTop','bredTop','bredTop','bredTop','bredTop']);
  //   var t2 =  new Date()- t1;
  //   console.log(t2);
  // }

  // return 
  
  
  if (!pending) {
    burger.prepare(generateCommand());
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
      chefs[chef.id].speed,
      chefs[chef.id].unlocked,
      chef.id
    );
    chefList.push(newChef);
  }
}
