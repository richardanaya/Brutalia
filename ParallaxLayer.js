function ParallaxLayer(updateInterval, filter){
	if(filter){
		this.filter = filter;
	}
	this.updateInterval = updateInterval;
	PIXI.DisplayObjectContainer.call(this);
};

ParallaxLayer.constructor = ParallaxLayer;

ParallaxLayer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

ParallaxLayer.prototype.update = function(negative) {
	if(negative) {
		this.position.x -= this.updateInterval;
		if(this.filter){
			this.filter.uniforms.offset.value.x = this.position.x;
		}
	}else{
		this.position.x += this.updateInterval;
		if(this.filter){
			this.filter.uniforms.offset.value.x = this.position.x;
			console.log(this.filter.uniforms.offset.value.x);
		}
	}
	
};

