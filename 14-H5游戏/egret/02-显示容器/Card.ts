
class Card extends egret.Sprite{
    public constructor(){
        super();
        this.drawCard();
    }

    private drawCard(){
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0,0,50,50);
        this.graphics.drawRect(50,50,50,50);
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(50,0,50,50);
        this.graphics.drawRect(0,50,50,50);
        this.graphics.endFill();
    }
}