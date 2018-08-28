var stage,shape, bg;

function init() {
    stage = new createjs.Stage("game");
    // 设置图片
    bg = new createjs.Bitmap("../images/sunshine.png");
    bg.x = 10;
    bg.y = 10;
    bg.scaleX = 0.5;
    bg.scaleY = 0.5;
    bg.scaleY.alpha = 0.5;
    stage.canvas.width = bg.image.naturalWidth/3;
	stage.canvas.height = bg.image.naturalHeight/3;
    
 	// 1.只选取图片的一部分显示
 	// var rect = new createjs.Rectangle(10,10,1000,1000);  
	// bg.sourceRect = rect;

	// 2.给图片添加遮罩Mask
	shape = new createjs.Shape();  
    shape.graphics.beginFill("#ccc").drawCircle(0,0,200);  
    shape.x = 200;  
    shape.y = 100;  
    bg.mask = shape;

    // 3.给图片添加滤镜和图片的cache方法
	// var blur = new createjs.BlurFilter(5,5,1);  
	// bg.filters = [blur]; 
	// bg.cache(0,0,bg.image.width,bg.image.height);

	stage.addChild(shape,bg);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', update);
}

function update(event) {
	shape.x += 5;  
    if (shape.x > stage.getBounds().width){  
        shape.x = 0;  
    } 
    stage.update();
}

init();