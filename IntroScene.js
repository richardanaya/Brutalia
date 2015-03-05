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
}

IntroScene.prototype.update = function(){
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