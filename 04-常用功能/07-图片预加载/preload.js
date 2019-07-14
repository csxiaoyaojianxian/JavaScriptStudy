(function($) {
  // 面向对象
  function PreLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, PreLoad.DEFAULTS, options); // options和PreLoad.DEFAULTS这2个对象融合，生成新的对象，将新对象返回给opts保存下来
    if (this.opts.order === 'ordered') {
      this._ordered();
    } else {
      this._unordered(); // _表示只在函数内部使用，而不在外部调用
    }
  }
  PreLoad.DEFAULTS = {
    order: 'unordered', // 无序 / 有序 预加载
    eachCb: null, // 每一张图片加载完毕后执行
    allCb: null  // 所有图片加载完毕后执行
  };
  // 面向对象将方法写在原型上，可以使得每次实例化时保持一份
  // 有序预加载
  PreLoad.prototype._ordered = function() { //方法写在原型链上
    var opts = this.opts, // 保存为局部变量
        imgs = this.imgs,
        len = imgs.length,
        count = 0;
    var imgObj = new Image();
    load();
    function load() {
      $(imgObj).on('load error', function() {
        opts.eachCb && opts.eachCb(count);
        if (count >=len) {
          // 所有图片已经加载完毕
          opts.allCb && opts.allCb();
        } else {
          load();
        }
        count++;
      });
      imgObj.src = imgs[count];
    }
  },
  // 无序预加载
  PreLoad.prototype._unordered = function () { // 无序加载
    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len = imgs.length;
    $.each(imgs, function(i, src) {
      if (typeof src != 'string') return;
      var imgObj = new Image();
      $(imgObj).on('load error', function() {
        opts.eachCb && opts.eachCb(count); // 如果opts.eachCb存在，执行opts.eachCb方法
        if (count >= len - 1) {
          opts.allCb && opts.allCb();
        }
        count ++;
      });
      imgObj.src = src;
    });
  }

  // 1. jQuery.extend(object);     为扩展jQuery类本身，为类添加新的方法
  // 2. jQuery.fn.extend(object);  给jQuery对象添加方法
  // jQuery.fn.extend = jQuery.prototype.extend

  // $.extend --> $.preload();
  // $.fn.extend --> $('#img').preload();

  // 成为插件方式
  $.extend({
    preload: function(imgs, opts) {
      new PreLoad(imgs, opts);
    }
  });
})(jQuery);