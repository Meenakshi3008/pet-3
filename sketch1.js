var dog, happyDog;
var dogImg, happyDogImg;

var foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;

var fodObj;

var database;

function preload() {
  dogImg = loadImage("dog.png");
  happyDogImg = loadImage("happyDog.png")
}

function setup() {
  createCanvas(1100, 500);

  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(500, 250, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  summin = createSprite(560, 55, 80, 20);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  })

  feedPet = createButton("Feed the Dog");
  feedPet.position(970, 95);

  addFood = createButton("Add Food");
  addFood.position(1070, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);

  foodObj.display();

  if(frameCount % 5 === 0) {
    if(mousePressedOver(summin)) {
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }
  }

  current

  drawSprites();

  textFont("Georgia");
  textSize(20);
  textAlign(CENTER);
  fill("white");
  text("Food Stock: " + foodS, 600, 30);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}

function feedDog(x) {
  dog.addImage(happyDogImg);

  if(x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}

function addFoods() {
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}