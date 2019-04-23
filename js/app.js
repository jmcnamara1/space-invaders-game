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
  // Initial direction of alien block movement
  var dirx = "+";


  // ============= Alien movement from clicking start ==============
  $(".start-button").click(function(){
    if (!gamerunning){
      for (var i = 0; i < 10; i++) {
        aliens.append(`<img class="row1 alien2 enemy" src="images/alien2.png">`)
      }
      $(".row1").each(function(index){
        $(this).css({"left":index*65})
      })

      for (var i = 0; i < 10; i++) {
        aliens.append(`<img class="row2 alien1 enemy" src="images/alien1.png">`)
      }
      $(".row2").each(function(index){
        $(this).css({"left":index*65, "top":65})
      })

      for (var i = 0; i < 10; i++) {
        aliens.append(`<img class="row3 alien2 enemy" src="images/alien2.png">`)
      }
      $(".row3").each(function(index){
        $(this).css({"left":index*65, "top":130})
      })

      for (var i = 0; i < 10; i++) {
        aliens.append(`<img class="row4 alien1 enemy" src="images/alien1.png">`)
      }
      $(".row4").each(function(index){
        $(this).css({"left":index*65, "top":195})
      })

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
        bullet.css({
          "left":bulletx,
          "bottom":bullety
        })

        var row1 = $(".row1");
        var row2 = $(".row2");
        var row3 = $(".row3");
        var row4 = $(".row4");


        // ==== Interval of bullet =====
        bulletInterval = setInterval(function(){
          // Bullet coordinates
          var bulletTop = bullet.offset().top;
          var bulletLeft = bullet.offset().left;
          var bulletRight = bulletLeft + bullet.width();
          // Adjusts bullet position
          bullety+=10;
          bullet.css({
            "bottom":bullety
          })
          // ========= Alien row bottom coordinates ===========
          var row1Bottom = row1.offset().top + row1.height();
          var row2Bottom = row2.offset().top + row2.height();
          var row3Bottom = row3.offset().top + row3.height();
          var row4Bottom = row4.offset().top + row4.height();
          // ======== Individual alien left coordinates ========
          //  Row 4
          var row4Coors = [];
          row4.each(function(index){
            var left = $(this).offset().left;
            var right = left + $(this).width();
            row4Coors[index] = left;
          })
          // Row 3
          var row3Coors = [];
          row3.each(function(index){
            var left = $(this).offset().left;
            var right = left + $(this).width();
            row3Coors[index] = left;
          })
          // Row 2
          var row2Coors = [];
          row2.each(function(index){
            var left = $(this).offset().left;
            var right = left + $(this).width();
            row2Coors[index] = left;
          })
          // Row 1
          var row1Coors = [];
          row1.each(function(index){
            var left = $(this).offset().left;
            var right = left + $(this).width();
            row1Coors[index] = left;
          })
          // =================================================
          if (bulletTop<=row1Bottom && bulletLeft>=row1Coors[0] &&  bulletRight<=(row1Coors[0]+65)) {
            console.log("contact row 1");
            bullet.remove();
            row1[0].remove();
          }

        },20);
      }
    }
  })
// End of $(function)
})
