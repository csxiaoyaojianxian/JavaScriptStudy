
class Girl extends  egret.Sprite{
    public  constructor(){
        super();
    }
    public getDate(evt:DateEvent):void{
        console.log("得到了:"+evt.target.name+"的邀请");
        console.log("希望在"+evt._year+"年"+evt._month+"月"+evt._date+evt._where+evt._todo);
    }
}