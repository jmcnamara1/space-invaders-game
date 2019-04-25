$(function(){
  var gameInterval;
  var bulletInterval;
  var gamerunning = false;
  var bulletCount = 0;
  var score = 0;
  // ===== Target main container =======
  var container = $(".container");
  // container coordinates
  var containerLeft = container.offset().left;
  var containerRight = containerLeft + container.width();
  var containerTop = container.offset().top;
  // Target for each container/page
  var container1 = $(".container1");
  var container2 = $(".container2");
  var container3 = $(".container3");
  // =====Target start button
  var startButton = $(".start-button");
  // Initial direction of alien block movement
  var dirx = "+";
  // Initial alien speed
  var alienSpeed;
  // Sets inital score into html
  $(".score-value").html(score);

  var ship = $(".ship");
  var shipx;
  var shipSpeed;


    // ============= Game start from clicking ==============
    startButton.click(function(){
      // Initial values set every time a
      dirx = "+";
      alienSpeed = 8;
      shipSpeed = 50;
      score = 0;
      $(".score-value").html(score);
      // Switches to game screen
      container1.css({
        'display': 'none'
      })
      container2.css({
        'display': 'block'
      })
      
      gamerunning = true;
      if (gamerunning==true){
        // // Initial ship postion
        shipx = 450;
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

          shipLeft = ship.offset().left;
          shipRight = shipLeft + ship.width();
          shipTop = ship.offset().top;
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

          // ======== Loss condition =========
          $(".enemy").each(function(){
            var enemyBottom = $(this).offset().top + $(this).height();
            if (enemyBottom>=shipTop) {
              // Clears game container
              container2.css({
                'display': 'none'
              })
              container3.css({
                'display': 'block'
              })
              $(".enemy").remove();
              $(".bullet").remove();
              bulletCount = 0;
              $(".end-score").html(score);
              gamerunning = false;
              // Stops game running
              clearInterval(gameInterval)
            }
          })

        },30);

      // If game running end
      }

        // ============== Control of ship and bullets =================
          $("body").keyup(function(){
          event.preventDefault();
          if (gamerunning) {
            // ship controls
            if ((event.key == "a" || event.key == "ArrowLeft") && (shipLeft>containerLeft)) {
              shipx-=shipSpeed;
            } else if ((event.key == "d" || event.key == "ArrowRight") && (shipRight<containerRight)) {
              shipx+=shipSpeed;
            }
            // Adjust position of ship
            ship.css({
              'left': shipx
            })

            // Bullet stuff
            if (bulletCount<=0) {
              if (event.key == " ") {
                bulletCount++
                console.log(shipx);
                // Creates bullet on click
                $('.container2').append(`<div class="bullet bullet${bulletCount}"><img class="bullet-img"src="images/bullet.png" alt="Bullet"></div>`);
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

  // Firstmenu end
  var endButton = $(".end-button");
  endButton.click(function(){
      // Switches to main menu screen
      container3.css({
        'display': 'none'
      })
      container1.css({
        'display': 'block'
      })
    })
// End of $(function)
})
