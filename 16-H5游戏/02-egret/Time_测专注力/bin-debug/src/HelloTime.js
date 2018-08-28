/**
 * Created by wwtliu on 14/12/19.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HelloTime = (function (_super) {
    __extends(HelloTime, _super);
    function HelloTime() {
        _super.call(this);
        this.n = 6;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    HelloTime.prototype.onAddToStage = function (event) {
        this.spr = new egret.Sprite();
        this.addChild(this.spr);
        this.spr.width = 480;
        this.spr.height = 800;
        this.drawTxt();
        this.drawContent();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onButtonComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("button");
        this.timer = new egret.Timer(1000, 8);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    HelloTime.prototype.drawTxt = function () {
        this.num = new egret.TextField();
        this.num.text = this.n.toString();
        this.num.size = 100;
        this.num.width = 480;
        this.num.textColor = 0x00ff00;
        this.num.textAlign = egret.HorizontalAlign.CENTER;
        this.spr.addChild(this.num);
    };
    HelloTime.prototype.drawContent = function () {
        this.con = new egret.TextField();
        this.con.text = "默默倒数6秒，迅速点击文字";
        this.con.textColor = 0x00ff00;
        this.con.width = 480;
        this.con.textAlign = egret.HorizontalAlign.CENTER;
        this.con.y = 120;
        this.spr.addChild(this.con);
    };
    HelloTime.prototype.onButtonComp = function () {
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes("btn");
        var rect = new egret.Rectangle(10, 10, 15, 15);
        this.img.scale9Grid = rect;
        this.img.y = 200;
        this.img.x = 150;
        this.img.width *= 5;
        this.img.height = 70;
        this.spr.addChild(this.img);
        this.img.touchEnabled = true;
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    HelloTime.prototype.onTouch = function (evt) {
        this.date = new Date();
        this.startTime = this.date.getTime();
        this.img.alpha = 0;
        this.timer.start();
        this.drawTxt();
        this.spr.touchEnabled = true;
        this.spr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
    };
    HelloTime.prototype.timerFunc = function () {
        if (this.n <= 3) {
            this.num.text = "?";
        }
        else {
            this.spr.removeChildren();
            this.drawTxt();
        }
        this.n--;
    };
    HelloTime.prototype.timerComFunc = function () {
        if (this.n <= -2) {
            this.drawContent();
            this.con.text = "别模糊了醒醒";
            this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        }
    };
    HelloTime.prototype.onTouchSRP = function (evt) {
        this.date = new Date();
        this.stopTime = this.date.getTime();
        this.finalTime = this.startTime - this.stopTime;
        this.num.text = (this.finalTime / 1000 + 6).toFixed(3);
        this.timer.stop();
        this.drawContent();
        this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        switch (Math.floor(Math.abs(this.finalTime / 1000 + 6))) {
            case 0:
                this.con.text = "帅气的专注";
                break;
            case 1:
                this.con.text = "很专注，还需继续努力";
                break;
            case 2:
                this.con.text = "别模糊了醒醒";
                break;
        }
    };
    return HelloTime;
})(egret.DisplayObjectContainer);
HelloTime.prototype.__class__ = "HelloTime";
