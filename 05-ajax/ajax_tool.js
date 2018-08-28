// ajax get 五部曲
function ajax_get(url,data) {
	// 异步对象
	var ajax = new XMLHttpRequest();

	// url 方法
	// 如果是get发送数据 发送的格式为 xxx.php?name=jack&age=18
	// 所以 这里 需要拼接 url
	if (data) {
		// 如果有值 需要拼接字符串 
		// 拼接为xxx.php?name=jack&age=18
		url+='?';
		url+=data;
	}else{
	}

	ajax.open('get',url);
	// 发送
	ajax.send();

	// 注册事件
	ajax.onreadystatechange = function () {
		// 在事件中 获取数据 并修改界面显示
		if (ajax.readyState==4&& ajax.status==200) {
			console.log(ajax.responseText);
		}
	}
}

// ajax_post五部曲
function ajax_post(url,data) {
	// 异步对象
	var ajax = new XMLHttpRequest();

	// url 方法
	ajax.open('post',url);

	// 设置 请求报文 
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	// 发送
	if (data) {
		// 如果 有值 post请求 是在 send中 发送给服务器
		ajax.send(data);
	}else{
		ajax.send();
	}
	

	// 注册事件
	ajax.onreadystatechange = function () {
		// 在事件中 获取数据 并修改界面显示
		if (ajax.readyState==4&&ajax.status==200) {
			console.log(ajax.responseText);
		}
	}

}

// 将 get 跟post 封装到一起
/*
	参数1:url
	参数2:数据
	参数3:请求的方法
	参数4:数据成功获取以后 调用的方法
*/
function ajax_tool(url,data,method,success) {
	// 异步对象
	var ajax = new XMLHttpRequest();

	// get 跟post  需要分别写不同的代码
	if (method=='get') {
		// get请求
		if (data) {
			// 如果有值
			url+='?';
			url+=data;
		}else{

		}
		// 设置 方法 以及 url
		ajax.open(method,url);

		// send即可
		ajax.send();
	}else{
		// post请求
		// post请求 url 是不需要改变
		ajax.open(method,url);

		// 需要设置请求报文
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

		// 判断data send发送数据
		if (data) {
			// 如果有值 从send发送
			ajax.send(data);
		}else{
			// 木有值 直接发送即可
			ajax.send();
		}
	}

	// 注册事件
	ajax.onreadystatechange = function () {
		// 在事件中 获取数据 并修改界面显示
		if (ajax.readyState==4&&ajax.status==200) {
			// console.log(ajax.responseText);

			// 将 数据 让 外面可以使用
			// return ajax.responseText;

			// 当 onreadystatechange 调用时 说明 数据回来了
			// ajax.responseText;

			// 如果说 外面可以传入一个 function 作为参数 success
			success(ajax.responseText);
		}
	}

}