class HelloEgret extends egret.DisplayObjectContainer {

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event){
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
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xFF0000);
        shp.graphics.drawRect(0,0,100,100);
        shp.graphics.endFill();
        this.addChild(shp);
        var shp2:egret.Shape = new egret.Shape();
        shp2.graphics.beginFill(0x00FF00);
        shp2.graphics.drawCircle(0,0,20);
        shp2.graphics.endFill();
        this.addChild(shp2);
        shp2.x = 20;
        shp2.y = 20;
        // 遮罩
        var rect:egret.Rectangle = new egret.Rectangle(20,20,30,50);
        shp.mask = rect;

        /**
         * 碰撞检测
         */
        shp2.width = 100;
        shp2.height = 100;
        // 第三个参数：精确碰撞像素检测
        var isHit:Boolean = shp2.hitTestPoint(25,25,true);
        this.drawText();
        this.infoText.text = "碰撞检测："+isHit;

        /**
         * 设置锚点
         */
        this.anchorOffsetX = 250;

    }

    private infoText:egret.TextField;
    private drawText(){
        this.infoText = new egret.TextField();
        this.infoText.y = 200;
        this.infoText.text = "碰撞检测";
        this.addChild(this.infoText);
    }

}