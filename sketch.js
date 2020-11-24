var gameState="play";

var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisibleBlock; invisibleBlockGroup;
var gameSound;

function preload(){
  
  towerImg=loadImage("tower.png");
  
  doorImg=loadImage("door.png");
  
  doorGroup=new Group();
  
  climberImg=loadImage("climber.png");
  
  climberGroup=new Group();
  
  ghostImg=loadImage("ghost-standing.png");
  
  gameSound=loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  
  gameSound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  invisibleBlockGroup=new Group();
  
  
  
}
function draw(){
  background("black");
  
  if (gameState==="play"){
  
  //making tower infinate
  if (tower.y>400){
    tower.y=200;
  }
  
  if (keyDown("right")){
    ghost.x=ghost.x+3;
    
  }
  if (keyDown("left")){
    ghost.x=ghost.x-3;
    
  }
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.3;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }

  if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600) {
    ghost.destroy();
    gameState="end";
  }
    
  spawnDoors();
    
  drawSprites();
  }
  if (gameState==="end"){
    textSize(30);
    stroke("orange");
    text("Game Over",300,300);
    
  }
}
function spawnDoors(){
  if (frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);

    climber=createSprite(200,10);
    climber.addImage(climberImg);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    
    door.x=Math.round(random(100,400));
    door.velocityY=1;
    
    climber.x=door.x;
    invisibleBlock.x=door.x;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    
    climber.lifetime=750;
    door.lifetime=750;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
    doorGroup.add(door); 
    climberGroup.add(climber);
  }
}