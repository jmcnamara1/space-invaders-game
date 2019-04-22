$(function(){
  // Target container
  var container = $(".container");
  // Target ship
  var ship = $(".ship");
  var shipwidth = ship.width();
  // Initial ship postion
  var shipx = 450;
  ship.css({
    'left': shipx
  })

$("body").keydown(function(){
  // coordinates of container walls
  var containerLeft = container.offset().left;
  var containerRight = containerLeft + container.width();
  // coordinates of ship walls
  var shipLeft = ship.offset().left;
  var shipRight = shipLeft + ship.width();

  if ((event.key == "a" || event.key == "ArrowLeft") && (shipLeft>containerLeft)) {
    console.log("dog");
    console.log(shipx);
    shipx-=50;
  } else if ((event.key == "d" || event.key == "ArrowRight") && (shipRight<containerRight)) {
    console.log("cat");
    console.log(containerRight);
    shipx+=50;
  }
  ship.css({
    'left': shipx+'px'
  })
})


})
