var stage1, stage2, circle;
function initTick() {
    stage1 = new createjs.Stage(document.getElementById('game'));
    createjs.Ticker.addEventListener("tick", handleTick1);
    createjs.Ticker.setFPS(60);
    circle = new createjs.Shape();
    circle.graphics.f("red").dc(0, 0, 50);
    circle.x = 0;
    circle.y = 100;
    stage1.addChild(circle);
    circle.addEventListener("click", function(event) {
        createjs.Ticker.paused = !createjs.Ticker.paused;
    });
}
function handleTick1(event) {
    if (!event.paused) {
        circle.x += 5;
        if (circle.x > 1000) {
            circle.x = 0;
        }
    }
    stage1.update();
}
initTick();

// 使用TweenJS
function initTween() {
    stage2 = new createjs.Stage(document.getElementById('game'));
    stage2.canvas.width = 500;
    stage2.canvas.height = 500;
    createjs.Ticker.addEventListener("tick", handleTick2);
    createjs.Ticker.setFPS(60);
    circle = new createjs.Shape();
    circle.graphics.f("red").dc(0, 0, 50);
    circle.x = 0;
    circle.y = 100;
    stage2.addChild(circle);
    // createjs.Tween.get().wait().to().call();
    createjs.Tween.get(circle, { loop: true }).wait(100)
                .to({x:300},1000)
                .to({y:300,alpha:0.2},1000)
                .to({x:0,alpha:1,scaleX:1.5,scaleY:1.5},1000)  
                .to({y:0,scaleX:1,scaleY:1},1000)
                .to({y:300},1000,createjs.Ease.bounceOut);  
;
}
function handleTick2(event) {
    stage2.update();
}
initTween();

// CSSPluginjs库
createjs.CSSPlugin.install(createjs.Tween);  
var box = document.createElement("div");  
box.style.width = "100px";  
box.style.height = "100px";  
box.style.position = "absolute";  
box.style.borderRadius = "8px";  
box.style.backgroundColor = "#0F0";  
document.body.appendChild(box); 