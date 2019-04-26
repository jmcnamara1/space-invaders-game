# space-invaders-game

Space Invaders is a classic arcade game created in 1978 by Tomohiro Nishikado. The objective of the game is to shoot and destroy the invading alien ships before they reach you.

This object of this project was to create a game inspired by the classic, Space Invaders using the following languages:

- HTML 
- CSS
- JavaScript
- JQuery

## Play the Game
https://jmcnamara1.github.io/space-invaders-game/

A and D - Moves left and right 

Space - Shoots bullet

Click start when you are ready to play!

## Development
- The game cycles between 3 containers/screens
	- Start menu
	- Game screen
	- End menu
-	It transitions between seperate containers by setting 'display':'block'; for the container that needs to display and sets the others to have 'display':'none'.
-  The ship is controlled with an eventListener for each keyup. The sideways movement is set to be controlled by A and D keyups aswell as the left and right arrow key ups.  
-  Bullet firing is controlled with an eventListener for the space key.
-  The alien movement is controlled by a div element that moves side to side and when coming into contact with a container wall it will change direction and drop down x amount of pixels.
-  Aliens are spawned onto the movement div with a for loop
- Interactions between the bullet and aliens is completed by having a loop track the coordinates of the bullets and each alien. If the coordinates overlap, the specific alien and bullet are removed.
- Once all aliens are removed, the movement div resets position and gets more aliens re-attached.  The movement speed is also increased.
- Game ends when the bottom coordinates of any alive alien reaches the top coordiantes of the ship
- Game ending causes the screen to automatically switch to end menu  

## Bugs

- Reducing the screen size mid game will cause the boundaries to shift/collapse. 
	- Causes the aliens to float out of sync with the black container.
	- Allows the ship to be moved outside of the black container
	
## Further Improvements

- Add multiple lives feature
- Add bullets fired from enemies
	- Varying intensity depending on how many enemies left 
- Add breakable "walls" just above ship position
- Add special ship that spawns above enemies and gives bonus points
- Add score board that shows highest scores