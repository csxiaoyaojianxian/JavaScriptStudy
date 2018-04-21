
class TouchEventTest extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){

        this.drawText();
        //绘制图形
        var spr:egret.Sprite =new egret.Sprite();
        spr.graphics.beginFill(0xff0000);
        spr.graphics.drawRect(0,0,100,100);
        spr.graphics.endFill();
        spr.width = 100;
        spr.height=100;
        this.addChild(spr);
        //TOuch的开关
        spr.touchEnabled = true;
        spr.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }

    private onTouch(evt:egret.Event):void{
        this.txt.text="你点击了小方块";
    }

//    绘制文本
    private txt:egret.TextField;
    private drawText():void{
        this.txt = new egret.TextField();
        this.txt.size =12;
        this.txt.x = 250;
        this.txt.width=200;
        this.txt.height = 200;
        this.txt.text = "事件文本";
        this.addChild(this.txt);
    }
}