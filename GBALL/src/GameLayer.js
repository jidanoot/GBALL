var score = 0;
var numberOfBullet = 0;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 		this.setBackground = new cc.Sprite.create( 'res/images/bgg.png' );
        this.setBackground.setPosition( new cc.Point(screenWidth/2 , screenHeight/2) )
        this.addChild(this.setBackground);

        this.human = new Human();
        this.human.setPosition( new cc.Point(120,45) );
        this.addChild( this.human );
        this.human.scheduleUpdate();

        this.arrayBall = [];

        // var ball = new SecondBall();
        // ball.setDirection(SecondBall.DIR.RIGHT);
        // ball.setPosition( new cc.Point(500,400) );
        // this.addChild(ball);
        // this.arrayBall.push(ball);
        // ball.scheduleUpdate();

        var ball = new SecondBall();
        ball.setDirection(SecondBall.DIR.RIGHT);
        ball.setPosition( new cc.Point(500,400) );
        this.addChild(ball);
        this.arrayBall.push(ball);
        ball.scheduleUpdate();

        // this.ball = new Ball();
        // this.ball.setDirection(Ball.DIR.RIGHT);
        // this.ball = new SecondBall();
        // this.ball.setDirection(SecondBall.DIR.RIGHT);

        // this.ball.setPosition( new cc.Point(100,400) );
        // this.ball.setPosition( new cc.Point(100,30) );

        // this.addChild( this.arrayBall );
        // this.ball.scheduleUpdate();

        // this.numberOfBullet = 0;

        this.addKeyboardHandlers();    

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 750, 350 ) );
        this.addChild( this.scoreLabel );

        this.scheduleUpdate();
        return true;
    },

    createBall: function(ballpos){
        var ball = new Ball();
        ball.setDirection(Ball.DIR.RIGHT);
        ball.setPosition( new cc.Point(ballpos.x,ballpos.y) );
        this.addChild(ball);
        this.arrayBall.push(ball);
        ball.scheduleUpdate();

        var ball = new Ball();
        ball.setDirection(Ball.DIR.LEFT);
        ball.setPosition( new cc.Point(ballpos.x,ballpos.y) );
        this.addChild(ball);
        this.arrayBall.push(ball);
        ball.scheduleUpdate();
    },

    animation: function(){
        this.human.stopAction( this.human.movingAction );
        this.human.movingAction = this.human.createAnimationAction( this.human.direction );
        this.human.move();
        this.human.runAction( this.human.movingAction );
    },

    onKeyDown: function( keyCode , event ){
        var humanPos = this.human.getPosition();
        this.shooting( humanPos , keyCode , event );

        if( keyCode == cc.KEY.right ){
            this.human.direction = Human.DIR.RIGHT;
            this.checkRuning();
        }else if( keyCode == cc.KEY.left ){
            this.human.direction = Human.DIR.LEFT;
            this.checkRuning();
        }
    },

    checkRuning: function(){
        if(!this.human.isRunning){
            this.animation();
            this.human.isRunning = true;
        }
    },

    onKeyUp: function( keyCode , event ){
        this.human.direction = Human.DIR.FRONT;
        this.human.isRunning = false;
        this.animation();
    },

    addKeyboardHandlers: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode , event ){
                self.onKeyDown( keyCode , event );
            },
            onKeyReleased: function( keyCode , event ){
                self.onKeyUp( keyCode , event );
            }
        },this);
    },

    shooting: function( humanPos , keyCode , event ){
        if(numberOfBullet == 0 && keyCode == cc.KEY.space ){
            this.createBullet( humanPos );
            numberOfBullet = 1;
        }
    },

    createBullet: function( humanPos ){
        this.bullet = new Bullet(this.arrayBall);
        this.bullet.setPosition( new cc.Point( humanPos.x , 50) );
        this.addChild( this.bullet );
        this.bullet.scheduleUpdate();
    },

    update :function(dt){
        if( this.bullet != null ){
            if ( this.bullet.getCollection() ) {
                score += 5;
                this.bullet.setCollection( false );
                this.scoreLabel.setString( score );
                var ballpos = this.bullet.ball;
                this.createBall(ballpos);
            }
        }
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