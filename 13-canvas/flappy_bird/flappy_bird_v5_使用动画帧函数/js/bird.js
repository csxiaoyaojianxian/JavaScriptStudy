(function( w ) {
    /*
     * constructor { Bird } 鸟构造函数
     * param { ctx: Context } 绘图环境
     * param { img: Image } 鸟图
     * param { widthFrame: number } 一排的帧数
     * param { heightFrame: number } 一列的帧数
     * param { x: number } 鸟的起始x轴坐标
     * param { y: number } 鸟的起始y轴坐标
     * */
    function Bird( ctx, img, widthFrame, heightFrame, x, y ) {

        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;

        // 一个小鸟的宽和高
        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height / this.heightFrame;

        // 当前小鸟渲染的帧数
        this.currentFrame = 0;

        // 小鸟的下落速度
        this.speed = 2;

        // 加速度
        this.speedPlus = 0.05;

        // 绑定事件
        this._bind();
    }

    // 给原型扩展方法
    Bird.prototype = {

        constructor: Bird,

        // 绘制鸟
        draw: function() {

            // 当下落速度为1的时候，旋转10度
            var baseRadian = Math.PI / 180 * 10;
            var maxRadian = Math.PI / 180 * 45;

            // 根据速度计算旋转的弧度
            var rotateRadian = baseRadian * this.speed;

            // 限制最大旋转角度为70度
            rotateRadian = rotateRadian >= maxRadian? maxRadian : rotateRadian;

            this.ctx.save();

            /*
             * 1、平移到小鸟的中心点
             * 2、然后根据下落的速度旋转坐标系
             * 3、绘制小鸟，但是绘制的x和y坐标变为负的宽高一半。
             * */

            this.ctx.translate( this.x + this.width / 2, this.y + this.height / 2 );
            this.ctx.rotate( rotateRadian );
            this.ctx.drawImage( this.img,
                this.width * this.currentFrame, 0, this.width, this.height,
                -this.width / 2, -this.height / 2, this.width, this.height );

            this.ctx.restore();
        },

        // 计算下一帧绘制时的数据
        update: function() {

            // 绘制下一帧
            this.currentFrame = ++this.currentFrame >= this.widthFrame? 0 : this.currentFrame;

            // 让小鸟不断下落
            this.y += this.speed;

            // 刷新下落数度
            this.speed += this.speedPlus;

        },

        // 绑定事件
        _bind: function() {

            var self = this;

            this.ctx.canvas.addEventListener( 'click', function() {

                self.speed = -1.5;

            } );
        }
    }

    // 用来存储已经创建好的鸟实例对象
    var bird = null;

    // 工厂模式
    w.getBird = function( ctx, img, widthFrame, heightFrame, x, y ) {

        // 单利模式,整个游戏只要一个bird就够了
        if ( !bird ) {
            bird = new Bird( ctx, img, widthFrame, heightFrame, x, y );
        }

        return bird;
    };
}( window ));