var space,spaceImg;
var rocket,rocketImg;
var invisibleBoundary1,invisibleBoundary2;
var alien,alienImg,alienG;
var star,starImg,starG;
var astronaut,astronautImg,astronautG;
var score=0;
var starCount=0;
var gameState="play";

function preload(){

  spaceImg = loadImage("image of space.jpg");
  rocketImg = loadImage("rocket.png");
  alienImg = loadImage("alien.png");
  starImg = loadImage("star.png");
  astronautImg = loadImage("astronaut.png");
  gameOverImg = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");

}

function setup() {
 createCanvas(600,600);

  space = createSprite(300,300,600,600);
  space.addImage("space",spaceImg);
  space.velocityY=1;
  space.scale=5;

  rocket = createSprite(300,520);
  rocket.addImage("rocket",rocketImg);
  rocket.scale = 0.3;

  invisibleBoundary1=createSprite(5,350,5,350);
  invisibleBoundary2=createSprite(595,350,5,350);

  alienG= new Group();
  starG= new Group();
  astronautG= new Group();
}

function draw() {
  
  
  background("black");

if(gameState === "play"){
if(space.y>400){
    space.y=300;
}

if(keyDown("RIGHT_ARROW")){
  rocket.x+=10;
}

if(keyDown("LEFT_ARROW")){
  rocket.x-=10;
}

 rocket.collide(invisibleBoundary1);
rocket.collide(invisibleBoundary2);

invisibleBoundary1.visible=false;
invisibleBoundary2.visible=false;
 
  //calling functions
 spawnAlien();
 spawnAstronaut();
 spawnStar();
  
 if(frameCount % 10 === 0){
   score+=1;
 }

 if(starG.isTouching(rocket)){
   star.destroy();
   starCount+=1;
 }

 if(astronautG.isTouching(rocket)){
   astronaut.destroy();
   score+=100;
 }

 if(alienG.isTouching(rocket)){
   rocket.destroy();
   gameState = "end";

 }

 drawSprites();


textSize(25);
fill("white");
 text("Score : "+score,450,50);
  
 textSize(25);
fill("white");
 text("Star : "+starCount,50,50);
}

if(gameState==="end"){
  textSize(30);
  fill("yellow");
  stroke("green");
  textFont("Bungee");
  text("Game Over",230,250);
  

}

}
  

function spawnAlien(){
  if(frameCount % 200 === 0 ){
    alien = createSprite(Math.round(random(50,500)),50,20,20);
    alien.addImage("alien",alienImg);
    alien.velocityY=(3 + 10*score/100);
    alien.scale=0.05;
    alien.lifetime=185;
    alienG.add(alien);
  }
}

function spawnStar(){
  if(frameCount % 1000 === 0){
    star = createSprite(Math.round(random(50,450)),50,20,20);
    star.addImage("star",starImg);
    star.velocityY=3;
    star.scale=0.1;
    star.lifetime=185;
    starG.add(star);
  }
}

function spawnAstronaut(){
  if(frameCount % 2000 === 0){
    astronaut = createSprite(Math.round(random(200,500)),50,20,20);
    astronaut.addImage("astronaut",astronautImg);
    astronaut.velocityY=3;
    astronaut.scale=0.02;
    astronaut.lifetime=185;
    astronautG.add(astronaut);
  }
}