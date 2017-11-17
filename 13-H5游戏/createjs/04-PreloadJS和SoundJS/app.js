
// createjs.Sound.registerSound("../assets/music.mp3", "soundname");  
// createjs.Sound.play("soundname");

var queue = new createjs.LoadQueue(false);//本地开发使用false即可  
queue.installPlugin(createjs.Sound);//如果载入声音，必须先注册createjs.Sound  
queue.on("complete", handleComplete, this);//载入完成后调用  
queue.loadFile({id:"sound", src:"../assets/music.mp3"});//载入单个文件  
//载入一个文件列表，可以是图片，json，css，js等
queue.loadManifest([  
    {id: "myImage1", src:"../images/sunshine.png"},
    {id: "myImage2", src:"../images/animate.png"}
]);  
function handleComplete() {  
    createjs.Sound.play("sound");  
    var image = queue.getResult("myImage1");  
    var bitmap = new createjs.Bitmap(image);  

    var stage = new createjs.Stage("imageView");
    stage.canvas.width = bitmap.image.naturalWidth;
    stage.canvas.height = bitmap.image.naturalHeight;
    stage.addChild(bitmap);
    stage.update();
} 
