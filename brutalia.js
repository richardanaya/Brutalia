

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
var renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

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


function onAssetsLoaded()
{
    var spineBoy = new PIXI.Spine("sprites/infiltrator/skeleton.anim");

    spineBoy.position.x = window.innerWidth/2;
    spineBoy.position.y = window.innerHeight/2;

    spineBoy.scale.x = spineBoy.scale.y = .1;
    //spineBoy.anchor = new PIXI.Point(.5,.5);
    // set up the mixes!
    spineBoy.stateData.setMixByName("run", "jump", 0.2);
    spineBoy.stateData.setMixByName("jump", "run", 0.4);

    spineBoy.state.setAnimationByName("run", true);


    stage.addChild(spineBoy);

    stage.click = function()
    {
        spineBoy.state.setAnimationByName("jump", false);
        spineBoy.state.addAnimationByName("run", true);

    }
}

requestAnimFrame(animate);

function animate() {

    requestAnimFrame( animate );
    renderer.render(stage);
}
