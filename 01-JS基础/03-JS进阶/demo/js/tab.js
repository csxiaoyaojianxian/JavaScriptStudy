(function(window) {
    var Tab = function(config) {
        this.init(config);
    };

    Tab.prototype = {
        // constructor: Tab,
        init: function(config) {
            initElements.call(this, config);
            initEvents.call(this);

            if(this.auto === true) {
                this.autoPlay();
            }
        },
        change: function(obj) {
            var tabMain = this.tabMain,
                tabMenus = this.tabMenus,
                tabMLen = tabMenus.length,
                i = 0;

            for(; i < tabMLen; i++) {
                // 清除所有按钮样式
                tabMenus[i].className = "tab-item";
                // 隐藏所有div
                tabMain[i].style.display = "none";
            }

            obj.className += " active";
            tabMain[obj.index].style.display = "block";
        },
        autoPlay: function() {
            var index = -1,
                self = this,
                play = function() {
                    index++;
                    if(index > 3) {
                        index = 0;
                    }

                    self.change(self.tabMenus[index]);
                };

            play();
            setInterval(play, 1000);
        }
    };

    var id = function(idStr) {
        return document.getElementById(idStr);
    };

    var initElements = function(config) {
        // 初始化元素
        // this.container = id(config.container);
        this.tabMenus = id(config.tabMenu).children;
        this.tabMain = id(config.tabMain).children;
        this.auto = config.auto;
    };

    var initEvents = function() {
        var self = this,
            tabMenus = this.tabMenus,
            tabMLen = tabMenus.length,
            i = 0;
        for(; i < tabMLen; i++) {
            // 初始化索引号
            tabMenus[i].index = i;
            // 初始化单击事件
            tabMenus[i].onclick = function() {
                self.change( this );
            };
        }
    };

    // 对外开放
    window.Tab = Tab;
})(window);