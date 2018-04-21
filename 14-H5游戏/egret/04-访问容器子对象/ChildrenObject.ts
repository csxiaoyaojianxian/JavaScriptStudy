
class  ChildrenObject extends  egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){

        var spr:egret.Sprite = new egret.Sprite();
        this.addChild(spr);

        var spr1:egret.Sprite = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00);
        spr1.graphics.drawRect(0,0,100,100);
        spr1.graphics.endFill();
        spr1.x = 50;
        spr1.name="Hello";
        spr.addChild(spr1);

        //var _spr:egret.DisplayObject = spr.getChildAt(0);
        var _spr:egret.DisplayObject = spr.getChildByName("Hello");
        _spr.scaleX = 0.5;
    }
}