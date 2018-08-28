
class MyTest extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        var label:egret.TextField = new egret.TextField();
        label.width = 400;
        label.height = 70;

        label.textColor = 0xff0000;
        //楷体
        label.fontFamily = "KaiTi";

        //布局
        label.textAlign = egret.HorizontalAlign.RIGHT;

        //设置文字的粗体和斜体
        label.bold = true;
        label.italic = true;

        //label.text = "这\n是\n第\n一\n个\n文\n本";
        label.text = "这是第一个文本";
        //alert(label.width+"--"+label.height);
        this.addChild(label);
        label.text = "你好啊";
        //alert(label.width+"--"+label.height);
    }
}