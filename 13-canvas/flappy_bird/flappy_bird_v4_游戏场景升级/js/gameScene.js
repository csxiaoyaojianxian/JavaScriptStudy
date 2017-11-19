(function( w ) {
    /*
     * constructor { Scene } 游戏场景
     * param { ctx: Context } 绘图环境
     * param { imgObj: Object } 创建角色所需的图像资源
     * */
    function Scene( ctx, imgObj ) {

        this.ctx = ctx;
        this.imgObj = imgObj;

        // 听众队列
        this.listeners = [];

        // 该场景所需的所有角色
        this.roles = [];
        this._initRoles();
    }

    Scene.prototype = {

        constrcutor: Scene,

        // 创建场景所需的所有角色
        _initRoles: function() {

            // 背景2个
            this.roles.push( getSky( this.ctx, this.imgObj.sky, 3 ) );
            this.roles.push( getSky( this.ctx, this.imgObj.sky, 3 ) );

            // 管道6个
            for ( var i = 0; i < 6; i++ ) {
                this.roles.push( getPipe( this.ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, 150, this.imgObj.land.height, 3 ) );
            }

            // 大地4个
            for ( var i = 0; i < 4; i++ ) {
                this.roles.push( getLand( this.ctx, this.imgObj.land, 3 ) );
            }

            // 创建鸟
            this.roles.push( getBird( this.ctx, this.imgObj.bird, 3, 1, 10, 10 ) );
        },

        // 添加听众
        addListener: function( listener ) {
            this.listeners.push( listener );
        },

        // 监听小鸟死亡
        triggerBirdOver: function() {
            // 死亡时告知所有的听众
            this.listeners.forEach( function( liste ) {
                liste();
            });
        },

        // 让所有的角色开始表演( 开始游戏 )
        draw: function() {

            // 每次绘制新的场景画面时，判断小鸟有没有碰撞，如果有，通知所有听众。
            var bird = getBird();
            var birdCoreX = bird.x + bird.width / 2;
            var birdCoreY = bird.y + bird.height / 2;

            // 如果小鸟撞向管道，或者飞出天空，或者duang~duang~duang，那么游戏结束
            if ( this.ctx.isPointInPath( birdCoreX, birdCoreY )
                || birdCoreY < 0
                || birdCoreY > (this.ctx.canvas.height - this.imgObj.land.height) ){

                // 监听到了小鸟死亡
                this.triggerBirdOver();
            }

            // 小鸟没有死亡，才继续绘制
            else {
                // 先清除上一次绘制的6个管道路径，
                // 然后再按照新的位置绘制新路径
                this.ctx.beginPath();
                this.roles.forEach( function( role ) {
                    role.draw();
                    role.update();
                } );
            }
        }

    };

    // 工厂
    w.getGameScene = function( ctx, imgObj ) {
        return new Scene( ctx, imgObj );
    }
}( window ));