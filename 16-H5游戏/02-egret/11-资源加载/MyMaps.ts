
class MyMaps extends  egret.DisplayObjectContainer{
    public constructor(){

        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.addImg,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("lg");
    }

    private addImg(){
        var imgs:egret.SpriteSheet = RES.getRes("logo");
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = imgs.getTexture("ios");
        this.addChild(img);
    }
}
