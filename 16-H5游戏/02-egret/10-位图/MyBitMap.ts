
class MyBitMap extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        //RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.addImage,this);
        //预加载
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.addImage,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("yt");
    }

    private addImage(){
        var img1:egret.Bitmap = new egret.Bitmap();
        img1.texture = RES.getRes("yaotou");
        this.addChild(img1);
    }

    /**
     *三种方式
     * getRes()
     * getResAsync()
     * getResByUrl()
     */

}