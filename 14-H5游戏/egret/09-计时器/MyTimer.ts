
class MyTimer extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    /*
     1.2个属性：delay、repeatCount
     2.3个方法：start、reset、stop
     3.2个事件：TimerEvent.TIMER、TimerEvent.TIMER_COMPLETE
     */
    private onAddToStage(event:egret.Event){
        var timer:egret.Timer = new egret.Timer(500,5);
    //    注册监听事件
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerfunc,this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timercomfun,this);
    //    开始计时
        timer.start();
    }

    private timerfunc(){
        alert("计时")
    }
    private timercomfun(){
        alert("计时结束")
    }
}