// Add pictures tp the icons for each station
// Actually add the g2nd and 3rd game (adventure story and turn based rpg "1 battle")
// Add instructions
// Set up readME and other necessities for submission
// Add comments explaining general ideas and concepts

var character = document.querySelector(".character");
var map = document.querySelector(".map");
var tree = document.querySelector(".smalltree");
var chest = document.querySelector(".chest");
var door = document.querySelector(".exitdoors");
var boxIcon = document.querySelector(".boxicon");
var chestIcon = document.querySelector(".chesticon");
var doorIcon = document.querySelector(".dooricon");
var statueIcon = document.querySelector(".statueicon");
var headline = document.querySelector(".headline");
var gameframe = document.querySelector(".frame");

// Start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   
   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = -16;
   var bottomLimit = (16 * 8);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }

   
   //Activities (game updating based on player's position on map)
    if (x < 38 && y < 24 ){
       //pill of boxes (top left)
        boxIcon.style.display = "block";
        headline.style.display = "block";
    } 
    else if ( x > 156 && y > 51 && y < 90 ){
       //statue (middle right)
        statueIcon.style.display = "block";
        headline.style.display = "block";
    }
    else if (x < 26 && x > -12 && y > 90 && y < 125){
        //chest (bottom left)   
        chest.style.backgroundImage = "url('Assets/prop06.png')";
        chest.style.width = "64px";
        chestIcon.style.display = "block";
        headline.style.display = "block";
    } 
    else if (y < 10 && x > 65 && x < 125){
        //door (top center)   
        door.style.backgroundImage = "url('Assets/prop08.png')";
        doorIcon.style.display = "block";
        headline.style.display = "block";
    } else {
        document.querySelector(".chest").style.backgroundImage = "url('Assets/prop05.png')";
        document.querySelector(".exitdoors").style.backgroundImage = "url('Assets/prop07.png')";
        boxIcon.style.display = "none";
        statueIcon.style.display = "none";
        chestIcon.style.display = "none";
        doorIcon.style.display = "none";
        headline.style.display = "none";    
    }

   var camera_left = pixelSize * 66;
   var camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});

document.addEventListener('keypress', e => { 
   //console.log(e.key); for testing 
   if (e.key == "Enter" && x < 38 && y < 24){
      location.assign("turnbase-rpg.html");
   }
   else if (e.key == "Enter" && x > 156 && y > 51 && y < 90){
      location.assign("brickbreak.html");
   } 
   else if (e.key == "Enter" && x < 26 && x > -12 && y > 90 && y < 125){
      location.assign("pixelart-maker.html");
   } 
   else if (e.key == "Enter" && y < 10 && x > 65 && x < 125){
      // Exit the window when you press enter by the doors,
      // NOTE: Only Windows opened from Javascript "Windows.open()" allows .close() to work, so when I switched between the different html files, 
      // the window.close turns obsolete
      window.close();     
   }
});



