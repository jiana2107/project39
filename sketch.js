
var monkey , monkey_running,monkeyI;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var backg,backI;
var game,gameI;
var win,winI;
var monkey1,monkeyI;
var score=0, survivaltime=0;
var ground,groundImage;
var invisible;
var invisibleGround;
var PLAY=1,END=0;
var RESTART;
var gameState=PLAY;

function preload(){
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 // monkeyI=loadImage("sprites_2.png")
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
  groundImage=loadImage("ground2.png");
  backI=loadImage("j6.jpg");
  gameI=loadImage("gameover.png")
  monkeyI=loadImage("monkey.png")
  winI=loadImage("you win.png")
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-50);

  backg=createSprite(displayWidth/2,displayHeight/2)
  backg.addImage(backI)
  backg.scale=3;

  ground = createSprite(250,450,1500,20);
  ground.addImage(groundImage);
  ground.velocityX=-6;
  ground.x = ground.width/2-500;

  monkey=createSprite(80,410,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  monkey1=createSprite(80,420,20,20);
  monkey1.addImage(monkeyI);
  monkey1.scale=0.1;
  monkey1.visible=false;
  
  invisible=createSprite(250,100,500,7);
  invisible.visible=false;
  
  invisibleGround=createSprite(250,460,500,20);
  invisibleGround.visible=false;

  gameOver=createSprite(displayWidth/2,displayHeight/2)
  gameOver.addImage(gameI)
  gameOver.visible=false;
  
  win=createSprite(displayWidth/2,displayHeight/2)
  win.addImage(winI)
  win.visible=false;
  
  bananaGroup = createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background(220);

  monkey.collide(invisibleGround);
  monkey.collide(invisible);
 
  monkey.velocityY=monkey.velocityY +0.8;

  if(monkey.x>=500){
    camera.position.x=displayWidth/2;
    camera.position.y=monkey.y;
  }

  drawSprites();
  
  if(gameState===PLAY){
    if(keyDown("space") && monkey.y>=0){
      monkey.velocityY=-6;}

    food();
    drawobstacles();
      
    if(ground.x<0){
      ground.x=displayWidth/2+500; }
      
    if(monkey.isTouching(bananaGroup)){ 
      bananaGroup.destroyEach();
      score=score+1;}
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;}
  }
  
  if(gameState===END){
   // fill("red");textSize(20);
    //text("GAME OVER!!",230,250);
    gameOver.visible=true;
    monkey1.visible=true;
    monkey.visible=false;
    monkey.velocityY=0;
    //monkey.addImage("sprite_2.png")
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    survivaltime=survivaltime-1;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  if(gameState===RESTART){
    monkey1.visible=true;
    monkey.visible=false;
    win.visible=true;
    monkey.velocityY=0;
    ground.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    survivaltime=suvivaltime-1;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  if(score===15){
  gameState=RESTART;}
  
  stroke("white");
  textSize(20);
  fill("black");
  text("score:"+score,300,50);
  
   stroke("white");
  textSize(20);
  fill("red");
  survivaltime= survivaltime+Math.ceil(frameRate()/60);
  text("Survival Time:"+survivaltime,300,20);

}

function drawobstacles(){
  if(frameCount%300==0){
    obstacle=createSprite(displayWidth/2+700,430,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=250;
    obstacle.velocityX=-(6+score/10);
    obstacleGroup.add(obstacle);
  }}

function food(){
if(frameCount%150==0){
  banana=createSprite(displayWidth/2+700,random(120,350),20,20); 
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=350;
  banana.velocityX=-5;
  bananaGroup.add(banana);
   }
}
