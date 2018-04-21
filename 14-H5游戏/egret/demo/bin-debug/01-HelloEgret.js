var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        // 打开性能面板
        /*
            draw: 渲染时drawcall的次数
            cost: 包含4个参数，EnterFrame阶段的开销，引擎updateTransform开销，引擎draw开销，HTML5的canvas。draw的开销
            FPS: 当前画面的帧频
        */
        // egret.Profiler.getInstance().run(); // 2.5以上版本直接在index.html中设置
        console.log("Hello Egret");
        /**
         *  mask
         */
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xFF0000);
        shp.graphics.drawRect(0, 0, 100, 100);
        shp.graphics.endFill();
        this.addChild(shp);
        var shp2 = new egret.Shape();
        shp2.graphics.beginFill(0x00FF00);
        shp2.graphics.drawCircle(0, 0, 20);
        shp2.graphics.endFill();
        this.addChild(shp2);
        shp2.x = 20;
        shp2.y = 20;
        // 遮罩
        var rect = new egret.Rectangle(20, 20, 30, 50);
        shp.mask = rect;
        /**
         * 碰撞检测
         */
        shp2.width = 100;
        shp2.height = 100;
        // 第三个参数：精确碰撞像素检测
        var isHit = shp2.hitTestPoint(25, 25, true);
        this.drawText();
        this.infoText.text = "碰撞检测：" + isHit;
        /**
         * 设置锚点
         */
        this.anchorOffsetX = 250;
    };
    Main.prototype.drawText = function () {
        this.infoText = new egret.TextField();
        this.infoText.y = 200;
        this.infoText.text = "碰撞检测";
        this.addChild(this.infoText);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
