var PLAY = 1;
var END = 0;
var gameState = PLAY;

var lion, lion_running, lion_collided;
var background, invisiblebackGround, backgroundImage;

var cloudsGroup, cloudImage;
var stonesGroup, stone1, stone2, stone3, stone4, stone5, stone6;

var score=0;

var gameOver, restart;


function preload(){
  lion_running =   loadAnimation("lion1.png");
  lion_collided = loadAnimation("lion_collided.png");
  stone = loadImage("stone.png");
  
  backgroundImage = loadImage("background.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  cloudImage = loadImage("cloud.png")


  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3"); 
}

function setup() {
  createCanvas(600, 200);
  
  lion = createSprite(10,15,25,2);
  lion.addAnimation("running", lion_running);
  lion.addAnimation("collided", lion_collided);
  lion.scale = 0.1;
  
  background = createSprite(200,180,400,20);
  background.addImage("background",backgroundImage);
  background.x = background.width /2;
  background.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
}

function draw() {
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && lion.y >= 159) {
      jumpSound.play();
      lion.velocityY = -5;
    }
  
    lion.velocityY = lion.velocityY + 0.1
  
    if (background.x < 0){
      background.x = background.width/2;
    }
  
    lion.collide(invisibleGround);
    spawnClouds();
   
    
    if (score>0 && score%100 === 0){
      checkPointSound.play();
    }
  
    if(stoneGroup.isTouching(lion)){
      dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    lion.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the lion animation
    lion.changeAnimation("collided",lion_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    stoneGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = lion.depth;
    lion.depth = lion.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnStone() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(600,165,10,40);
    stone.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {

    }
    
    //assign scale and lifetime to the cloud          
    cloud.lifetime = 300;
    //add each cloud to the group
  
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  cloudGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  lion.changeAnimation("running",lion_running);
  
  score = 0;
  
}
