
class BitmapTest extends  egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.addImg,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("yt");
    }

    private addImg(){
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("yaotou");
        img.fillMode = egret.BitmapFillMode.REPEAT;
        img.width *=2;
        img.height *=3;
        this.addChild(img);
    }
}