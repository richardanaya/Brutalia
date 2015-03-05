function ParallaxLayer(updateInterval){
	this.updateInterval = updateInterval;
	PIXI.DisplayObjectContainer.call(this);
};

ParallaxLayer.constructor = ParallaxLayer;

ParallaxLayer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

ParallaxLayer.prototype.update = function(negative) {
	
	if(negative) {
		this.position.x -= this.updateInterval;
	}else{
		this.position.x += this.updateInterval;
	}
	
};

