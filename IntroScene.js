var IntroScene = function(){

}

IntroScene.prototype.load = function(){

}

IntroScene.prototype.update = function(){
    if(Key.isAnyKeyDown()){
        changeScene(new GameScene());
    }
}

IntroScene.prototype.unload = function(){

}