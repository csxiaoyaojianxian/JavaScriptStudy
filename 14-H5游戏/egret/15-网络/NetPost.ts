
class NetPost extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        var url:string = "http://httpbin.org/post";
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables("test=ok");
        loader.load(request);
    }

    private onPostComplete(event:egret.Event):void{
        var loader:egret.URLLoader = <egret.URLLoader> event.target;
        var data:egret.URLVariables = loader.data;
        console.log(data.toString);
    }
}