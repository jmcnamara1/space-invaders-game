$(function(){
  var gameInterval;
  var gamerunning = false;
  // Target container
  var container = $(".container");
  // container coordinates
  var containerLeft = container.offset().left;
  var containerRight = containerLeft + container.width();

  // Target ship
  var ship = $(".ship");
  // Initial ship postion
  var shipx = 450;
  ship.css({
    'left': shipx
  })

// ===== Alien stuff =========
  // Target aliens
  var aliens = $(".aliens");
  // Initial alien position
  var aliensx = 100;
  var aliensy = 100;
  aliens.css({
    'left': aliensx,
    'top': aliensy
  })
  // Initial direction of alien block movement
  var dirx = "+";
// ============= Alien movement from clicking start ==============
$(".start-button").click(function(){
  if (!gamerunning){
    gameInterval = setInterval(function(){
// ========== coordinates of alienblock ==========

      var aliensLeft = aliens.offset().left;
      var aliensRight = aliensLeft + aliens.width();
      var aliensBottom = aliens.offset().top + aliens.height();

      console.log("dog");

  // Changes postion of the alien block
      if (dirx === "+") {
        aliensx+=1;
      }else if (dirx === "-") {
        aliensx-=1;
      }
      aliens.css({
        'left': aliensx,
        'top': aliensy
      })
  // Changes direction and drops it down a level
      if (aliensRight>=containerRight) {
        aliensy += 20;
        dirx = "-";
      } else if (aliensLeft<=containerLeft) {
        aliensy += 20;
        dirx = "+";
      }

    },50);


    gamerunning = true;
  } else {
    gamerunning = false;
    clearInterval(gameInterval)
  }
})

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
