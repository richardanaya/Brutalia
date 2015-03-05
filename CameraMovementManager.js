// TODO: add top and bottom walls as well for inital implementation then we can get fancy :)
function contains(states, state){
	for(var i = 0; i < states.length; i++){
		if(states[i] === state){
			return true;
		}
	}
	return false;
};
CameraMovementManager = function(player){
	// temp solution
	var CAMERA_BUFFER = 300;
	var leftWallX = player.position.x - CAMERA_BUFFER;
	var rightWallX = player.position.x + player.width + CAMERA_BUFFER;

	var parallaxLayerList = [];
	var groundLayerList = [];
	var playerLastPosition = new PIXI.Point(player.position.x, player.position.y);
	var update = function(){
		if(contains(player.states, STATES.MOVING)) {
			if ((contains(player.states, STATES.MOVING) && player.position.x - playerLastPosition.x) > 0) {
				parallaxLayerList.forEach(function (layer) {
					layer.update(true);
				});

			}
			if (player.position.x - playerLastPosition.x < 0) {
				parallaxLayerList.forEach(function (layer) {
					layer.update(false);
				});
			}
		}
		// TODO: do some approximations on this and the next check because the sprite is constantly updating its x position while
		// animating and it can cause jerky movement even though the player is not moving
		if(player.position.x < leftWallX){
			leftWallX = player.position.x;
			rightWallX = player.position.x + player.width + CAMERA_BUFFER;
			groundLayerList.forEach(function(layer){
				layer.update(false);
			});
		}
		if(player.position.x + player.width > rightWallX){
			rightWallX = player.position.x + player.width;
			leftWallX = player.position.x - CAMERA_BUFFER;
			groundLayerList.forEach(function(layer){
				layer.update(true);
			});
		}
		
		playerLastPosition.x = player.position.x;
		playerLastPosition.y = player.position.y;
	};
	
	var addParallaxLayer = function(layer){
		parallaxLayerList.push(layer);
	};
	
	var addGroundLayer = function(layer){
		groundLayerList.push(layer);
	};
	
	return {
		update: update,
		addParallaxLayer: addParallaxLayer,
		addGroundLayer: addGroundLayer
	}
};