/*
* @Author: SUNSHINE
* @Date:   2017-02-03 20:58:39
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-02-03 21:54:26
*/
//缓动动画封装
function animate_align(ele,target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = (target-ele.offsetLeft)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        ele.style.left = ele.offsetLeft + step + "px";
        console.log(1);
        if(Math.abs(target-ele.offsetLeft)<Math.abs(step)){
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },18);
}
function animate_vertical(ele,target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = (target-ele.offsetTop)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        ele.style.top = ele.offsetTop + step + "px";
        console.log(1);
        if(Math.abs(target-ele.offsetTop)<Math.abs(step)){
            ele.style.top = target + "px";
            clearInterval(ele.timer);
        }
    },18);
}