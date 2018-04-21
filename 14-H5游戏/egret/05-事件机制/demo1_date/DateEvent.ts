
class DateEvent extends egret.Event{
    public static DATE:string = "约会";
    public _year:number = 0;
    public _month:number = 0;
    public _date:number = 0;
    public _where:string = "";
    public _todo:string = "";

    public constructor(type:string,bulles:boolean = false,cancelable:boolean = false){
        super(type,bulles,cancelable);
    }
}