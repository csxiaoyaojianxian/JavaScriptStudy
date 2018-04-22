
/*
  SHOW_ALL:
  BO_BORDER
  NO_SCALE
  EXACT_FIT
 */



class Main extends egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private card:Card;
    private tw:string = "中奖了";
    private nw:string = "未中奖";
    private wx:number = (Math.floor(Math.random()*3));
    private wy:number = (Math.floor(Math.random()*3));

    private onAddToStage(event:egret.Event){

        for(var i:number = 0;i<3;i++){
            for(var j:number = 0;j<3;j++){
                this.card = new Card();
                this.card.touchEnabled = true;
                this.card.x = i*105;
                this.card.y = j*105;
                if(i==this.wx &&j ==this.wy){
                    this.addChild(this.card.draw(this.tw));
                }else{
                    this.addChild(this.card.draw(this.nw));
                }
                this.card.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
            }
        }
    }
    private onTouch(evt:egret.Event){
        evt.target.showTxt();
    }


}