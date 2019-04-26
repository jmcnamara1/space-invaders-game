$(function(){
  var gameInterval, bulletInterval;
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
    alienSpeed = 1;
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
      // Targets alien movement block
      var aliens = $(".aliens");
      // Initial alien position
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
          aliensx+=(1*alienSpeed);
        }else if (dirx === "-") {
          aliensx-=(1*alienSpeed);
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
        // ======= Enemy respawn =========
        // keeps count of the amount of enemies with length of array
        var enemyCount = $(".enemy").length
        // if array length == 0 then there are no enemies
        if (enemyCount == 0) {
          alienSpeed += 1;
          aliensx = 100;
          aliensy = 100;
          aliens.css({
            'left': aliensx,
            'top': aliensy
          })
          createAliens();
        }
        // Targets added game features
        var game = $(".game");

        // ======== Loss condition =========
        $(".enemy").each(function(){
          var enemyBottom = $(this).offset().top + $(this).height();
          if (enemyBottom>=shipTop) {
            // Switches to end screen
            container2.css({
              'display': 'none'
            })
            container3.css({
              'display': 'block'
            })
            // Removes any enemies or bullets still on screen
            $(".enemy").remove();
            $(".bullet").remove();
            // Resets bullet count
            bulletCount = 0;
            $(".end-score").html(score);
            gamerunning = false;
            // Stops game running
            clearInterval(gameInterval)
          }
        })
      },30);
    // If game running end squiggle
    }
  // Start button click end squiggle
  })

  // ============== Control of ship and bullets =================
  $("body").keyup(function(){
    event.preventDefault();
    if (gamerunning) {
      // ship controls
      // a and left arrow to go left - d and right arrow to go right
      // moves ship by a distance equal to shipSpeed
      if ((event.key == "a" || event.key == "ArrowLeft") && (shipLeft>containerLeft)) {
        shipx-=shipSpeed;
      } else if ((event.key == "d" || event.key == "ArrowRight") && (shipRight<containerRight)) {
        shipx+=shipSpeed;
      }
      // Adjusts position of ship with css
      ship.css({
        'left': shipx
      })
      // ============= Bullet creation and interaction =================
      // bulletCount to limit the bullets on screen to a max of 1
      if (bulletCount<=0) {
        if (event.key == " ") {
          // On space bar press increment bulletCount by 1
          bulletCount++
          // Appends a bullet to the container
          $('.container2').append(`<div class="bullet bullet${bulletCount}"><img class="bullet-img"src="images/bullet.png" alt="Bullet"></div>`);
          // Targets the created bullet
          var bullet = $(`.bullet${bulletCount}`);
          // Sets initial bullet position
          var bullety = 20 + ship.height();
          var bulletx = shipx + ship.width()/2 - 3;
          bullet.css({
            "left":bulletx,
            "bottom":bullety
          })
            //Interval created for the bullet
            bulletInterval = setInterval(function(){
              // Adjusts bullets y position
              bullety+=10;
              bullet.css({
                "bottom":bullety
              })
              // Function to check if bullets hit enemies
              $(".bullet").each(function(){
                // Tracks coordinates of bullet
                var bulletTop = $(this).offset().top;
                var bulletBottom = bulletTop + $(this).height();
                var bulletLeft = $(this).offset().left;
                var bulletRight = bulletLeft + $(this).width();
                $(".enemy").each(function(){
                  // Tracks coordinates of each enemy
                  var enemyLeft = $(this).offset().left;
                  var enemyRight = enemyLeft + $(this).width();
                  var enemyTop = $(this).offset().top;
                  var enemyBottom = $(this).offset().top + $(this).height();
                  // Checks if coordinates overlap
                  if (bulletTop<=enemyBottom && bulletLeft<= enemyRight && bulletRight>=enemyLeft && bulletBottom>=enemyTop) {
                    // Removes the enemy hit
                    $(this).remove();
                    // Removes the bullet
                    bullet.remove();
                    // Adds to the score
                    score+=1000
                    // Updates the score
                    $(".score-value").html(score);
                    // Keeps bulletcount at 0 after hit and 1 before hit
                    if (bulletCount=1) {
                      bulletCount--
                    }
                    // Clears bullet interval
                    clearInterval(bulletInterval)
                    return false
                    // Checks if bullet misses all enemies and hits top wall
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
