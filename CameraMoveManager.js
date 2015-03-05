CameraMoveManager = function(player){
	// temp solution
	this.CAMERA_BUFFER = 200;
	this.leftWallX = player.position.x - this.CAMERA_BUFFER;
	this.rightWallX = player.position.x + player.width + this.CAMERA_BUFFER;
	
	this.parallaxLayerList = [];
	this.groundLayerList = [];
	this.playerLastPosition = new PIXI.Point(player.position.x, player.position.y);
	this.cameraIsMoving = false;
};

CameraMoveManager.constructor = CameraMoveManager;

CameraMoveManager.prototype.update = function(){
	this.cameraIsMoving = false;
	if(contains(player.states, STATES.MOVING)) {
		if ((contains(player.states, STATES.MOVING) && player.position.x - this.playerLastPosition.x) > 0) {
			this.parallaxLayerList.forEach(function (layer) {
				layer.update(true);
			});

		}
		if (player.position.x - this.playerLastPosition.x < 0) {
			this.parallaxLayerList.forEach(function (layer) {
				layer.update(false);
			});
		}
	}
	// TODO: do some approximations on this and the next check because the sprite is constantly updating its x position while
	// animating and it can cause jerky movement even though the player is not moving
	if(player.position.x <= this.leftWallX){
		this.cameraIsMoving = true;
		this.leftWallX = player.position.x;
		this.rightWallX = player.position.x + player.width + this.CAMERA_BUFFER;
		player.position.x = this.playerLastPosition.x;
		this.groundLayerList.forEach(function(layer){
			layer.update(false);
		});
	}
	else if(player.position.x >= this.rightWallX){
		this.cameraIsMoving = true;
		this.rightWallX = player.position.x;
		this.leftWallX = player.position.x - this.CAMERA_BUFFER;
		player.position.x = this.playerLastPosition.x;
		this.groundLayerList.forEach(function(layer){
			layer.update(true);
		});
	}


	this.playerLastPosition.x = player.position.x;
	this.playerLastPosition.y = player.position.y;
};

CameraMoveManager.prototype.addParallaxLayer = function(layer){
	this.parallaxLayerList.push(layer);
};

CameraMoveManager.prototype.addGroundLayer = function(layer){
	this.groundLayerList.push(layer);
};