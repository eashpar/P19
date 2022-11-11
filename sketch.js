var person,rocks,gold; 
var space;
var pointCollection = 0;
var goldG, rocksG;
var personImage, spaceImage, goldImage, rocksImage;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
spaceImage = loadImage("space.jpg");
goldImage = loadImage("gold.webp");
rocksImage = loadImage("rock.png");
personImage = loadAnimation("man walk 1 .png","man walk 4 .png");


}

function setup() {

  createCanvas(windowWidth,windowHeight);
  
  space=createSprite(width/2,200);
  space.scale = 100;
  space.addImage(spaceImage);
  space.velocityY = 5;

  person = createSprite(width/2,height-20,20,20);
  person.addAnimation("ManWalking",personImage);
  person.scale=2;  

  goldG=new Group();
  rocksG=new Group();

}

function draw() {

    if(gameState===PLAY){
    background(0);
    person.x = World.mouseX; 
 
    edges= createEdgeSprites();
    person.collide(edges);

    if(space.y > height){
        space.y = height/2;
    }
        createRocks();
        createGold();

        if(goldG.isTouching(person)){
            goldG.destroyEach();
            pointCollection = pointCollection+20;
        }
        else{
            if(rocksG.isTouching(person)){
                gameState = END;

                person.addAnimation("ManWalking",personImage);
                person.x=width/2;
                person.y=height/2;
                person.scale=0.6;

                goldG.destroyEach();
                rocksG.destroyEach();

                goldG.setVelocityEach(0);
                rocksG.setVelocityEach(0);
            }
        }

        drawSprites();
        textSize(20);
        fill(255);
        text("Points: "+ pointCollection,width-150,30);
    }
 
}

function createGold(){
    if(World.frameCount % 100 == 0){
        var gold = createSprite(Math.round(random(50, width-50),40,10,10));
        gold.addImage(goldImage);
        gold.scale = 0.12;
        gold.velocityY = 5;
        gold.lifetime = 100;
        goldG.add(gold);
    }
}

function createRocks(){
    if(World.frameCount % 255 == 0){
    var rocks = createSprite(Math.round(random(50, width-50),40,10,10));
    rocks.addImage(rocksImage);
    rocks.scale = 0.1;
    rocks.velocityY = 4;
    rocks.lifetime = 100;
    rocksGroup.add(rocks);    
    }
}