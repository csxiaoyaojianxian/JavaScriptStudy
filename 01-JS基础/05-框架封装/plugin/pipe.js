(function( w ) {

    // 把角度转换为弧度
    function angleToRadian( angle ) {
        return Math.PI / 180 * angle;
    }

    // 混入式继承
    function extend( o1, o2 ) {
        for ( var key in o2 ) {
            // 只有o2自己的属性才会copy到o1身上
            if ( o2.hasOwnProperty( key ) ) {
                o1[ key ] = o2[ key ];
            }
        }
    }

    /*
     * constrcutor { Pipe } 饼图构造函数
     * param { ctx: Context } 绘制上下文
     * param { x: number } 圆心x轴坐标
     * param { y: number } 圆心y轴坐标
     * param { r: number } 圆半径
     * param { data: Array } 绘制饼图所需的数据
     * */
    function Pipe( ctx, x, y, r, data ) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.data = data;

        // 一组颜色
        this.colors = [ 'orange', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'peru', 'pink' ];
    }

    // 给原型扩充方法
    extend( Pipe.prototype, {

        // 绘制饼图
        draw: function() {

            // 在外面保存一下this
            var self = this;

            // 数据的总和
            var num = 0;
            this.data.forEach( function( obj ) {
                num += obj.val;
            });

            // 一个数据值所占用的角度
            var baseAngle = 360 / num;

            // 假设一开始就绘制了一个起始为0，结束为0的扇形
            var startAngle = 0,
                endAngle = 0,
                lineAngle = 0,
                lineX, lineY;

            // 画扇形
            this.data.forEach( function( obj, i ) {

                // 每次进来，计算当前扇形的起始角度和结束角度

                // 下一个扇形的起始角度，是当前扇形的结束角度
                startAngle = endAngle;
                // 这个结束角度 = 上一个扇形的结束角度 + 当前数值所对应的角度
                endAngle = endAngle + baseAngle * obj.val;

                // 求扇形中间线的角度
                lineAngle = startAngle + baseAngle * obj.val / 2;
                /*
                * 根据中间线的角度，求中间的线的x和y坐标：
                * x = 圆心x + r * Math.cos( angleToRadian( pointAngle ) )
                * y = 圆心y + r * Math.sin( angleToRadian( pointAngle ) )
                * */
                lineX = self.x + ( self.r + 20 ) * Math.cos( angleToRadian( lineAngle ) );
                lineY = self.y + ( self.r + 20 ) * Math.sin( angleToRadian( lineAngle ) );


                // 画每一个扇形
                self.ctx.beginPath();
                self.ctx.moveTo( self.x, self.y );
                self.ctx.arc( self.x, self.y, self.r, angleToRadian( startAngle ), angleToRadian( endAngle ) );
                self.ctx.closePath();
                self.ctx.fillStyle = self.colors[ i ];
                self.ctx.fill();

                // 画每一个扇形的平分线
                self.ctx.beginPath();
                self.ctx.moveTo( self.x, self.y );
                self.ctx.lineTo( lineX, lineY );
                self.ctx.strokeStyle = self.colors[ i ];
                self.ctx.stroke();

                // 绘制文字
                if ( lineAngle >= 90 && lineAngle <= 270 ) {
                    self.ctx.textAlign = 'right';
                }else {
                    self.ctx.textAlign = 'left';
                }
                self.ctx.fillText( obj.msg, lineX, lineY );
            });
        }
    } );

    // 添加一个绘制饼图的插件方法
    jQuery.fn.pipe = function( data ) {

        var $node = this.first();
        var canvas = jQuery( '<canvas></canvas>' ).get(0);
        var ctx = canvas.getContext('2d');

        // 根据第一个元素的宽高设置画布的宽高
        var width = parseInt( $node.css( 'width' ) );
        var height = parseInt( $node.css( 'height' ) );
        canvas.width = width;
        canvas.height = height;

        // 计算饼图的圆心坐标和半径（那个小取那个）
        var x = width / 2;
        var y = height / 2;
        var r = x > y? y: x;

        // 给饼图的文字留一点余地
        r -= 30;

        // 创建饼图实例，绘制
        var pipe = new Pipe( ctx, x, y, r, data );
        pipe.draw();

        // 把绘制好的画布添加到第一个元素中
        $node.append( canvas );
    };

}( window ));
