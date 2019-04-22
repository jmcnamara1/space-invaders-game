$(function(){
  var gamerunning = false;
  // Target container
  var container = $(".container");
  // Target ship
  var ship = $(".ship");
  // Initial ship postion
  var shipx = 450;
  ship.css({
    'left': shipx
  })
  // Target aliens
  var aliens = $(".aliens");
  // Initial alien position
  var aliensx = 170;
  var aliensy = 100;
  aliens.css({
    'left': aliensx,
    'top': aliensy
  })

$(".start-button").click(function(){


})


var containerLeft = container.offset().left;
var containerRight = containerLeft + container.width();

// ============== Control of ship ============================
$("body").keydown(function(){
  // coordinates of container walls
  // coordinates of ship walls
  var shipLeft = ship.offset().left;
  var shipRight = shipLeft + ship.width();

  if ((event.key == "a" || event.key == "ArrowLeft") && (shipLeft>containerLeft)) {
    console.log("left");
    console.log(shipx);
    shipx-=50;
    } else if ((event.key == "d" || event.key == "ArrowRight") && (shipRight<containerRight)) {
    console.log("right");
    console.log(containerRight);
    shipx+=50;
  }
  ship.css({
    'left': shipx+'px'
  })
})

})
