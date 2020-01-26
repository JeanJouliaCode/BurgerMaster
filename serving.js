var Burger = class Burger{

    constructor() {
        this.servingDiv = document.getElementById("serving");
        this.burgerElement = []; 
        this.positionInfo = {
            bredTop : { width : "50%" , left : "23%" , offset : 10 },
            bredBottom : { width : "47%" , left : "23%" , offset : 30 },
            meat : { width : "50%" , left : "25%" , offset : 0 },
        }
        this.sizeBurger = 70;
    }

    prepare(listElement){
        console.log("prepare")

        var tmp = 0;

        var emptyDiv = document.createElement('div');
        this.servingDiv.appendChild(emptyDiv); 
        emptyDiv.position = "relative"
        this.burgerElement.push(emptyDiv);

        for(var  ingredient  of listElement){
            var imageIngredient = document.createElement('img');
            this.servingDiv.appendChild(imageIngredient);
            imageIngredient.style.position = "absolute";
            imageIngredient.style.width = this.positionInfo[ingredient].width;
            imageIngredient.style.left = this.positionInfo[ingredient].left;  
            imageIngredient.style.bottom = "0px";  
            imageIngredient.style.paddingBottom = (this.positionInfo[ingredient].offset + tmp*this.sizeBurger).toString(10)+ "px";           
            imageIngredient.src = './ressources/ingredients/'+ingredient+".gif";
            this.burgerElement.push(imageIngredient);

            tmp+= 1;
        }
    }
}

function test(){
    var Burger = new Burger();
    burger.prepare(["bredBottom", "meat" , "bredTop"])
}