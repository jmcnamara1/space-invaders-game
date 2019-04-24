$(function(){
  var gameInterval;
  var bulletInterval;
  var gamerunning = false;
  // Target container
  var container = $(".container");
  // container coordinates
  var containerLeft = container.offset().left;
  var containerRight = containerLeft + container.width();
  var containerTop = container.offset().top;
  // ==== Target ship =====
  var ship = $(".ship");
  // Initial ship postion
  var shipx = 450;
  ship.css({
    'left': shipx
  })
  // ====== Bullet stuff =======
  var bulletCount = 0;
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
  // =============Alien block movement interval ==============
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
        shipx-=50;
        } else if ((event.key == "d" || event.key == "ArrowRight") && (shipRight<containerRight)) {
        shipx+=50;
      }
      ship.css({
        'left': shipx+'px'
      })


      // Bullet stuff
      if (bulletCount<1) {
        if (event.key == " ") {
          bulletCount++
          console.log(bulletCount);
          $('.container').append(`<div class="bullet bullet${bulletCount}"><img class="bullet-img"src="images/bullet.png" alt="Bullet"></div>`);
          // Target bullet
          var bullet = $(`.bullet${bulletCount}`);
          // Initial bullet position
          var bullety = 20 + ship.height();
          var bulletx = shipx + ship.width()/2 - 3;
          bullet.css({
            "left":bulletx,
            "bottom":bullety })


          // ==== Interval of bullet =====
          bulletInterval = setInterval(function(){
            // Adjusts bullet position
            bullety+=10;
            bullet.css({
              "bottom":bullety
            })

            $(".bullet").each(function(){
              var bulletTop = $(this).offset().top;
              var bulletBottom = bulletTop + $(this).height();
              var bulletLeft = $(this).offset().left;
              var bulletRight = bulletLeft + $(this).width();
              $(".enemy").each(function(){
                var enemyLeft = $(this).offset().left;
                var enemyRight = enemyLeft + $(this).width();
                var enemyTop = $(this).offset().top;
                var enemyBottom = $(this).offset().top + $(this).height();
                if (bulletTop<=enemyBottom && bulletLeft<= enemyRight && bulletRight>=enemyLeft && bulletBottom>=enemyTop) {
                  $(this).remove();
                  bullet.remove();
                  bulletCount--
                  return false
                } else if (bulletBottom<=containerTop) {
                  bullet.remove()
                  bulletCount--
                  return false
                }
              })
            })

          },20);
        }
      }
      // game running end
    }
    // Key down end
  })
// End of $(function)
})
