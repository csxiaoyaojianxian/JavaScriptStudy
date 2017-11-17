
// 1. 使用 Bitmap 创建图像
// 通过画布ID 创建一个 Stage 实例
var stage1 = new createjs.Stage("imageView");
// 创建一个 Bitmap 实例
var theBitmap1 = new createjs.Bitmap("../images/sunshine.png");
// 设置画布大小等于图片实际大小
stage1.canvas.width = theBitmap1.image.naturalWidth;
stage1.canvas.height = theBitmap1.image.naturalHeight;
// 把Bitmap 实例添加到 stage 的显示列表中
stage1.addChild(theBitmap1);
// 更新 stage 渲染画面
stage1.update();

// 2.使用 Shape 和 Graphics 创建矢量图形
// 深天蓝色，圆心为（50.50），半径为40像素的圆形
var stage2 = new createjs.Stage("circleView");
//Create a Shape DisplayObject.
var circle2 = new createjs.Shape();
circle2.graphics.beginStroke("#ccc").beginFill("DeepSkyBlue").drawRect(5,5,30,30);
//Set position of Shape instance.
circle2.x = circle2.y = 50;
circle2.regX = 10;  
circle2.regY = 10;
circle2.shadow = new createjs.Shadow("#000",5,5,8); 
stage2.addChild(circle2);
stage2.update();

// 3.使用 SpriteSheet 和 Sprite 创建动态的位图
var stage3 = new createjs.Stage("view");
var container3 = new createjs.Container();
var data3 = {   
	// 源图像的数组。图像可以是一个html image实例，或URI图片。前者是建议控制堆载预压
    images:["../images/animate.png"],   
    // 定义单个帧。有两个支持格式的帧数据：当所有的帧大小是一样的（在一个网格）， 使用对象的width, height, regX, regY 统计特性。
    // width & height 所需和指定的帧的尺寸
    // regX & regY 指示帧的注册点或“原点”
    // spacing 表示帧之间的间隔
    // margin 指定图像边缘的边缘
    // count 允许您指定在spritesheet帧的总数；如果省略，这将根据源图像的尺寸和结构计算。帧将被分配的指标，根据他们的位置在源图像（左至右，顶部至底部）。
    frames:{width:80,height:80, count:16, regX: 0, regY:0, spacing:0, margin:0},
    //如果帧数据的尺寸不同，分别定义即可  
    // frames: [
    //     // x, y, width, height, imageIndex, regX, regY,这里的imageIndex对应“images”列表中的图片索引  
    //     [0,0,64,64,0,32,64],//frames0            
    // ],
    // 一个定义序列的帧的对象，以发挥命名动画。每个属性对应一个同名动画。
    // 每个动画必须指定播放的帧，还可以包括相关的播放速度（如2 将播放速度的两倍，0.5半）和下一个动画序列的名称。   
    animations:{
        stand:0,
        run1:[0,3],
        run2:[4,7],
        run3:[8,11],
        run4:[12,15],
        run: {
            frames: [1,3,5,7],  
            next: "run2",//a2播放完成后进入a1  
            speed: 5//速度
        }
    }
    
}
var spriteSheet3 = new createjs.SpriteSheet(data3);
var instance3 = new createjs.Sprite(spriteSheet3,"run1");
container3.addChild(instance3);
stage3.addChild(container3);
createjs.Ticker.setFPS(5); //设置帧
createjs.Ticker.addEventListener("tick",stage3);
stage3.update();
document.getElementById('goStraight').onclick =  function goStraight() {
    instance3.gotoAndPlay("run1");
}
document.getElementById('goLeft').onclick =  function goLeft() {
    instance3.gotoAndPlay("run2");
}
document.getElementById('goRight').onclick =  function goRight() {
    instance3.gotoAndPlay("run3");
}
document.getElementById('goBack').onclick =  function goBack() {
    instance3.gotoAndPlay("run4");
}
document.getElementById('run').onclick =  function goBack() {
    instance3.gotoAndPlay("run");
}

// 4.使用 Text 创建简单的文本
var stage4 = new createjs.Stage("TextView");   
var Text4 = new createjs.Text("hello","normal 32px microsoft yahei","#222222");
Text4.x = 20;
Text4.y = 10;
Text4.text = "Hello,EaselJS!"  
stage4.addChild(Text4);
stage4.update();

// 5.使用 Container 创建保存其他显示对象的容器
function init(){  
    stage5 = new createjs.Stage('shapeView');  
    stage5.enableMouseOver();  

    var button5 = new createjs.Container(); 

    var label5 = new createjs.Text("OK","20px Times","#000");  
    label5.textAlign = 'center';  
    label5.textBaseline = 'middle'; 

    var shape5 = new createjs.Shape();  
    shape5.graphics.beginFill("#ff0000").drawCircle(0, 0, 50); 
    shape5.shadow =  new createjs.Shadow("#000",5,5,8); 

    button5.addChild(shape5,label5);
    button5.regX = shape5.width/2;  
    button5.regY = shape5.height/2;  
    button5.x = 100;  
    button5.y = 100;  
    button5.cursor = "pointer"; 

    label5.x = button5.regX;  
    label5.y = 50;

    shape5.addEventListener("click",function(e){  
        alert("ok");  
    });  
    shape5.on("mouseover",function(e){  
        shape5.scaleX = 1.2;  
        shape5.scaleY = 1.2;  
        shape5.alpha = 0.8;  
    });  
    shape5.on("mouseout",function(e){  
        shape5.scaleX = 1;  
        shape5.scaleY = 1;  
        shape5.alpha = 1;  
    });  

    stage5.addChild(button5);

    createjs.Ticker.setFPS(5);  
    createjs.Ticker.addEventListener('tick',update);  
}  

function update(e){
    stage1.update();
    stage5.update();
}    

init();
update();
