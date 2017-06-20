//绑定到原型上,调用者是jquery对象
$.fn.setColorRed = function () {
    this.css({"color":"red"});
}
//绑定到$上，调用者是$
$.setColorRed = function (e) {
    e.css({"color":"red"});
}