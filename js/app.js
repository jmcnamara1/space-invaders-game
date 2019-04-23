$(function(){
  var gameInterval;
  var bulletInterval;
  var gamerunning = false;
  // Target container
  var container = $(".container");
  // container coordinates
  var containerLeft = container.offset().left;
  var containerRight = containerLeft + container.width();

  // ==== Target ship =====
  var ship = $(".ship");
  // Initial ship postion
  var shipx = 450;
  ship.css({
    'left': shipx
  })
  // ====== Bullet stuff =======
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
  // Target alien rows

  // Initial direction of alien block movement
  var dirx = "+";
  // ============= Alien movement from clicking start ==============
  $(".start-button").click(function(){
    if (!gamerunning){
      for (var i = 0; i < 10; i++) {
        aliens.append('<img class="alien1 cell[i]" src="images/alien1.png">')
      }
      for (var i = 0; i < 10; i++) {
        aliens.append('<img class="alien2 cell[i]" src="images/alien2.png">')
      }
      for (var i = 0; i < 10; i++) {
        aliens.append('<img class="alien1 cell[i]" src="images/alien1.png">')
      }
      for (var i = 0; i < 10; i++) {
        aliens.append('<img class="alien2 cell[i]" src="images/alien2.png">')
      }

      gameInterval = setInterval(function(){
  // ========== coordinates of alienblock ==========

        var aliensLeft = aliens.offset().left;
        var aliensRight = aliensLeft + aliens.width();
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

  // ============== Control of ship and bullets =================
  $("body").keydown(function(){
    if (gamerunning) {
      // coordinates of ship walls
      var shipLeft = ship.offset().left;
      var shipRight = shipLeft + ship.width();
      // ship controls
      if ((event.key == "a" || event.key == "ArrowLeft") && (shipLeft>containerLeft)) {
        console.log("left");
        shipx-=50;
        } else if ((event.key == "d" || event.key == "ArrowRight") && (shipRight<containerRight)) {
        console.log("right");
        shipx+=50;
      }
      ship.css({
        'left': shipx+'px'
      })
      // Bullet stuff
      if (event.key == " ") {
        $('.container').append('<div class="bullet"><img class="bullet-img"src="images/bullet.png" alt="Bullet"></div>');
        // Target bullet
        var bullet = $(".bullet");
        // Initial bullet position
        var bullety = 20 + ship.height();
        var bulletx = shipx + ship.width()/2 - 3;
        var row1 = $(".row1");
        var row2 = $(".row2");
        var row3 = $(".row3");
        var row4 = $(".row4");

        bullet.css({
          "left":bulletx,
          "bottom":bullety
        })
        // ==== Interval of bullet =====
        bulletInterval = setInterval(function(){
          // Bullet coordinates
          var bulletTop = bullet.offset().top;
          // Alien coordinates
          var aliensBottom = aliens.offset().top + aliens.height();

          bullety+=10;
          bullet.css({
            "bottom":bullety
          })
          if (bulletTop<=aliensBottom) {
            console.log("contact row 1");
            bullet.remove();
          }

        },20);
      }
    }
  })
// End of $(function)
})
