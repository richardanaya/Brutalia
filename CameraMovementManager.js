// TODO: add top and bottom walls as well for inital implementation then we can get fancy :)
CameraMovementManager = function(player, backgroundObjectContainer){
	// temp solution
	var CAMERA_BUFFER = 120;
	var leftWallX = player.position.x - CAMERA_BUFFER;
	var rightWallX = player.position.x + player.width + CAMERA_BUFFER;
	var backgroundContainer = backgroundObjectContainer;

	var update = function(){
		// TODO: do some approximations on this and the next check because the sprite is constantly updating its x position while
		// animating and it can cause jerky movement even though the player is not moving
		if(player.position.x < leftWallX){
			leftWallX = player.position.x;
			rightWallX = player.position.x + player.width + CAMERA_BUFFER;
			backgroundContainer.position.x += 2.5;
		}
			
		if(player.position.x + player.width > rightWallX){
			rightWallX = player.position.x + player.width;
			leftWallX = player.position.x - CAMERA_BUFFER;
			backgroundContainer.position.x -= 2.5;
		}
	};
	
	return {
		update: update
	}
};