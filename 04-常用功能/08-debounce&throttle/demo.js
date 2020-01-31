/**
 * Created by thephpjo on 21.04.14.
 */


function NIM_demo(){
    this.canvas =   document.getElementById("paintonme");
    this.context =  this.canvas.getContext("2d");

    this.movearea = document.getElementById("moveonme");

    this.canvasTimeScale = 5 * 1000;

    this.paintColors = ["#bbd","#464","#d88"];
    this.totalLanes =  this.paintColors.length;

    this.leftMargin = 100;

    var self = this;

    this.init = function(){
        this.canvas.width = window.innerWidth - 250;
        this.flush();
        this.movearea.addEventListener("mousemove",this.regularHandler);
        this.movearea.addEventListener("mousemove",helpers.debounce(self.debounceHandler,100,this));
        this.movearea.addEventListener("mousemove",helpers.throttle(self.throttleHander,100,this));
    }

    /**
     * painting the rectangle / line
     * @param lane
     * @param time
     */
    this.paintRect = function(lane,time){
        if(time > this.canvasTimeScale){
            this.startTime += time;
            time = 0;
            this.flush()
        }
//            console.log(lane,time);
        this.context.fillStyle = this.paintColors[lane];

        var x =         (this.canvas.width - this.leftMargin)  / this.canvasTimeScale * time + this.leftMargin;
        var y =         this.canvas.height / this.totalLanes      * lane;
        var height =    this.canvas.height / this.totalLanes;
        var width =     1;

        this.context.fillRect(x,y,width,height);
    }

    this.flush = function(){
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

        this.context.font = "200 18px Roboto,Helvetica,Arial";
        this.context.fillStyle = this.paintColors[0];
        this.context.fillText("Regular", 0, 100);

        this.context.fillStyle = this.paintColors[1];
        this.context.fillText("debounce", 0, 300);

        this.context.fillStyle = this.paintColors[2];
        this.context.fillText("throttle", 0, 500);
    }
    /**
     * get the time difference
     * @returns {number}
     */
    this.getTimeDiff = function(){
        var time = new Date().getTime();
        if(!this.startTime){
            this.startTime = time;
        }
        time -= this.startTime;
        return time;
    }

    this.regularHandler = function(){
        self.paintRect(0,self.getTimeDiff());
    }
    this.debounceHandler = function(){
        self.paintRect(1,self.getTimeDiff());
    }
    this.throttleHander = function(){
        self.paintRect(2,self.getTimeDiff());
    }
}


