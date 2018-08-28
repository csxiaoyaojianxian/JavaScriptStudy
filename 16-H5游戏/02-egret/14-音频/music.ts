class Main extends egret.DisplayObjectContainer {

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private async onAddToStage(event:egret.Event){
        try {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("ms", 0);
        }
        catch (e) {
            console.error(e);
        }
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void{
        var _curSound:egret.Sound = RES.getRes("music_mp3");
        _curSound.play();
    }

}