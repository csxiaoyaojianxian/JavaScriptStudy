(function(w){

    function Tab(config){
        this.tabMenus = null;
        this.tabMains = null;
        if(config){
            this._init(config)
        }
    }

    Tab.prototype = {
        //初始化工作
        _init:function (config) {
            this.initElements(config);
            this.initEvent();

            if(config.auto){
                this.autoPlay();
            }
        },
        initEvent:function(){
            for (var i = 0; i < this.tabMenus.length; i++) {
                var li = this.tabMenus[i];
                li.index = i;
                //that存储当前对象也就Tab创建出来的对象
                var that = this;
                li.onclick = function(){
                    //that还是只想Tab创建出来的对象
                    //this指的就是当前点击事件触发的这个li
                    that.change(this);
                };
            }
        },
        initElements:function(config){
            //根据config里的id
            //给当前对象的tabMenus和tabMains赋值
            var tabMenu = document.getElementById(config.tabMenu);
            var tabMain = document.getElementById(config.tabMain);

            this.tabMenus = tabMenu.children;
            this.tabMains = tabMain.children;
        },
        change:function(tabMenu){
            //1.让所有的li变暗
            for (var i = 0; i < this.tabMenus.length; i++) {
                this.tabMenus[i].className = "tab-item";
                //3.让所有div隐藏
                this.tabMains[i].style.display = "none";
            }
            //2.让当前的li变亮
            tabMenu.className += " active";
            //4.对应的div显示
            this.tabMains[tabMenu.index].style.display = "block";
        },
        autoPlay:function () {
            var index = 0;
            var that = this;
            setInterval(function(){
                index++;
                if(index == that.tabMenus.length){
                    index = 0;
                }
                that.change(that.tabMenus[index]);
            },2000);
        }
    }
    w.Tab = Tab;
})(window)
