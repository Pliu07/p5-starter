
//Little farm
let organisms = [];
tigerButton.addEventListener("click", createTiger);
pigButton.addEventListener('click', createPig);
chickButton.addEventListener('click', createChick);
apocolypseButton.addEventListener('click', apocalypse);
famineButton.addEventListener('click', famine);



function drawPig(x,y,radius, color){
  fill(color);
  noStroke();
  circle(x,y,radius)
}

function drawTiger(x,y,radius, color){
  fill(color);
  noStroke();
  circle(x,y,radius)
}

function drawChick(x,y,radius, color){
  fill(color);
  noStroke();
  circle(x,y,radius) 
}

function createPig(){
  let velocityX = random(0,10)
      let velocityY = random(0,10)
      let randomX = floor(random(0,windowWidth))
      let randomY = floor(random(0, windowHeight))
      let randomSize = floor(random(90, 120))
      let animal = new Pig('pig', randomX, randomY, randomSize, color('pink'), velocityX, velocityY)
      organisms.push(animal)
}
function createTiger(){
  let velocityX = random(5,10)
  let velocityY = random(5,10)
      let randomX = floor(random(0,windowWidth))
      let randomY = floor(random(0, windowHeight))
      let randomSize = floor(random(150, 200))
      
      let animal = new Tiger('tiger', randomX, randomY, randomSize, color('orange'), velocityX, velocityY)
      organisms.push(animal)
}

function createChick(){
    let velocityX = random(100,110)
    let velocityY = random(100,110)
    let randomX = floor(random(0,windowWidth))
    let randomY = floor(random(0, windowHeight))
    let randomSize = floor(random(20, 30))
    let animal = new Chick('chick', randomX, randomY, randomSize, color('yellow'), velocityX, velocityY)
    organisms.push(animal)
}

class Animals {
 
  constructor(name,posX, posY, size, color, dx, dy, ) {
    this.name = name
    this.posX = posX;
    this.posY = posY;
    this.size = size
    this.color = color
    this.dx = dx;
    this.dy = dy;
  }
  move(){
    this.posX += this.dx;
    this.posY += this.dy;

  
  if(this.posX < 0 || this.posX > windowWidth) {
    this.dx *= -1;
  }
  if(this.posY < 0 || this.posY > windowHeight) {
    this.dy *= -1;
  }

  }
  display(){

  }
}

class Pig extends Animals {
  move(){
    super.move();
  }
  display(){
    drawPig(this.posX, this.posY, this.size, this.color)
  }
}

class Tiger extends Animals{
  move(){
    super.move();
  }
  display(){
    drawTiger(this.posX, this.posY, this.size, this.color)

  }
}
class Chick extends Animals{
  move(){
    super.move();
  }
  display(){
    drawChick(this.posX, this.posY, this.size, this.color)
  }
}

function setup(){


  createCanvas(windowWidth, windowHeight);
  background(100);

  for(let i = 0; i<3 ; i++){


    let currentNum = floor(random(1,4));
    if(currentNum==1){
      createPig();
      
    } else if(currentNum == 2){
      createTiger();


    }else if(currentNum ==3){
      createChick();
    }

     
    }
}
   
  


function  draw(){
  background(100);
  for(let i = 0; i<organisms.length; i++){
    organisms[i].display();
    organisms[i].move();

  }

   Eating();
} 



/*function countPopulation(){

    let pigCount = 0;
    let tigerCount = 0;
    let chickCount = 0;
  for(let i = 0; i<organisms.length; i++){

    if(organisms[i].name == 'pig'){
      pigCount +=1;
    }else if(organisms[i].name == 'tiger'){
      tigerCount +=1;
    }else if(organisms[i].name == 'chick'){
      chickCount += 1;
    }
  }

  return {pigCount, tigerCount, chickCount};
} */


function countPigPopulation(){
  let pigCount = 0;
  for(let i = 0; i<organisms.length; i++){

    if(organisms[i].name == 'pig'){
      pigCount +=1;
    }
  }
  return pigCount
}

function countTigerPopulation(){
  let tigerCount = 0;
  for(let i = 0; i<organisms.length; i++){

    if(organisms[i].name == 'tiger'){
      tigerCount +=1;
    }
  }
  return tigerCount
}

function countChickPopulation(){
  let chickCount = 0;
  for(let i = 0; i<organisms.length; i++){

    if(organisms[i].name == 'chick'){
      chickCount +=1;
    }
  }
  return chickCount
}

function isTouching(animal1, animal2) {
  let distance = dist(animal1.posX, animal1.posY, animal2.posX, animal2.posY);
  return distance < (animal1.size / 2 + animal2.size / 2);
}

//when tiger touches pig and chick, animal becomes tiger.
//when pig touch chick, chick becomes tiger
function Eating() {
  for (let i = 0; i < organisms.length; i++) {
    for (let j = i + 1; j < organisms.length; j++) {
      let animal1 = organisms[i];
      let animal2 = organisms[j];

      if (isTouching(animal1, animal2)) {
        if (animal1.name === 'tiger' && (animal2.name === 'pig' || animal2.name === 'chick')) {
          organisms[j] = new Tiger('tiger', animal2.posX, animal2.posY, floor(random(150, 200)), color('orange'), random(5, 10), random(5, 10));
        } 
        else if (animal2.name === 'tiger' && (animal1.name === 'pig' || animal1.name === 'chick')) {
          organisms[i] = new Tiger('tiger', animal1.posX, animal1.posY, floor(random(150, 200)), color('orange'), random(5, 10), random(5, 10));
        }
        if (animal1.name === 'pig' && animal2.name === 'chick') {
          organisms[j] = new Pig('pig', animal2.posX, animal2.posY, floor(random(90, 120)), color('pink'), random(0, 10), random(0, 10));
        } 
        else if (animal1.name === 'chick' && animal2.name === 'pig') {
          organisms[i] = new Pig('pig', animal1.posX, animal1.posY, floor(random(90, 120)), color('pink'), random(0, 10), random(0, 10));
        }
      }
    }
  }
}



function populationControl() {
  if (countTigerPopulation() === 3) {
    for (let k = 0; k < 3; k++) {
      createPig();
    }
  }
  if (organisms.length == 0) {
    return; 
  }

  let pigs = countPigPopulation();
  let tigers = countTigerPopulation();
  let chicks = countChickPopulation();

  if (chicks < 3 && pigs > 3) {
    for (let i = organisms.length - 1; i >= 0; i--) {
      if (organisms[i].name === "pig" && pigs > 3) {
        organisms.splice(i, 1); 
        pigs--;
      }
    }
  }

  if (pigs < 3 && tigers > 3) {
    for (let i = organisms.length - 1; i >= 0; i--) {
      if (organisms[i].name === "tiger" && tigers > 3) {
        organisms.splice(i, 1);
        tigers--;
      }
    }
  }

  if (tigers < 3 && chicks < 6) {
    while (countChickPopulation()< 6){
      createChick();
    }
  }

  if (chicks >= 6 && pigs < 5) {
    while (countPigPopulation() <5){
      createPig();
    }
  }


  if (tigers > 4) {
    let tigerSeen = false;
    for(let i = 0; i < organisms.length; i++){
      if(organisms[i].name == "tiger"){
        if(!tigerSeen){
          tigerSeen = true; 
        } else{
          organisms[i] = new Chick("chick", organisms[i].posX,organisms[i].posY, floor(random(20, 30)),color("yellow"),random(100, 110), random(100, 110)
          );
        }
      }
    }
  }
}

function apocalypse() {
  organisms = [];
}

function famine() {
  let pigsRemoved = 0;
  for (let i = organisms.length - 1; i >= 0; i--) {
    if (organisms[i].name === "pig" && countPigPopulation() > 2 && pigsRemoved < 2) {
      organisms.splice(i, 1);
      pigsRemoved++;
    }
  }

  let tigersRemoved = 0;
  for (let i = organisms.length - 1; i >= 0; i--) {
    if (organisms[i].name === "tiger" && countTigerPopulation() > 2 && tigersRemoved < 2) {
      organisms.splice(i, 1);
      tigersRemoved++;
    }
  }


  let chicksRemoved = 0;
  for (let i = organisms.length - 1; i >= 0; i--) {
    if (organisms[i].name === "chick" && countChickPopulation() > 2 && chicksRemoved < 2) {
      organisms.splice(i, 1);
      chicksRemoved++;
    }
  }
}


setInterval(populationControl, 3000);

//when chick population reaches below 3, pig population drop to 3
//when pig population drop to 3, drop tiger population down to 3
//when tiger population drop to 3, pig population increaes by 3
//when chick population goes up to 6, pig population goes up to 5
//apocolypse, everything dies
//famine, all populations greater than 2 drops by 2











