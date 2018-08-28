
class SimpleDate extends  egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        //创建一个男朋友
        var boy:Boy = new Boy();
        boy.name = "ime";
        //创建女朋友
        var girl:Girl = new Girl();
        girl.name = "小雪";
        //注册侦听事件
        boy.addEventListener(DateEvent.DATE,girl.getDate,girl,false,10);

        //检测侦听器
        if(boy.hasEventListener(DateEvent.DATE)){
            console.log("已经注册");
        }else{
            console.log("未注册");
        }
        //男朋友的邀请
        boy.order();
        //移除侦听器
        boy.removeEventListener(DateEvent.DATE,girl.getDate,girl);
        //检测侦听器
        if(boy.hasEventListener(DateEvent.DATE)){
            console.log("已经注册");
        }else{
            console.log("未注册");
        }
    }
}