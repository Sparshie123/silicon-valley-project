var ground,player;
var monster,meteor,monsterImg,meteorImg,meteorGroup,playerLives=3
var ghost,ghostImg,button

var gameState = 0;
var count =0;

var ans, ropeObj,x;

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ropeObj, fruit, fruit_con;
var pedestal

function preload(){
  bg1 = loadImage("background.jpg");
  playerImg = loadImage("player.png");
  monsterImg=loadImage("creeper.png")
  meteorImg=loadImage("meteor.png");
  block1Img = loadImage("block1.png");
  block2Img = loadImage("block2.png");
  bg3Img = loadImage("bg3.jpeg");
  bg2Img=loadImage("background2.jpg");
  scaleImg=loadImage("scales.png");
  ghostImg=loadImage("ghost.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  engine = Engine.create();
  world = engine.world;

  ground = createSprite(width/2, height/2, width+100, height);
  ground.addImage(bg1);
  ground.scale =2.5;
  ground.velocityX = -2;

  pedestal=createSprite(width/2-115,height-330,75,25)
  pedestal.visible=false

  ground2 = createSprite(width/2, height-20, width+100, 20);  
  ground2.visible=false

  player = createSprite(200, height-170);
  player.addImage(playerImg);
  
  player.changeImage(playerImg)
 player.scale = 0.4;
  player.velocityX=5

  ghost=createSprite(width/2,height-250)
  ghost.addImage(ghostImg)
  ghost.scale=4
  ghost.visible=false

meteorGroup= new Group()



monster=createSprite(-50,height-170)
monster.addImage(monsterImg)
monster.scale=0.8
monster.velocityX=5

ques = new Question();

scales=createSprite(width/2+35,height-400);
scales.addImage(scaleImg);
scales.scale=0.7;
scales.visible=false;

block2=createSprite(width/2+175,height-350);
block2.addImage(block2Img);
block2.scale=0.2;
block2.visible=false;

ropeObj = new Rope(6,{x:600,y:200});




fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(ropeObj.body,fruit);

  fruit_con = new Link(ropeObj,fruit);

  ellipseMode(RADIUS);
  rectMode(CENTER);

}

function draw() {
  background("black"); 
Engine.update(engine);

  if(gameState === 0){

      if(keyDown(RIGHT_ARROW)){
          player.velocityX+=2
          monster.velocityX+=2
        }

      if(ground.x <width/2 - 150){
        ground.x = width/2;
      }
    
      player.collide(ground2);
      monster.collide(ground2)
      
    //player control
    if(keyDown("space")){
      player.velocityY = -12;
      monster.velocityY=-12
    } 

//gravity
      player.velocityY += 0.5;
      monster.velocityY+=0.5
//resetting the player's and monster's position
    if(player.x>width) {
      player.x=200
     }
   
    if(monster.x>width) {
      monster.x=-50
      }

      if(meteorGroup.isTouching(player)) {
playerLives=playerLives-0.5

      }

    if(monster.isTouching(player)) {
      playerLives=playerLives-0.5;
      }

    player.overlap(meteorGroup, function(collector, collected){

     playerLives -=0.5;

     collected.remove();
    })


    monster.collide(meteorGroup, function(collector, collected){
      playerLives -=1;

      collected.remove();

      count +=1;
    })


if(playerLives===0) {
ghost.visible=true
stop();
gameOver();
player.velocityX=0

}
  spawnMeteors();
  drawSprites();

  textSize(50)
  fill("black")
  text("Lives:"+playerLives,width-200,100)
  
  text("Meteor touched the monster: "+ count + " times",20,100);
  text("Space Bar to Jump and Right Arrow to Dash",20,150)

  if(count === 1){
    victory()
    gameState =1;
    
    
  }

}


    if(gameState ===1){
     background(bg2Img);
      player.velocityX=0
      ground.visible=false
     ques.display();
     
     
      ques.handleButton();

      
      if(ans){
        gameState = 2;
      }
      else if(x === "2"){
        gameState = "end";
      }
      else if(x === "3"){
        gameState = "end";
      }
      else if(x === "4"){
        gameState = "end";
      }
    }


if(gameState === 2){
  ques.hide();
  background(bg3Img);

 
  player.velocityX=0
  button = createImg('button.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ropeObj.show();

  image(block2Img,fruit.position.x, fruit.position.y, 70,70);
  scales.visible=true;
  block2.visible=true;
  ground.visible = false;
  monster.visible = false;
  pedestal.visible=true
  button.visible=true
  drawSprites()

  
   
  }
  
  
}


function spawnMeteors() {
  if(frameCount%100===0) {
  meteor=createSprite(random(10,width-100),0,50,50)
  meteor.velocityY=10
  meteor.addImage(meteorImg)
  meteor.scale=0.5
  meteorGroup.add(meteor)
  
  
  }
  
  
  
  }
  function gameOver()
  { swal({
    title: `Game Over`, text: "Oops, you died and failed the level...!!!",
 
 imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  imageSize: "100x100", confirmButtonText: "Thanks For Playing"
  },
  function(isConfirm){
    window.location.reload()
  }); }



   function stop() {
    meteorGroup.destroyEach()
//player.remove()
    monster.destroy()
    ground.destroy();
    player.destroy()
   }

   function victory()
   { 
    swal({
    title: `Well Done`, text: "Proceed to the next level....!!!",
  imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fview%2Fthumbs-up-people-joypixels-approved-agreed-gif-17522439&psig=AOvVaw0i6RPw9YKVmHWKICh-w2UX&ust=1645350731328000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjj4qG_i_YCFQAAAAAdAAAAABAN",
   imageSize: "100x100", confirmButtonText: "Move onto the Next Level!"
   });
   }  

   
   function drop(){
    ropeObj.break();
    fruit_con.detatch();
    fruit_con = null; 
   }

  function collide(body,sprite) {

  if(body!=null) {
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)

if(d<height-330) {

World.remove(engine.world,fruit)
fruit=null
return true
}
else{
return false

}
  }

  }