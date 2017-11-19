var util = {
    extend: function ( o1, o2 ) {
        for ( var key in o2 ) {
            if ( o2.hasOwnProperty( key ) ) {
                o1[ key ] = o2[ key ];
            }
        }
    },

    /*
     * function { loadImage } 加载图片资源
     * param { imgUrl: Object } 按照key，val形式存储要加载图片资源
     * param { fn: Function } 加载完毕之后，把资源传给这个回调
     * */
    loadImage: function( imgUrl, fn ) {

        var imgObj = {}; // 保存图片资源

        var tempImg, loaded = 0, imgLenght = 0;

        for ( var key in imgUrl ) {
            imgLenght++;  // 初始化要加载图片的总数

            tempImg = new Image();

            tempImg.onload = function() {
                loaded++; // 统计已经加载完毕的图像

                // 所有的图片都加载完毕
                if ( loaded >= imgLenght ) {
                    // 把加载完毕的资源传给回调供其使用
                    fn( imgObj );
                }
            };

            tempImg.src = imgUrl[ key ];
            imgObj[ key ] = tempImg;
        }

    }
}
