<?php 
	// echo 'age:'.$_POST['age'];
	// echo 'age:'.$_GET['age'];

	// 返回json
	header('content-type:text/html; charset= utf-8');
	$str = file_get_contents('info/info.json');
	// 转化为php中的数组 str->php arr
	$arr = json_decode($str);
	echo  json_encode($arr);

	// 返回xml
	header('content-type:text/xml; charset= utf-8');
	echo file_get_contents('info/person.xml');
 ?>