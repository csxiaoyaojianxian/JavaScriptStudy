class NetDemo extends egret.DisplayObjectContainer{

    public  constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private urlloader:egret.URLLoader;
    private onAddToStage(event:egret.Event){
        this.urlloader = new egret.URLLoader();
        var urlreq:egret.URLRequest = new egret.URLRequest();
    //    请求网络地址
        urlreq.url = "http://httpbin.org/user-agent";
        this.urlloader.load(urlreq);
        this.urlloader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
    }

    private onComplete(evetn:egret.Event):void{
        console.log(this.urlloader.data);
    }
}