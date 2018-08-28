(function( w ) {
    
    // 混入式继承( copy继承 )
    function extend( o1, o2 ) {
        for ( var key in o2 ) {
            if ( o2.hasOwnProperty( key ) ) {
                o1[ key ] = o2[ key ];
            }
        }
    }

    /*
     * constructor { Person } 人构造函数
     * param { ctx: Context } 绘制环境
     * param { img: Image } 绘制的图像
     * param { widthFrame: number } 图像一排有多少个人
     * param { heightFrame: number } 图像一列有多少个人
     * param { x: number } 指定人物绘制的x轴坐标
     * param { y: number } 指定人物绘制的y轴坐标
     * param { renderWidth: number } 人物绘制时的宽
     * param { renderHeight: number } 人物绘制时的高
     * param { speed: number } 人物行走的速度
     * */
    function Person( ctx, img, widthFrame, heightFrame, x, y, renderWidth, renderHeight, speed ) {

        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;

        // 图像绘制时的坐标和大小
        this.x = x;
        this.y = y;
        this.renderWidth = renderWidth;
        this.renderHeight = renderHeight;

        // 行走的速度
        this.speed = speed || 2;

        // 求一个人的宽和高
        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height / this.heightFrame;

        // 当前绘制某个方向的第几帧
        this.currentFrame = 0;

        // 当前行走的方向，默认是第一排的方向
        this.direction = 0;

        // 绑定事件
        this._bind();
    }

    // 给原型扩充方法
    extend( Person.prototype, {

        // 绘制方法
        draw: function() {

            this.ctx.drawImage( this.img,
                this.width * this.currentFrame, this.height * this.direction, this.width, this.height,
                this.x, this.y, this.renderWidth, this.renderHeight);

        },

        // 绑定事件
        _bind: function() {

            var self = this;

            document.addEventListener( 'keydown', function( e ) {

                // 根据按键切换行走方向
                switch ( e.keyCode ) {
                    case 37:
                        self.direction = 1;
                        break;
                    case 38:
                        self.direction = 3;
                        break;
                    case 39:
                        self.direction = 2;
                        break;
                    case 40:
                        self.direction = 0;
                        break;
                }

            } );
        },

        // 更新小人下一阵绘制时的数据
        update: function() {

            switch ( this.direction ) {

                // 向下走，y轴加
                // 当小人向下出画布，那么从上边再走出来
                case 0:
                    this.y += this.speed;
                    this.y = this.y > this.ctx.canvas.height? -this.height: this.y;
                    break;

                // 向左走，x轴减
                // 当小人向左走出画布，那么从右边再走出来
                case 1:
                    this.x -= this.speed;
                    this.x = this.x < -this.width? this.ctx.canvas.width: this.x;
                    break;

                // 向右走，x轴加
                // 当小人向右走出画布，那么从左边再走出来
                case 2:
                    this.x += this.speed;
                    this.x = this.x > this.ctx.canvas.width? -this.width: this.x;
                    break;

                // 向上走，y轴减
                // 当小人向上出画布，那么从下边再走出来
                case 3:
                    this.y -= this.speed;
                    this.y = this.y < -this.height? this.ctx.canvas.height: this.y;
                    break;
            }

        }

    } );

    // 对外暴露Person
    w.Person = Person;

}( window ));

