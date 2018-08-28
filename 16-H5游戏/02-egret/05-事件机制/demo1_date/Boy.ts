
class Boy extends egret.Sprite{
    public  constructor(){
        super();
    }
    public order(){
        //生成约会事件对象
        var daterEvent:DateEvent = new DateEvent(DateEvent.DATE);
        //添加相应的约会信息
        daterEvent._year = 2014;
        daterEvent._month = 12;
        daterEvent._date = 11;
        daterEvent._where= "学院";
        daterEvent._todo = "共同学习";
        //发送请求事件
        this.dispatchEvent(daterEvent);
    }
}