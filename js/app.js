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
      aliens.append('<table><tr class="row1"><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th></tr><tr class="row2"><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th></tr><tr class="row3"><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th><th><img class="alien1" src="images/alien1.png" ></th></tr><tr class="row4"><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th><th><img class="alien2" src="images/alien2.png" ></th></tr></table>')
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
          var row1Bottom = row1.offset().top + row1.height();
          var row2Bottom = row2.offset().top + row2.height();
          var row3Bottom = row3.offset().top + row3.height();
          var row4Bottom = row4.offset().top + row4.height();

          bullety+=10;
          bullet.css({
            "bottom":bullety
          })
          if (bulletTop<=row1Bottom) {
            console.log("contact row 1");
            bullet.remove();
          }else if (bulletTop<=row2Bottom) {
            console.log("contact row 2");
            bullet.remove();
          }

        },20);
      }
    }
  })
// End of $(function)
})
