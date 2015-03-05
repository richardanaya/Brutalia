var GAME_WIDTH = 800;
var GAME_HEIGHT = 400;

var assetsToLoader = ["sprites/infiltrator/skeleton.anim"];
// create a new loader
loader = new PIXI.AssetLoader(assetsToLoader);

// use callback
loader.onComplete = onAssetsLoaded

//begin load
loader.load();


// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x666666, false);

// create a renderer instance
var renderer = new PIXI.WebGLRenderer(GAME_WIDTH,GAME_HEIGHT);


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
PIXI.TextureCache["concrete_normal"] = PIXI.Texture.fromImage("sprites/concrete_normal.png");

var currentScene = null;

function onAssetsLoaded()
{
    changeScene(new IntroScene());
    requestAnimFrame(update);
}

function update(){
    currentScene.update(1/60.0);
    requestAnimFrame(update);
    TWEEN.update();
    renderer.render(stage);
};

function changeScene(scene){
    if(currentScene) {
        currentScene.unload();
    }
    currentScene = scene;
    currentScene.load();
}