var IntroScene = function(){

}

IntroScene.prototype.load = function(){
    var brutalism_sky = PIXI.Texture.fromImage("sprites/brutalism_sky.png");
    var logo = PIXI.Texture.fromImage("sprites/logo.png");
    var press_space = PIXI.Texture.fromImage("sprites/press_space.png");
    this.background = new PIXI.Sprite(brutalism_sky);
    // center the sprites anchor point
    this.background.anchor.x = 0;
    this.background.anchor.y = 0;
    this.background.position.x = 0;
    this.background.position.y = 0;
    stage.addChild(this.background);


    this.background2 = new PIXI.Sprite(brutalism_sky);
    // center the sprites anchor point
    this.background2.anchor.x = 0;
    this.background2.anchor.y = 0;
    this.background2.position.x = 400;
    this.background2.position.y = 0;
    stage.addChild(this.background2);


    var city_stencil = PIXI.Texture.fromImage("sprites/city_stencil.png");

    this.background3 = new PIXI.Sprite(city_stencil);
    // center the sprites anchor point
    this.background3.anchor.x = 0;
    this.background3.anchor.y = 0;
    this.background3.position.x = 0;
    this.background3.tint = 0;
    this.background3.alpha = .5;
    this.background3.position.y = 400;
    stage.addChild(this.background3);

    tween = new TWEEN.Tween(this.background3.position)
        .to({ y: -50}, 4000)
        .start();

    this.background4 = new PIXI.Sprite(city_stencil);
    // center the sprites anchor point
    this.background4.anchor.x = 0;
    this.background4.anchor.y = 0;
    this.background4.tint = 0;
    this.background4.alpha = .5;
    this.background4.position.x = 768;
    this.background4.position.y = 400;
    stage.addChild(this.background4);

    tween = new TWEEN.Tween(this.background4.position)
        .to({ y: -50}, 4000)
        .start();

    this.logo = new PIXI.Sprite(logo);
    // center the sprites anchor point
    this.logo.anchor.x = 0;
    this.logo.anchor.y = 0;
    this.logo.position.x = (GAME_WIDTH-275)/2;
    this.logo.position.y = (GAME_HEIGHT-47)/2;
    this.logo.alpha = 0;
    stage.addChild(this.logo);

    tween = new TWEEN.Tween(this.logo)
        .delay(2500)
        .to({ alpha: 1 }, 1000)
        .start();

    this.pressSpace = new PIXI.Sprite(press_space);
    // center the sprites anchor point
    this.pressSpace.anchor.x = 0;
    this.pressSpace.anchor.y = 0;
    this.pressSpace.position.x = (GAME_WIDTH-150)/2;
    this.pressSpace.position.y = 300;
    this.pressSpace.alpha = 0;
    stage.addChild(this.pressSpace);

    tween = new TWEEN.Tween(this.pressSpace)
        .delay(3000)
        .to({ alpha: 1 }, 1000)
        .start();


    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    var ctx = canvas.getContext("2d");

    var light1 = new Lamp({
        position: new Vec2(100, 250),
        distance: 200,
        radius: 10,
        samples: 50
    });
    var light2 = new Lamp({
        position: new Vec2(300, 50),
        color: '#CCF',
        distance: 200,
        radius: 10,
        samples: 50
    });
    var disc = new DiscObject({ center: new Vec2(100, 100), radius: 30 });
    var rect = new RectangleObject({ topleft: new Vec2(250, 200), bottomright: new Vec2(350, 250) });

    var objects = [ disc, rect ];

    var lighting1 = new Lighting({
        light: light1,
        objects: objects
    });
    var lighting2 = new Lighting({
        light: light2,
        objects: [ disc, rect ]
    });

    var darkmask = new DarkMask({ lights: [light1, light2] });

    lighting1.compute(canvas.width, canvas.height);
    lighting2.compute(canvas.width, canvas.height);
    darkmask.compute(canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.beginPath();
    disc.path(ctx);
    ctx.fill();
    ctx.beginPath();
    rect.path(ctx);
    ctx.fill();

    ctx.globalCompositeOperation = "lighter";
    lighting1.render(ctx);
    lighting2.render(ctx);

    ctx.globalCompositeOperation = "source-over";
    darkmask.render(ctx);


    this.light1 = light1;
    this.light2 = light2;
    this.lighting1 = lighting1;
    this.lighting2 = lighting2;
    this.disc = disc;
    this.darkmask = darkmask;
    this.canvas = canvas;
    this.rect = rect;



    this.ctx = ctx;
    var canvsprite = PIXI.Texture.fromCanvas(canvas);
    this.canvsprite = canvsprite;
    var canv = new PIXI.Sprite(canvsprite);
    canv.anchor.x = 0;
    canv.anchor.y = 0;
    canv.position.x = 0;
    canv.position.y = 0;
    canv.alpha = 0.5;
    stage.addChild(canv);
    this.time = 0;
}

var Lamp = illuminated.Lamp
    , RectangleObject = illuminated.RectangleObject
    , DiscObject = illuminated.DiscObject
    , Vec2 = illuminated.Vec2
    , Lighting = illuminated.Lighting
    , DarkMask = illuminated.DarkMask
    ;


var startAt = +new Date();
var lastd;

IntroScene.prototype.update = function(delta){
    var t = +new Date() - startAt;
    var d = Math.round(100*Math.cos(t/1000));
    if (d == lastd) return; // nothing has changed
    lastd = d;

    this.light1.position = new Vec2(200-d, 150+d);
    this.light2.position = new Vec2(200+d, 150-d);

    this.lighting1.compute(this.canvas.width, this.canvas.height);
    this.lighting2.compute(this.canvas.width, this.canvas.height);
    this.darkmask.compute(this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.disc.path(this.ctx);
    this.ctx.fill();
    this.ctx.beginPath();
    this.rect.path(this.ctx);
    this.ctx.fill();

    this.ctx.globalCompositeOperation = "lighter";
    this.lighting1.render(this.ctx);
    this.lighting2.render(this.ctx);

    this.ctx.globalCompositeOperation = "source-over";
    this.darkmask.render(this.ctx);
    
    this.canvsprite.baseTexture._dirty[0]=true;

    if(Key.isDown(32)){
        changeScene(new GameScene());
    }
}

IntroScene.prototype.unload = function(){
    stage.removeChild(this.background);
    stage.removeChild(this.background2);
    stage.removeChild(this.background3);
    stage.removeChild(this.background4);
    stage.removeChild(this.logo);
    stage.removeChild(this.pressSpace);
}