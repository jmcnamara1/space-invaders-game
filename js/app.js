$(function(){
  var gameInterval;
  var bulletInterval;
  var gamerunning = false;
  var bulletCount = 0;
  var score = 0;
  // ===== Target container =======
  var container = $(".container");
  // container coordinates
  var containerLeft = container.offset().left;
  var containerRight = containerLeft + container.width();
  var containerTop = container.offset().top;
  // =====Target start button
  // Initial direction of alien block movement
  var dirx = "+";
  var alienSpeed = 8;
  // Start menu content
  var startMenu = "<div class='start-button'><button type='button' name='button'>Start game</button><h1>Controls</h1><hr><p>Left arrow or a to move left</p><hr><p>Right arrow or d to move right</p><hr><p>Space to shoot</p></div>"
  // Game content
  var gameContent = '<div class="game score"><span class="game score-name">Score:</span> <span class="game score-value"></span></div><div class="game lives"><span class="game life-text">Lives:</span><span class="game life-image"><img class="game ship-life"src="images/ship.png"><img class="game ship-life"src="images/ship.png"><img class="game ship-life"src="images/ship.png"></span></div><div class="game ship"><img class="game ship-image"src="images/ship.png"></div><div class="game aliens"></div>'
  // End menu content
  var endMenu = `<div class="end-menu">Score:<span class="end-score"></span><hr><button type="button" name="button">Back to main menu</button></div>`;
  // Appends start button and instructions to container on page load
  container.append(startMenu);
  //Targets start menu
  var startButton = $(".start-button");



  // ============= Game start from clicking ==============
  startButton.click(function(){
    startButton.remove();
    gamerunning = true;
    if (gamerunning==true){
      // Appends the game features to the container
      container.append(gameContent);
      // Adds initial score
      $(".score-value").html(score);
      // Target ship
      var ship = $(".ship");
      // ship coordinates
      var shipLeft = ship.offset().left;
      var shipRight = shipLeft + ship.width();
      var shipTop = ship.offset().top;
      // Initial ship postion
      var shipx = 450;
      ship.css({
        'left': shipx
      })
      // ===== Alien stuff =========
      // Initial alien position
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
        // Targets added game features
        var game = $(".game");
        // Win condition
          $(".enemy").each(function(){
            var enemyBottom = $(this).offset().top + $(this).height();
            if (enemyBottom>=shipTop) {
              gamerunning = false
              clearInterval(gameInterval)
              game.remove();
              container.append(endMenu);
              $(".end-score").html(score);
            }
          })

      },30);
      gamerunning = true;
      }




    // ============== Control of ship and bullets =================
    $("body").keyup(function(){
      event.preventDefault();
      if (gamerunning) {
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
