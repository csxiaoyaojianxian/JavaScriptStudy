/*
 * constructor { line } 折线图构造函数
 * param { ctx: Context } 绘图环境
 * param { data: Array } 绘制折线图所需的数据
 * param { padding: Object } 设置坐标轴到画布的边距
 * param { arrow: Object } 设置箭头的宽高
 * */
function Line( ctx, data, padding, arrow ) {

    this.ctx = ctx;
    this.data = data;
    this.padding = padding || { top: 10, right: 10, bottom: 10, left: 10 };
    this.arrow = arrow || { width: 10, height: 20 };

    // 上顶点的坐标
    this.vertexTop = {
        x: this.padding.left,
        y: this.padding.top
    }

    // 原点的坐标
    this.origin = {
        x: this.padding.left,
        y: this.ctx.canvas.height - this.padding.bottom
    }

    // 右顶点的坐标
    this.vertexRight = {
        x: this.ctx.canvas.width - this.padding.right,
        y: this.ctx.canvas.height - this.padding.bottom
    }

    // 计算坐标轴表示的最大刻度
    this.coordWidth = this.ctx.canvas.width - this.padding.left - this.padding.right - this.arrow.height;
    this.coordHeight = this.ctx.canvas.height - this.padding.top - this.padding.bottom - this.arrow.height;

}

// 给原型扩充方法
Line.prototype = {
    constructor: Line,

    draw: function() {
        this.drawCoord();
        this.drawArrow();
        this.drawLine();
    },

    // 绘制坐标轴
    drawCoord: function() {
        this.ctx.beginPath();
        this.ctx.moveTo( this.vertexTop.x, this.vertexTop.y );
        this.ctx.lineTo( this.origin.x, this.origin.y );
        this.ctx.lineTo( this.vertexRight.x, this.vertexRight.y );
        this.ctx.stroke();
    },

    // 绘制建箭头
    drawArrow: function() {

        // 上箭头
        this.ctx.beginPath();
        this.ctx.moveTo( this.vertexTop.x, this.vertexTop.y );
        this.ctx.lineTo( this.vertexTop.x - this.arrow.width / 2, this.vertexTop.y + this.arrow.height );
        this.ctx.lineTo( this.vertexTop.x, this.vertexTop.y + this.arrow.height / 2 );
        this.ctx.lineTo( this.vertexTop.x + this.arrow.width / 2, this.vertexTop.y + this.arrow.height );
        this.ctx.closePath();
        this.ctx.stroke();

        // 右箭头
        this.ctx.beginPath();
        this.ctx.moveTo( this.vertexRight.x, this.vertexRight.y );
        this.ctx.lineTo( this.vertexRight.x - this.arrow.height, this.vertexRight.y - this.arrow.width / 2 );
        this.ctx.lineTo( this.vertexRight.x - this.arrow.height / 2, this.vertexRight.y );
        this.ctx.lineTo( this.vertexRight.x - this.arrow.height, this.vertexRight.y + this.arrow.width / 2 );
        this.ctx.closePath();
        this.ctx.stroke();
    },

    // 根据数据绘制折线图
    drawLine: function() {

        // 先清除之前的路径
        this.ctx.beginPath();

        // 保存当前的this
        var self = this;

        /*
         * 计算x和y轴坐标的缩放比值：
         * ratioX = this.coordWidth / this.data.length
         * ratioY = this.coordHeight / Math.max.apply( this.data )
         * */

        var ratioX = this.coordWidth / this.data.length,
            ratioY = this.coordHeight / Math.max.apply( null, this.data );

        /*
         * 要根据原点的坐标来计算点的坐标
         * x = self.origin.x + x
         * y = self.origin.y - y
         * */

        // 遍历所有的数据，依次绘制点
        this.data.forEach( function( y, x ) {
            self.ctx.fillRect( self.origin.x + ( x * ratioX ) - 1, self.origin.y - ( y * ratioY ) - 1 , 2, 2 );
        });

        // 遍历所有的数据，依次绘制线
        this.data.forEach( function( y, x ) {
            self.ctx.lineTo( self.origin.x + ( x * ratioX ), self.origin.y - ( y * ratioY ) );
        });

        // 绘制线
        this.ctx.stroke();
    }
}