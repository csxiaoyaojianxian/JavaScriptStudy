// DOM操作
var rect = new createjs.DOMElement("test");  

// hitTest碰撞检测
var stage, circle, loader;
function init() {
    stage = new createjs.Stage(document.getElementById('game'));
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);

    circle = new createjs.Shape();
    circle.graphics.beginFill("red").dc(100, 100, 50);
    stage.addChild(circle);
}
function handleTick(event) {
    circle.alpha = 0.2;
    if (circle.hitTest(stage.mouseX, stage.mouseY)) { //直接使用circle的hitTest碰撞检测方法  
        circle.alpha = 1;
    }
    stage.update();
}

// 把全局坐标转化为本地坐标
var stage, holder;  
function init2() {  
    stage = new createjs.Stage("game");  
    holder = stage.addChild(new createjs.Container());  
    holder.x = holder.y = 150;  
    for (var i=0; i<25; i++) {  
        var shape = new createjs.Shape();  
        shape.graphics.beginFill(createjs.Graphics.getHSL(Math.random()*360,100,50)).drawCircle(0,0,30);  
        shape.x = Math.random()*300-150;  
        shape.y = Math.random()*300-150;  
        holder.addChild(shape);  
    }  
    createjs.Ticker.on("tick", tick);  
}  
function tick(event) {  
    holder.rotation += 3;  
    var l = holder.getNumChildren();  
    for (var i=0; i<l; i++) {  
        var child = holder.getChildAt(i);  
        child.alpha = 0.1;  
        var pt = child.globalToLocal(stage.mouseX, stage.mouseY);//先使用元素的globalToLocal做坐标的转换  
        // console.log(pt.x, pt.y);  
        if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) { child.alpha = 1; }//碰撞判断，使用转换后的本地坐标  
    }  
    stage.update(event);  
}  
init2();

// LocalTOLocal
var stage, arm, target;
function init3() {
    stage = new createjs.Stage("game");
    //红色目标  
    target = stage.addChild(new createjs.Shape());
    target.graphics.beginFill("red").drawCircle(0, 0, 45)
        .beginFill("white").drawCircle(0, 0, 30)
        .beginFill("red").drawCircle(0, 0, 15);
    target.x = 100;
    target.y = 180;

    arm = stage.addChild(new createjs.Shape());
    arm.graphics.beginFill("black").drawRect(-2, -2, 100, 4) //黑色方形  
        .beginFill("blue").drawCircle(100, 0, 8); //蓝色球  

    arm.x = 180;
    arm.y = 100;

    createjs.Ticker.on("tick", tick2);
}
function tick2(event) {
    arm.rotation += 5;

    target.alpha = 0.2;
    var pt = arm.localToLocal(100, 0, target); //碰撞检测前，先把arm图形中的某点的坐标跟目标target做一个转化，这里是（100，0），也就是蓝球中心  
    if (target.hitTest(pt.x, pt.y)) { target.alpha = 1; } //使用转化后的坐标进行检测即可判断两个物体是否相交。  

    stage.update(event);
}
init3();