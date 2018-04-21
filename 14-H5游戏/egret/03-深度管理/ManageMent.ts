
class ManageMent extends  egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(){
        //深度值：0
    //    var spr:egret.Sprite = new egret.Sprite();
    //    spr.graphics.beginFill(0xff0000);
    //    spr.graphics.drawRect(0,0,100,100);
    //    spr.graphics.endFill();
    //    this.addChild(spr);
    ////    z-次序
    //    console.log(this.numChildren);
    //    //深度值：1
    //    var spr1:egret.Sprite = new egret.Sprite();
    //    spr1.graphics.beginFill(0x00ff00);
    //    spr1.graphics.drawRect(0,0,100,100);
    //    spr1.graphics.endFill();
    //    spr1.x = 30;
    //    spr1.y = 30;
    //    this.addChild(spr1);

        var sprcon:egret.Sprite = new egret.Sprite();
        this.addChild(sprcon);
        sprcon.x =10;
        for(var i:number = 0;i<4;i++){
            var spr:egret.Sprite = new egret.Sprite();
            spr.graphics.beginFill(0xffffff*Math.random());
            spr.graphics.drawRect(0,0,100,100);
            spr.graphics.endFill();
            spr.x = i*20;
            sprcon.addChild(spr);
        }

        var sprNew:egret.Sprite = new egret.Sprite();
        sprNew.graphics.beginFill(0xff0000);
        sprNew.graphics.drawRect(0,0,150,150);
        sprNew.graphics.endFill();
        sprNew.x = 10;
        sprNew.y = 10;
        //sprNew.addChild(sprcon);
        sprcon.addChildAt(sprNew,1);
        /**
         * 容器.swapChildren(显示对象，显示对象)
         * 容器.swapChildrenAt(深度值,深度值)
         */
        //sprcon.swapChildrenAt(1,3);
    //    容器.setChildIndex(显示对象,新的深度值)
        sprcon.setChildIndex(sprNew,4);
    }
}