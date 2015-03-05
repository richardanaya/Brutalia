var GameScene = function(){

}

var filter = null;

var player = null;
var playerYVelocity;
var gravity;
var cameraMovementManager;
var backgroundObjectContainer;
var parallaxLayerContainer0;
var parallaxLayerContainer1;
var groundLayerContainer;

var STATES = {
    RUN: "RUN",
    JUMP: "JUMP",
    STAND: "STAND",
    MOVING: "MOVING"
};

function contains(states, state){
    for(var i = 0; i < states.length; i++){
        if(states[i] === state){
            return true;
        }
    }
    return false;
};

function remove(states, state) {
    for(var i = 0; i < states.length; i++){
        if(states[i] === state){
            states.splice(i, 1);
            return;
        }
    }
};

function initPlayer(){
    player = new PIXI.Spine("sprites/infiltrator/skeleton.anim");
    player.states = [STATES.STAND];

    player.jump = function(){
        player.state.setAnimationByName(0, "jump", true);
        playerYVelocity = 10;
        player.states.push(STATES.JUMP);
        remove(player.states, STATES.RUN);
        remove(player.states, STATES.STAND);
    };

    player.position.x = GAME_WIDTH/2;
    player.position.y = 300;

    player.scale.x = player.scale.y = .08;
    //spineBoy.anchor = new PIXI.Point(.5,.5);
    // set up the mixes!
    player.stateData.setMixByName("run", "jump", 0.2);
    player.stateData.setMixByName("jump", "run", 0.1);
    player.stateData.setMixByName("run", "stand", .1);
    player.stateData.setMixByName("stand", "run", 0.2);
    player.stateData.setMixByName("jump", "stand", 0.1);
    player.stateData.setMixByName("stand", "jump", 0.2)
    player.state.setAnimationByName(0, "stand", true);
    player.facingRight = true;
    player.isMoving = false;
	player.speed = 2;
};

function animate() {

    if (player != null) {
        remove(player.states, STATES.MOVING);
        if (Key.isDown(Key.LEFT) && !contains(player.states, STATES.MOVING)) {
	        player.states.push(STATES.MOVING);
            if (player.facingRight) {
                player.scale.x = -player.scale.x;
                player.facingRight = false;
            }
	        if(!cameraMovementManager.cameraIsMoving) {
		        player.position.x -= player.speed;
	        }
        }

        if (Key.isDown(Key.RIGHT) && !contains(player.states, STATES.MOVING)) {
            player.states.push(STATES.MOVING);
            if (!player.facingRight) {
                player.scale.x = -player.scale.x;
                player.facingRight = true;
            }
	        if(!cameraMovementManager.cameraIsMoving) {
		        player.position.x += player.speed;
	        }
        }

        if (!contains(player.states, STATES.MOVING) && contains(player.states, STATES.RUN) && !contains(player.states, STATES.JUMP)) {
            player.state.setAnimationByName(0, "stand", true);
            remove(player.states, STATES.RUN);
            player.states.push(STATES.STAND);
        }

        if (contains(player.states, STATES.MOVING) && !contains(player.states, STATES.RUN)) {
            player.state.setAnimationByName(0, "run", true);
            remove(player.states, STATES.STAND);
            player.states.push(STATES.RUN);
        }

        if (Key.isDown(Key.UP)) {
            if (!contains(player.states, STATES.JUMP)) {
                player.jump();
            }
        }

        filter.uniforms.LightPos.value[0] = player.position.x;
        filter.uniforms.LightPos.value[1] = player.position.y;
    }
}


GameScene.prototype.load = function(){
    filter = new PIXI.NormalMapFilter(PIXI.TextureCache["concrete_normal"]);
    initPlayer();
	parallaxLayerContainer0 = new ParallaxLayer(.1);
	parallaxLayerContainer1 = new ParallaxLayer(0.75);
	groundLayerContainer = new ParallaxLayer(2, filter);
    cameraMovementManager = new CameraMoveManager(player);
    // create a texture from an image path
    var brutalism_sky = PIXI.Texture.fromImage("sprites/brutalism_sky.png");

    for(var i = 0 ; i < 10; i++){
        // create a new Sprite using the texture
        var background = new PIXI.Sprite(brutalism_sky);
        // center the sprites anchor point
        background.anchor.x = 0;
        background.anchor.y = 0;

        // move the sprite t the center of the screen
        background.position.x = i*400;
        background.position.y = 0;
	    
        stage.addChild(background);
    }
	
	cameraMovementManager.addParallaxLayer(parallaxLayerContainer0);
	cameraMovementManager.addParallaxLayer(parallaxLayerContainer1);
	cameraMovementManager.addGroundLayer(groundLayerContainer);
    var city_stencil = PIXI.Texture.fromImage("sprites/city_stencil.png");

    for(var i = 0 ; i < 10; i++) {
        var city_near = new PIXI.Sprite(city_stencil);
        // I think TilingSprites may be a long term solution for parallax awesomeness
        /*var city_near = new PIXI.TilingSprite(
         city_stencil,
         city_stencil.baseTexture.width,
         city_stencil.baseTexture.height
         );*/

        city_near.position.x = -300+768*i;
        city_near.position.y = -40;
        city_near.anchor.x = 0;
        city_near.anchor.y = 0;
        parallaxLayerContainer0.addChild(city_near);
        city_near.tint = 0x666666;
    }

    for(var i = 0 ; i < 10; i++) {
        var city_near = new PIXI.Sprite(city_stencil);
        city_near.position.x = 768*i;
        city_near.position.y = -20;
        city_near.anchor.x = 0;
        city_near.anchor.y = 0;
        parallaxLayerContainer1.addChild(city_near);
        city_near.tint = 0x333333;
    }


    gravity = 1;
    playerYVelocity = 0;


    var sprite = PIXI.Sprite.fromImage("sprites/concrete.png");//(pondFloorTexture);
    sprite.position.y = 300;
    sprite.filters = [filter];
	groundLayerContainer.addChild(sprite);
	
    stage.addChild(parallaxLayerContainer0);
	stage.addChild(parallaxLayerContainer1);
    stage.addChild(groundLayerContainer);
    stage.addChild(player);
    /*stage.click = function()
     {
     playerYVelocity = 23;
     player.state.setAnimationByName(0, "jump", false);
     player.state.addAnimationByName(0,"run", true);
     }*/
}

GameScene.prototype.update = function(){
    animate();

    if(player && contains(player.states, STATES.JUMP)){
        // hack for now just to test some stuff :)
        var newPlayerY = player.position.y - playerYVelocity;
        if(newPlayerY > 300){
            player.position.y = 300;
            remove(player.states, STATES.JUMP);
            if(contains(player.states, STATES.MOVING)){
                player.state.setAnimationByName(0, "run", true);
                player.states.push(STATES.RUN);
            }
            else{
                player.state.setAnimationByName(0, "stand", true);
                player.states.push(STATES.STAND);
            }
            playerYVelocity = 0;
            return;
        }

        player.position.y = newPlayerY;
        playerYVelocity -= gravity;
    }

    if(cameraMovementManager) {
        cameraMovementManager.update();
    }
};

GameScene.prototype.unload = function(){

}