var chefs = {
  chef0: { min: 1, max: 2, nbUnlocked: 5, speed: 40, unlocked: true },
  chef1: { min: 1, max: 3, nbUnlocked: 6, speed: 20, unlocked: false },
  chef2: { min: 2, max: 4, nbUnlocked: 7, speed: 10, unlocked: false },
  chef3: { min: 3, max: 5, nbUnlocked: 8, speed: 5, unlocked: false },
  chef4: { min: 4, max: 6, nbUnlocked: 9, speed: 3, unlocked: false },
  chef5: { min: 5, max: 7, nbUnlocked: 10, speed: 1, unlocked: false }
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
    unlocked
  ) {
    this.upgrade1 = upgrade1;
    this.upgrade2 = upgrade2;
    this.upgrade3 = upgrade3;

    this.imageSrc = imageSrc;
    this.price = price;
    this.speed = speed;
    this.unlocked = unlocked;
    this.document = document;

    this.init();
  }

  init() {
    this.document.children[0].children[3].src = this.imageSrc;

    console.log(this.unlocked);
    if (!this.unlocked) {
      this.document.children[0].style.height = "0px";
      this.document.children[0].style.visibility = "hidden";
    }
  }
};
