var div = document.createElement("div");
document.body.appendChild(div);
var obj = new Time.Test(div);

var button1 = document.createElement("button");
button1.innerHTML = "start";
button1.onclick = function(){
	obj.start();
}
document.body.appendChild(button1);

var button2 = document.createElement("button");
button2.innerHTML = "stop";
button2.onclick = function(){
	obj.stop();
}
document.body.appendChild(button2);