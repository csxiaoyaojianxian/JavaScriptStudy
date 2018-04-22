class MyPic extends egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.addImage,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("tt");
    }

    private addImage(){
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("toolt");
        this.addChild(img);

        var img1:egret.Bitmap = new egret.Bitmap();
        img1.texture = RES.getRes("toolt");
        img1.width *=2;
        img1.y = 150;
        this.addChild(img1);

        var img2:egret.Bitmap = new egret.Bitmap();
        img2.texture = RES.getRes("toolt");
        var rect:egret.Rectangle = new egret.Rectangle(30,31,40,41);
        img2.scale9Grid =rect;
        img2.width *=2;
        img2.y = 300;
        this.addChild(img2);
    }
}