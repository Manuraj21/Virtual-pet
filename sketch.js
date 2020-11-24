var dog,dogImg,dogImg1;
var database;
var foodS,foodStock,foodStockImg;
var milkImage;

function preload(){
   dogImg=loadImage("dog.png");
   dogImg1=loadImage("dog1.png");
   foodStockImg = loadImage("Food Stock.png");
   
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(850,600);

  dog=createSprite(600,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.19;

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  textSize(20); 

  fs = createSprite(500, 150, 20, 20);
  fs.addImage(foodStockImg);
  fs.scale = 0.15

  feed = createButton("FEED DRAGO MILK");
  feed.position(900,100);
  //feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(600,100);
 // add.mousePressed(AddFood);

}

// function to display UI
function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(dogImg1);
    
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,140);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",210,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}