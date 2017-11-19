(function( w ) {
    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');

    /*
     * 绘制背景
     * construcotor { Sky } 背景构造函数
     * parasm { ctx: Context } 绘制环境
     * parasm { img: Image } 背景图像
     * parasm { speed: number } 背景速度
     * */
    function Sky( ctx, img, speed ) {

        this.ctx = ctx;
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
        this.speed = speed || 2;

        // 每创建一个实例，len自增
        Sky.len++;

        this.x = this.width * ( Sky.len - 1 );
        this.y = 0;
    }

    // 背景实例的个数
    Sky.len = 0;


    // 给原型扩充方法
    Sky.prototype = {

        constructor: Sky,

        // 绘制背景
        draw: function() {
            this.ctx.drawImage( this.img, this.x, this.y );
        },

        update: function() {
            this.x -= this.speed;
            if ( this.x <= -this.width ) {
                this.x += this.width * Sky.len;
            }
        }

    };

    w.getSky = function( ctx, img, speed ) {
        return new Sky( ctx, img, speed );
    };
    
}( window ));