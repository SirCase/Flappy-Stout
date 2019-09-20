/**
 *  handleShipAnimation moves the ship based on its direction and
 *    keyboard control
 *
 */
function handleShipAnimation() {
  if (CONTROLS.ship.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x += SPACE_SHIP.speed * sin;
    SPACE_SHIP.y +=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.backward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x -= SPACE_SHIP.speed * sin;
    SPACE_SHIP.y -=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.rotateClockwise) {
    SPACE_SHIP.rotation -= 4;
  }
  if (CONTROLS.ship.rotateCounterClockwise) {
    SPACE_SHIP.rotation += 4;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}

function RenderNewObject(context) {
  context.beginPath();
  context.strokeStyle = "rgb("+DIMENSIONS.r+", "+DIMENSIONS.g+", "+DIMENSIONS.b+")";
  context.ellipse(DIMENSIONS.x, DIMENSIONS.y, DIMENSIONS.width, DIMENSIONS.height, 0, 0, 360);
  context.stroke();
}

function HandleNewObjectMovement() {

  ///////////////////////////////////////////////////////////////////
  //FOR MORE INFORMATION ABOUT EACH OF THE VARIABLES, SEE CONFIG.JS//
  ///////////////////////////////////////////////////////////////////

  //Height and width pulsate between 25 and 75
  if (DIMENSIONS.width > 75 || DIMENSIONS.width < 25)
    DIRECTION.x = -DIRECTION.x;
  ;
  if (DIMENSIONS.height > 75 || DIMENSIONS.height < 25)
    DIRECTION.y = -DIRECTION.y;
  ;
  //RGB values range between 0 and 255. They increment by the same amount but are offset 100 from each other in terms of starting position
  if (DIMENSIONS.r > 255 || DIMENSIONS.r < 0)
    DIRECTION.r = -DIRECTION.r;
  ;
  if (DIMENSIONS.g > 255 || DIMENSIONS.g < 0)
    DIRECTION.g = -DIRECTION.g;
  ;
  if (DIMENSIONS.r > 255 || DIMENSIONS.b < 0)
    DIRECTION.b = -DIRECTION.b;
  ;
  //If the x or y position go out of the canvas , wrap it around to the other side of the screen
  if (DIMENSIONS.x - DIMENSIONS.width > GAME.canvas.width)
    DIMENSIONS.x = 0-DIMENSIONS.width;
  ;
  if (DIMENSIONS.y - DIMENSIONS.height > GAME.canvas.height)
    DIMENSIONS.y = 0-DIMENSIONS.height;
  ;
  //Increments all of the necessary variables, x and y by random amounts
  DIMENSIONS.width += DIRECTION.x;
  DIMENSIONS.height += DIRECTION.y;
  DIMENSIONS.r += 5 * DIRECTION.r;
  DIMENSIONS.g += 5 * DIRECTION.g;
  DIMENSIONS.b += 5 * DIRECTION.b;
  DIMENSIONS.x += Math.random() * 3;
  DIMENSIONS.y += Math.random() * 2;

}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {

    // 1 - Reposition the objects
    RenderNewObject(context);
    HandleNewObjectMovement();
    handleShipAnimation();
    HandleNewObjectMovement();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);

    // 3 - Draw new items
    RenderSpaceship(context);
    RenderNewObject(context);
  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
