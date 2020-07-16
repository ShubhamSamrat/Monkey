//Global Variables
var monkey, obj, banana,monkeyImg, bananaImg, obstacleImg,obstacleGroup, backImg, score = 0, groundImg, restartImg, ground, invisibleGround, restart, monkeyCol, Charge,c0,c1,c2,c3,c4,c5,c6, chargePoint = 0,reButton;


//GameStates
var PLAY = 1, END = 0;
var gameState = PLAY;



function preload(){
  
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
  monkeyCol = loadImage("Monkey_08.png");
  bananaImg = loadImage("Banana.png");
  obstacleImg = loadImage("stone.png");
  backImg = loadImage("jungle.jpg");
  groundImg = loadImage("ground.png");
  restartImg = loadImage("restart.png");
  
  c0 = loadImage("charge0.png");
  c1 = loadImage("charge1.png");
  c2 = loadImage("charge2.png");
  c3 = loadImage("charge3.png");
  c4 = loadImage("charge4.png");
  c5 = loadImage("charge5.png");
  c6 = loadImage("charge6.png");
  
  reButton = loadImage("reButton.png");
  
  
  
}


function setup() {
  createCanvas(600,300);
  
   
  
  backg = createSprite(300,150,600,300);
  backg.addImage(backImg);
  backg.scale = 0.6;
  
  monkey = createSprite(100,250,20,50);
  monkey.addAnimation("running",monkeyImg);
 
  //monkey.debug = true;
  
  
  
  Charge = createSprite(550,80,40,90);
  //Charge.addImage(c6);
  
  
  
  
  
  
  //create a ground sprite
  ground = createSprite(300,280,400,20);
  ground.addImage(groundImg);
  
  monkey.depth = ground.depth + 1;
  
  //create Obstacle and banana Groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
   
  
//invisible Ground to support monkey
  invisibleGround = createSprite(300,282,600,5);
  invisibleGround.visible = false;
  
  
  
  //place gameOver and restart icon on the screen

restart = createSprite(650,240);
restart.visible = false
  
  



  //score


  
  
  
  
  
  }





function draw(){
 background(255);
  
  Charge.scale = 0.5;
  
  
  
  monkey.collide(invisibleGround);
  
  
  switch(chargePoint){
      
      case 0 : Charge.addImage(c0);
                monkey.scale = 0.1;
      break;
      
      case 10 : Charge.addImage(c1);
                monkey.scale = 0.12;
      break;
      
      
      
      
      case 20 : Charge.addImage(c2);
                monkey.scale = 0.14;
      break;
      
      case 30 : Charge.addImage(c3);
                monkey.scale = 0.16;
      break;
      
      case 40 : Charge.addImage(c4);
                monkey.scale = 0.18;
      break;
      
      case 50 : Charge.addImage(c5);
                monkey.scale = 0.2;
      break;
      
      case 60 : Charge.addImage(c6);
                monkey.scale = 0.22;
      
     break;
  
  
  
  
  
  
  }
  
  
  
  
  
  
  if(gameState === PLAY){
    
    //move the ground
    ground.velocityX = -8;
    
    //scoring
    score = score + Math.round(Math.random(0.2,0.6)) ;
    
    
    if (ground.x < 0){
      ground.x = 300;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 230){
      monkey.velocityY = -14 ;
     
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //spawn the Banana
    spawnBanana();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when monkey is touching the obstacle
    if(obstacleGroup.isTouching(monkey)){
      
      chargePoint = 0;
          
    }
    
    
    
    
    
    
    
  }
    
    
    
    for(var i = 0; i < bananaGroup.length; i++){
      
      var ban =   bananaGroup.get(i);
    
      if(ban.isTouching(monkey)){
        
        if(chargePoint <60){
          chargePoint = chargePoint +2;
          }
        console.log(chargePoint);
        ban.destroy();
        
      }
     
      
    }
  
  
  
  
  
  
  
 if(gameState === END) {
    restart.visible = true;
    restart.addImage(restartImg);
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    restart.x = 300;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //change the monkey animation
    monkey.addAnimation("monkeyCollided",monkeyCol);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart) && gameState === END) {
    reset();
  }
  
  
  
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);  
  
  
  
  
  
  
  
  
  
  drawSprites();
  
  //display score
  textSize(30);
  textFont("Georgia");
  textStyle(BOLD);
  fill("white");
  text("Survival Score: "+ score,20, 20);
  
  
  
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = -8 ;
    
       
    obstacle.addAnimation("stone",obstacleImg);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 80;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
    //obstacle.debug = true;
    obstacle.setCollider("circle",50,0,200);
    
    
    
  }
}

function spawnBanana() {
  //code  to spawn the Banana
  if (World.frameCount % Math.round( random(60,100)) === 0) {
    var banana = createSprite(600,265,40,10);
    banana.y = random(140,200);
    banana.addAnimation("Banana",bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -8;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
    
    //banana.debug = true;
    banana.setCollider("rectangle",0,0,800,400);
  
  }
  
 
    
  
}


function reset(){
  gameState = PLAY;
  
  restart.visible = false;
  
  score = 0;
  chargePoint = 0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.addAnimation("monkeyVollided",monkeyImg);
  
  
  
}

