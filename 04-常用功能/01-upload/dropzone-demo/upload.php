<?php
    //包含一个文件上传类中的上传类
    include "fileupload.class.php";
  
    $up = new fileupload;
    //设置属性(上传的位置， 大小， 类型， 名是是否要随机生成)
    $up -> set("path", "./files/");
    $up -> set("maxsize", 2000000);
    $up -> set("allowtype", array("gif", "png", "jpg","jpeg"));
    $up -> set("israndname", true);
  
    //使用对象中的upload方法， 就可以上传文件， 方法需要传一个上传表单的名子 pic, 如果成功返回true, 失败返回false
    if($up -> upload("csxiaoyao")) {
        echo '<pre>';
        //获取上传后文件名子
        var_dump($up->getFileName());
        echo $_POST['test'];//post表单参数可获取
        echo '</pre>';
  
    } else {
        echo '<pre>';
        //获取上传失败以后的错误提示
        var_dump($up->getErrorMsg());
        echo '</pre>';
    }
?>