

// create an array of assets to load

var assetsToLoader = ["sprites/infiltrator/skeleton.anim"];

// create a new loader
loader = new PIXI.AssetLoader(assetsToLoader);

// use callback
loader.onComplete = onAssetsLoaded

//begin load
loader.load();


// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x666666, true);

// create a renderer instance
var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);

// set the canvas width and height to fill the screen
renderer.view.style.display = "block";

// add render view to DOM
document.body.appendChild(renderer.view);
PIXI.TextureCache["inf_belly"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_belly.png");
PIXI.TextureCache["inf_foot"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_foot.png");
PIXI.TextureCache["inf_gun"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_gun.png");
PIXI.TextureCache["inf_head"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_head.png");
PIXI.TextureCache["inf_leg"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_leg.png");
PIXI.TextureCache["inf_lhand"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_lhand.png");
PIXI.TextureCache["inf_lowerarm"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_lowerarm.png");
PIXI.TextureCache["inf_neck"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_neck.png");
PIXI.TextureCache["inf_pelvis"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_pelvis.png");
PIXI.TextureCache["inf_rhand"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_rhand.png");
PIXI.TextureCache["inf_thigh"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_thigh.png");
PIXI.TextureCache["inf_torso"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_torso.png");
PIXI.TextureCache["inf_upperarm"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_upperarm.png");
PIXI.TextureCache["inf_lupperarm"] = PIXI.Texture.fromImage("sprites/infiltrator/inf_lupperarm.png");


// create a background texture
var pondFloorTexture = PIXI.Texture.fromImage("sprites/concrete_normal.png");


var filter = new PIXI.NormalMapFilter(pondFloorTexture);

var player = null;

function onAssetsLoaded()
{
    player = new PIXI.Spine("sprites/infiltrator/skeleton.anim");

    player.position.x = window.innerWidth/2;
    player.position.y = 600;

    player.scale.x = player.scale.y = .15;
    //spineBoy.anchor = new PIXI.Point(.5,.5);
    // set up the mixes!
    player.stateData.setMixByName("run", "jump", 0.2);
    player.stateData.setMixByName("jump", "run", 0.4);

    player.state.setAnimationByName(0,"run", true);

    // create a texture from an image path
    var brutalism_sky = PIXI.Texture.fromImage("sprites/brutalism_sky.png");

    for(var i = 0 ; i < 5; i++){
        // create a new Sprite using the texture
        var background = new PIXI.Sprite(brutalism_sky);
        // center the sprites anchor point
        background.anchor.x = 0;
        background.anchor.y = 0;

        // move the sprite t the center of the screen
        background.position.x = i*512;
        background.position.y = 0;
        stage.addChild(background);
    }

    var city_stencil = PIXI.Texture.fromImage("sprites/city_stencil.png");

    for(var i = 0 ; i < 5; i++) {
        var city_near = new PIXI.Sprite(city_stencil);
        city_near.position.x = -300+768*i;
        city_near.position.y = 64;
        city_near.anchor.x = 0;
        city_near.anchor.y = 0;
        stage.addChild(city_near);
        city_near.tint = 0x666666;
    }

    for(var i = 0 ; i < 5; i++) {
        var city_near = new PIXI.Sprite(city_stencil);
        city_near.position.x = 768*i;
        city_near.position.y = 128;
        city_near.anchor.x = 0;
        city_near.anchor.y = 0;
        stage.addChild(city_near);
        city_near.tint = 0x333333;
    }







    var sprite = PIXI.Sprite.fromImage("sprites/concrete.png");//(pondFloorTexture);
    sprite.position.y = 600;
    sprite.filters = [filter];
    stage.addChild(sprite);

    stage.addChild(player);

    /*stage.click = function()
    {
        player.state.setAnimationByName(0,"jump", false);
        player.state.addAnimationByName(0,"run", true);

    }*/
}

requestAnimFrame(animate);

function animate() {
    if(player != null){
        if(Key.isDown(Key.LEFT)){
            player.position.x -= 5;
        }
        if(Key.isDown(Key.RIGHT)){
            player.position.x += 5;
        }
        filter.uniforms.LightPos.value[0] = player.position.x;
        filter.uniforms.LightPos.value[1] = player.position.y;
    }
    else {
        filter.uniforms.LightPos.value[0] = -1000;
        filter.uniforms.LightPos.value[1] = -1000;
    }

    //console.log( mouse.global.x );

    // time to render the state!

    requestAnimFrame( animate );
    renderer.render(stage);
}
