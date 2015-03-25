var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		
        var ball = new Ball();
        // ball.setPosition( new cc.Point(100,400) );
        ball.setPosition( new cc.Point(0,0) );
        this.addChild( ball );
        ball.scheduleUpdate();

        return true;
    }
});
 
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});