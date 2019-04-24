$(function(){
  var gameInterval;
  var bulletInterval;
  var gamerunning = false;
  var score = 0;
  var bulletCount = 0;
  // ===== Target container =======
  var container = $(".container");
  // container coordinates
  var containerLeft = container.offset().left;
  var containerRight = containerLeft + container.width();
  var containerTop = container.offset().top;
  // =====Target start button
  // Initial direction of alien block movement
  var dirx = "+";
  var alienSpeed = 1;
  container.append("<div class='start-button'><button type='button' name='button'>Start game</button><h1>Controls</h1><hr><p>Left arrow or a to move left</p><hr><p>Right arrow or d to move right</p><hr><p>Space to shoot</p></div>")
  var startButton = $(".start-button");

  // Initial alien position


  // ============= Game start from clicking ==============
  startButton.click(function(){
    startButton.remove();
    if (!gamerunning){
      container.append('<div class="score"><span class="score-name">Score:</span> <span class="score-value"></span></div><div class="lives"><span class="life-text">Lives:</span><span class="life-image"><img class="ship-life"src="images/ship.png"><img class="ship-life"src="images/ship.png"><img class="ship-life"src="images/ship.png"></span></div><div class="ship"><img class="ship-image"src="images/ship.png"></div><div class="aliens"></div>')
      $(".score-value").html(score);
      var ship = $(".ship");
      // Initial ship postion
      var shipx = 450;
      ship.css({
        'left': shipx
      })
      // ====== Bullet stuff =======
      // ===== Alien stuff =========
      var aliens = $(".aliens");
      var aliensx = 100;
      var aliensy = 100;
      aliens.css({
        'left': aliensx,
        'top': aliensy
      })
      // Target aliens
      function createAliens() {
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
      }
      createAliens();


  // =============Alien block movement interval ==============
      gameInterval = setInterval(function(){
  // ========== coordinates of alienblock ==========
        var aliensLeft = aliens.offset().left;
        var aliensRight = aliensLeft + aliens.width();
    // Changes postion of the alien block
        if (dirx === "+") {
          aliensx+=(2*alienSpeed);
        }else if (dirx === "-") {
          aliensx-=(2*alienSpeed);
        }
        aliens.css({
          'left': aliensx,
          'top': aliensy
        })
    // Changes direction and drops it down a level
        if (aliensRight>=containerRight) {
          aliensy += 15;
          dirx = "-";
        } else if (aliensLeft<=containerLeft) {
          aliensy += 15;
          dirx = "+";
        }
        // Enemy respawn
        var enemyCount = $(".enemy").length
        console.log(enemyCount);
        if (enemyCount == 0) {
          alienSpeed += 1;
          aliensx = 100;
          aliensy = 100;
          aliens.css({
            'left': aliensx,
            'top': aliensy
          })
          dirx = "+"
          createAliens();
        }

      },30);
      gamerunning = true;
      } else {
        gamerunning = false;
        clearInterval(gameInterval)
      }




    // ============== Control of ship and bullets =================
    $("body").keyup(function(){
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
        if (bulletCount<=0) {
          if (event.key == " ") {
            bulletCount++
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
                    score+=1000
                    $(".score-value").html(score);
                    if (bulletCount=1) {
                      bulletCount--
                    }
                    clearInterval(bulletInterval)
                    return false
                  } else if (bulletTop<=containerTop) {
                    bullet.remove()
                    if (bulletCount=1) {
                      bulletCount--
                    }
                    clearInterval(bulletInterval)
                    return false
                  }
                })
              })
            },20);
          }
        // Bullet count limit end
        }
      // game running end
      }
    // Keyup end
    })






  // Start button click function
  })
// End of $(function)
})
