/**
 * ssologin.js
 */
function SSOController() {
	var me = this; // use in private function 
	var updateCookieTimer = null;
	var updateCookieTimeHardLimit = 1800; // 在该时间内不允许更新cookie，默认30分钟
	var cookieExpireTimeLength = 3600 * 24;  // cookie过期时间为24小时

	var crossDomainForward = null ;  // 广播操作完成后执行的动作
	var crossDomainTimer = null;
	var crossDomainTime = 3; // 允许广播操作的最大时间
	var autoLoginCallBack2 = null;

	var ssoCrosssDomainUrl = 'http://login.sina.com.cn/sso/crossdomain.php';
	var ssoLoginUrl = 'http://login.sina.com.cn/sso/login.php';
	var ssoLogoutUrl = 'http://login.sina.com.cn/sso/logout.php';
	var ssoUpdateCookieUrl = 'http://login.sina.com.cn/sso/updatetgt.php';
	var ssoPreLoginUrl = 'http://login.sina.com.cn/sso/prelogin.php';
	var ssoCheckAltLoginNameUrl = 'http://login.sina.com.cn/bindmail/checkmailuser.php';
	var pincodeUrl = 'http://login.sina.com.cn/cgi/pin.php';
	var vfValidUrl = 'http://weibo.com/sguide/vdun.php';

	var crossDomainUrlList = null;
	
	var loginMethod = ""; // post or get ,方便登录后的处理
	var checkAltLoginNameCallbackData = {};
	var ssoCheckAltLoginNameScriptId = 'check_alt_login';

	var ssoServerTimeTimer = null;
	var ssoLoginTimer = null;

	var loginByConfig = null;  // 为再次登录使用
	var loginMethodCheck = null;  // 为再次登录使用

	var https = 1;	//write only
	var rsa = 2;	//write only
	var wsse = 4;	//write only
    var pcid = "";	//pincode id
	
	var tmpData = {};

	var preloginTimeStart = 0;
	var preloginTime = 0;

	this.https = 1; //read only
	this.rsa = 2;	//read only
	this.wsse = 4;	//read only
	

	this.name = 'sinaSSOController';
	this.loginFormId = 'ssoLoginForm';
	this.scriptId = 'ssoLoginScript';
	this.ssoCrossDomainScriptId = 'ssoCrossDomainScriptId';
	this.loginFrameName = 'ssoLoginFrame';
	this.appLoginURL = {'51uc.com':'http://passport.51uc.com/sso/login.php','weibo.com':'http://weibo.com/sso/login.php'};
	this.appDomainService = {'51uc.com':'51uc','weibo.com':'miniblog'};
	this.loginExtraQuery = {};

	//需要配置的内容
	this.setDomain = false; // 为向下兼容提供的开启新特性的参数
	this.feedBackUrl = '';
	this.service = 'sso';
	this.domain = 'sina.com.cn'; // sina.com.cn 域的产品不许需要该设置
	this.from = ''; // 请求的具体来源，比entry更具体
	this.pageCharset = 'GB2312'; // 页面的编码，主要是用于认证,默认为GB2312
	this.useTicket = false; // 登录成功或失败后是否返回ticket，默认为false
	this.isCheckLoginState = false; // 初始化时是否检查登录状态, 检查将调feedBackUrl ,所以默认不检查
	this.isUpdateCookieOnLoad = true; // 是否在加载该js文件后自动更新一次cookie，默认为自动更新,如果自定义了回调函数，请不要自动更新cookie
	this.useIframe = true; // 默认使用iframe 做post方式的登录，如果不能提供feedBackUrl，将不能使用该方式,改配置选项不出现在文档中
	this.noActiveTime = 7200; // 不活跃时长，默认2小时
	this.autoUpdateCookieTime = 1800; // 页面不动时自动更新cookie的间隔时间,默认30分钟,少于5s不做更新
	this.loginType = rsa; // 默认rsa方式
	this.timeoutEnable = false;
	this.crossDomain = true; // default true
	this.scriptLoginHttps = false; // 当使用post方式登录失败后，转换为script标签方式的登录是否强制使用https的方式登录,默认使用wsse方式登录
	
	this.allowAutoFoundServerTime = false; //是否自动发现服务器端时间,默认不自动发现，至少非登录页面也在使用该js，这些页面就不关心服务器时间了
	this.allowAutoFoundServerTimeError = true; //是否自动发现服务器端时间错误
	this.calcServerTimeInterval = 2000; //2s
	this.servertime = null;
	this.nonce = null;
	this.rsaPubkey = null;
	this.rsakv = null;
	
	this.loginExtraFlag = {};
	this.cdult = false;
	this.crossDomainTime = 5;
	this.failRedirect = false; //当遇到需要跳转的页面时，当前页面是否支持跳转。

	this.getVersion = function() {
		return "ssologin.js(v1.4.2) 2012-8-21";
	};
	this.getEntry = function() {
		return me["entry"];
	};
	this.getClientType = function() {
		return me.getVersion().split(' ')[0];
	};
	this.init = function() {
		me.setLoginType(me.loginType); // 检查是否需要使用https
		var ssoConfig = window["sinaSSOConfig"];
		if(typeof ssoConfig != "object" ) {
			ssoConfig = {};
		}
		//maping config set
		var name;
		for (name in ssoConfig) {
			me[name] = ssoConfig[name];
		}
		if (!me["entry"]) me["entry"] = me["service"];
		if(me.isUpdateCookieOnLoad) {
			setTimeout(me.name+".updateCookie()",10000);
		}

		//访问feedBackUrl检查登录状态，feedBackUrl可能会转向ssoLoginUrl取状态
		if(me.isCheckLoginState) {
			addEventListener(window,"load",function(){me.checkLoginState();});
		}
		//试图从页面中发现ssoServerTime，作为登录的初始时间
		if(me.allowAutoFoundServerTime && ssoLoginServerTime) me.setServerTime(ssoLoginServerTime);
		me.customInit();

	};

	this.customInit = function() {
	};

	this.customUpdateCookieCallBack = function(result) {
		// 不需要关心该方法
	};
	this.customLogoutCallBack = function(result) {
		me.customLoginCallBack({"result":false});
	};

	/**
	 * 此函数为用户可覆盖的回调函数，loginStatus参数为用户的登录状态
	 * 为false则未登录
	 * 否则会显示用户的登录信息数组
	 */
	this.customLoginCallBack = function(loginStatus) {
		// 该方法由产品自己来定义
	};

	this.login = function(username, password, savestate) {
		if (!ssoLoginTimer) {
			ssoLoginTimer = new prototypeTimer(me.timeoutEnable);
		} else {
			ssoLoginTimer.clear();
		}
		ssoLoginTimer.start(5000, function(){
			ssoLoginTimer.clear(); // 这里如果不清除时钟，则迟到的登录依然会显示登录结果
			me.customLoginCallBack({"result":false,"reason":unescape("%u767B%u5F55%u8D85%u65F6%uFF0C%u8BF7%u91CD%u8BD5")});
		});
		savestate = savestate == undefined ?0:savestate;
		tmpData['savestate'] = savestate;
		loginByConfig = function() {
			if(me.useIframe && (me.setDomain || me.feedBackUrl) ) {
				if (me.setDomain) {
					document.domain = me.domain;
					if (!me.feedBackUrl && me.domain != "sina.com.cn") me.feedBackUrl = makeURL(me.appLoginURL[me.domain], {"domain":1});
				}
				loginMethod = "post";
				var result = loginByIframe(username,password,savestate);
				if (!result) {
					loginMethod = "get";
					if (me.scriptLoginHttps) {
						me.setLoginType(me.loginType | https);
					} else {
						me.setLoginType(me.loginType | rsa);
					}
					loginByScript(username,password,savestate);
				}
			} else {
				loginMethod = "get";
				loginByScript(username,password,savestate);
			}
			me.nonce = null;
		};
		loginMethodCheck = function() {
			if ((me.loginType & wsse) || (me.loginType & rsa)) {
					if (me.servertime) {
						if (!me.nonce) me.nonce = makeNonce(6);
						loginByConfig();
						return true;
					}
					// get servertime
					me.getServerTime(username, loginByConfig);
			} else {
				loginByConfig();
			}
		};
		loginMethodCheck();
		return true;
	};
	this.getServerTime = function(username, callback) {
		if (me.servertime) {
			if(typeof callback == "function") callback({"retcode":0,"servertime":me.servertime});
			return true;
		}
		var url = location.protocol == "https:"?ssoPreLoginUrl.replace(/^http:/,"https:"):ssoPreLoginUrl;
		
		//对username进行base64编码
		username = sinaSSOEncoder.base64.encode(urlencode(username));
		url = makeURL(url,{"entry":me.entry,"callback":me.name+".preloginCallBack","su":username,"rsakt":"mod"});
		me.preloginCallBack = function(result) {
			if(result && result.retcode == 0) {
				me.setServerTime(result.servertime);
				me.nonce = result.nonce;
				me.rsaPubkey = result.pubkey;
				me.rsakv = result.rsakv;
                pcid = result.pcid;
				preloginTime = (new Date()).getTime() - preloginTimeStart;
			}
			if(typeof callback == "function") callback(result);
		};
		preloginTimeStart = (new Date()).getTime();
		excuteScript(me.scriptId, url);
	};
	this.logout = function() {
		try {
		var request = {'entry':me.getEntry(),'callback':me.name + '.ssoLogoutCallBack'};
		var url = location.protocol == "https:"?ssoLogoutUrl.replace(/^http:/,"https:"):ssoLogoutUrl;
		url = makeURL(url, request);
		excuteScript(me.scriptId, url);
		} catch (e) {}
		return true;
	};
	this.ssoLogoutCallBack = function (result) {
		if (result.arrURL) {
			me.setCrossDomainUrlList(result);
		}
		me.crossDomainAction('logout',function(){me.customLogoutCallBack({'result':true});});
	};
	this.updateCookie= function() {
		try {
		if(me.autoUpdateCookieTime > 5) {
			if(updateCookieTimer != null) {
				clearTimeout(updateCookieTimer);
			}
			updateCookieTimer = setTimeout(me.name+".updateCookie()",me.autoUpdateCookieTime * 1000); // convert to millisecond
		}
		var cookieExpireTime = me.getCookieExpireTime();
		var now = (new Date()).getTime() / 1000;  // convert to second
		var result = {};
		if (cookieExpireTime == null) {  // cookie 不存在
			result = {"retcode":6102}; // not login
		} else if( cookieExpireTime < now ) { // cookie 已经过期
			result = {"retcode":6203}; // cookie expired
		} else if( cookieExpireTime - cookieExpireTimeLength + updateCookieTimeHardLimit > now) { // 在硬限制的时间内不允许更新cookie
			result = {"retcode":6110};
		} else if(cookieExpireTime - now > me.noActiveTime) {// 离过期还早着呢
			result = {"retcode":6111};
		}
		if(result.retcode !== undefined) { 
			me.customUpdateCookieCallBack(result);
			return false;
		}
		var url = location.protocol == "https:"?ssoUpdateCookieUrl.replace(/^http:/, "https:"):ssoUpdateCookieUrl;
		url = makeURL(url, {"entry":me.getEntry(),"callback":me.name + ".updateCookieCallBack"});
		excuteScript(me.scriptId, url );
		} catch (e) {}
		return true;
	};
	// 设置需要广播的地址列表
	this.setCrossDomainUrlList = function(urlList) {
		crossDomainUrlList = urlList;
	};
	
	// 检查用户名的备选登录方式
	// 并且对接口返回值做了一些封装。
	this.checkAltLoginNameCallback = function (data){
		var ret = {'retcode' : 0, 'detail' : '', 'data' : ''};
		if(data.ret == "y") {
			ret['retcode'] = 1;
			ret['detail'] = '\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7<a href="http://login.sina.com.cn/bindmail/signin.php?username=' +checkAltLoginNameCallbackData['username']+ '">\u7ed1\u5b9a\u90ae\u7bb1</a>';
			ret['data'] = checkAltLoginNameCallbackData['username'];
		} else if(data.ret == "n" && data.mail) {
			if (data.errcode == 'not_verify') {
				ret['retcode'] = 2;
				ret['detail'] = '\u60a8\u7684\u90ae\u7bb1: '+data.mail+' \u672a\u9a8c\u8bc1\uff0c\u70b9\u6b64<a href="http://login.sina.com.cn/bindmail/bindmail1.php?entry=sso&user='+data.mail+'">\u91cd\u53d1\u9a8c\u8bc1\u90ae\u4ef6</a>';
				ret['data'] = data.mail;
			} else {
				ret['retcode'] = 3;
				ret['detail'] = '\u7528\u60a8\u7684\u90ae\u7bb1'+data.mail+'\u4e5f\u53ef\u4ee5\u767b\u5f55';
				ret['data'] = data.mail;
			}
		}else{
			// do nothing
			// and hide the wrong code returned by api. 
		}
		checkAltLoginNameCallbackData['callback'](ret);
	};
	
	this.checkAltLoginName = function(username, callback){
		if( username == ""){
			return true;
		}
		var r = /^[0-9]{1,9}$/;
		if (r.exec(username)){
			return true;
		}
		checkAltLoginNameCallbackData = {'username' : username, 'callback' : callback};
		var url = (me.loginType & https)?ssoCheckAltLoginNameUrl.replace(/^http:/,"https:"):ssoCheckAltLoginNameUrl;
		url = makeURL(url, {'name': username, 'type':'json', 'callback':'sinaSSOController.checkAltLoginNameCallback'});
		excuteScript(ssoCheckAltLoginNameScriptId, url);
	};
	
	this.callFeedBackUrl = function(loginStatus) {
		try {
			var request = {'callback':me.name + ".feedBackUrlCallBack"};
			if(loginStatus['ticket']) {
				request['ticket'] = loginStatus['ticket'];
			}
			if(loginStatus['retcode'] !== undefined) {
				request['retcode'] = loginStatus['retcode'];
			}
			var url = makeURL(me.feedBackUrl, request);
			excuteScript(me.scriptId,url);
		} catch (e) {}
		return true;
	};
	// 登录回调函数,script标签登录或setDomain方式登录时使用该回调函数
	this.loginCallBack = function(result) {
		try {
		if(me.timeoutEnable && !ssoLoginTimer.isset()) return;
		ssoLoginTimer.clear();
		me.loginExtraFlag = {}; //清空与本次登录相关的标识
		var loginStatus = {};
		var st = result["ticket"];
		var uid = result["uid"];
		if(uid) {
			loginStatus['result'] = true;
			loginStatus['retcode'] = 0;
			loginStatus['userinfo'] = {"uniqueid":result["uid"]};
			if(st) loginStatus['ticket'] = st;
			if (me.feedBackUrl) {
				if (me.crossDomain) {
					me.crossDomainAction("login",function(){me.callFeedBackUrl(loginStatus);});
				} else {
					me.callFeedBackUrl(loginStatus);
				}
			} else {
				if (me.crossDomain) {
					if (result["crossDomainUrlList"]) {
						me.setCrossDomainUrlList({"retcode":0,"arrURL":result["crossDomainUrlList"]});
					}
					me.crossDomainAction("login",function(){
								if (st && me.appLoginURL[me.domain]) {
									me.appLogin(st, me.domain, me.name + ".customLoginCallBack");
								} else {
									loginStatus["userinfo"] = objMerge(loginStatus["userinfo"], me.getSinaCookie());
									me.customLoginCallBack(loginStatus);
								}
							});
				} else {
					me.customLoginCallBack(loginStatus);
				}
			}
		} else {
			// 服务器端时间设置不正确的容错
			if (loginMethodCheck && result['retcode'] == "2092" && me.allowAutoFoundServerTimeError) {
				me.setServerTime(0); // 重置服务器时间的值，便于重新获取
				me.loginExtraFlag = objMerge(me.loginExtraFlag,{"wsseretry":"servertime_error"}); // 添加重试标识，便于了解情况
				loginMethodCheck(); // 重新登录一次，这次没有了登录超时的控制了，实现起来麻烦而且没有必要
				loginMethodCheck = null; //避免死循环
				return false;
			}
			loginStatus['result'] = false;
			loginStatus['errno'] = result['retcode'];
			if (loginStatus['errno'] == '4069') { //尝试跳转进行额外认证
				var reason = result['reason'].split('|');
				loginStatus['reason'] = reason[0];
				if (reason.length == 2) loginStatus['rurl'] = reason[1];
				if (loginStatus['rurl']) {
					try {
						top.location.href = loginStatus['rurl'];
						return;
					} catch (e) {}
				}
			} else {
				loginStatus['reason'] = result['reason'];
			}
			me.customLoginCallBack(loginStatus);
		}
		} catch (e) {}
		return true;
	};
	this.updateCookieCallBack = function (result)  {
		if(result['retcode'] == 0) {
			me.crossDomainAction("update",function(){me.customUpdateCookieCallBack(result);});
		} else { // 忽略更新失败的情况，因为更新失败后的操作不是必须的
			me.customUpdateCookieCallBack(result);
		}
	};
	this.feedBackUrlCallBack = function (result) {
		// 对于给了feedBackUrl但是又强制get方式登录的时候，计时器在loginCallBack回调时已经清除了
		if(loginMethod == "post" && me.timeoutEnable && !ssoLoginTimer.isset()) return;
		ssoLoginTimer.clear();
		if (result.errno == "2092") {
			me.setServerTime(0);	  // 重置服务器时间的值，便于重新获取
		}
		if (result.errno == '4069') { // 需要跳转进行额外认证
			var reason = result.reason.split('|');
			result.reason = reason[0];
			if (reason.length == 2) {
				result.rurl = reason[1];
				try {
					top.location.href = result.rurl;
					return;
				} catch (e) {}
			}
		}
		me.customLoginCallBack(result);
		removeNode(me.loginFrameName);// 删除用完的iframe,但是一定不要在回调前删除，Firefox可能有问题的
	};
	this.doCrossDomainCallBack = function (result) {
		me.crossDomainCounter++;
		if(result)removeNode(result.scriptId);
		if(me.crossDomainCounter == me.crossDomainCount) {
			clearTimeout(crossDomainTimer);
			me.crossDomainResult();
		}
	};
	this.crossDomainCallBack = function(result) {
		// 如果存在获取广播地址列表的请求的script标签，则这里已经用过，删除之
		removeNode(me.ssoCrossDomainScriptId);
		if( !result || result.retcode != 0) {
			return false;
		}
		var arrURL = result.arrURL;
		var url, scriptId;
		var request = {'callback':me.name + '.doCrossDomainCallBack'};
		me.crossDomainCount = arrURL.length;
		me.crossDomainCounter = 0;
		if(arrURL.length == 0) { // 最初不需要通知任何域
			clearTimeout(crossDomainTimer);
			me.crossDomainResult();
			return true;
		}
		for(var i = 0; i < arrURL.length; i++) {
			url = arrURL[i];
			scriptId = 'ssoscript'+i;
			request.scriptId = scriptId;
			url = makeURL(url, request);
			if(isSafari()){
				//safari 需要用这个方法	// http://wiki.intra.sina.com.cn/pages/viewpage.action?pageId=6297546
				excuteIframe(scriptId, url);
			}else{
				excuteScript(scriptId, url);
			}
			
		}
	};

	this.crossDomainResult = function () {
		// 清空广播列表，避免下次误用
		crossDomainUrlList = null;
		if(typeof crossDomainForward == 'function') {
			crossDomainForward();
		}
	};

	// 广播登录事件
	this.crossDomainAction = function (action,callback) {
		crossDomainTimer = setTimeout(me.name + '.crossDomainResult()',crossDomainTime * 1000);
		if(typeof callback == 'function') {
			crossDomainForward = callback;
		} else {
			crossDomainForward = null;
		}
		if (crossDomainUrlList) { // 已经存在了需要广播的地址列表
			me.crossDomainCallBack(crossDomainUrlList);
			return false;
		}
		// 还没有需要广播的地址列表，自己通过crossdomain.php 来获取
		var domain = me.domain;
		if(action == "update") {
			action = "login";
			domain = "sina.com.cn";
		}
		var request = {
			'scriptId':me.ssoCrossDomainScriptId,
			'callback':me.name + '.crossDomainCallBack',
			'action':action,
			'domain':domain
		};
		var url = makeURL(ssoCrosssDomainUrl, request);
		excuteScript(me.ssoCrossDomainScriptId, url);
	};
	this.checkLoginState = function(callback) {
		if (callback) {
			me.autoLogin(callback); // the arguments of callback is cookieinfo or null
		} else {
			me.autoLogin(function(cookieinfo){
				var loginStatus = {};
				if (cookieinfo !== null) {
					var userinfo = {
						'displayname':cookieinfo['nick'],
						'uniqueid':cookieinfo['uid'],
						'userid':cookieinfo['user']
					};
					loginStatus["result"] = true;
					loginStatus["userinfo"] = userinfo;
				} else {
					loginStatus["result"] = false;
					loginStatus["reason"] = "";
				}
				me.customLoginCallBack(loginStatus);
			});
		}
	};

	this.getCookieExpireTime = function (){
		return getCookieExpireTimeByDomain(me.domain);
	};
	this.getSinaCookie = function (strict) {
		var sup = urldecode(getCookie("SUP"));
		if (!sup && !urldecode(getCookie("ALF"))) return null;
		if (!sup) sup = urldecode(getCookie("SUR"));
		if (!sup) return null;
		var arrSup = parse_str(sup);
		if (strict && arrSup["et"] && (arrSup["et"] * 1000 <  (new Date()).getTime())) {
			return null;
		}
		return arrSup;
	};
	this.get51UCCookie = function() {
		return me.getSinaCookie();
	};
	this.autoLogin = function (callback) {
		if (me.domain == 'sina.com.cn') {
			if (getCookie('SUP') === null && getCookie('ALF') !== null ) {
				sinaAutoLogin(callback);
				return true;
			}
		} else {
			if (getCookie('SUP') === null && (getCookie('SSOLoginState') !== null || getCookie('ALF') !== null) ) {
				sinaAutoLogin(callback);
				return true;
			}
		}
		callback(me.getSinaCookie());
		return true;
	};
	this.autoLoginCallBack2 = function (result) {
		try {
			autoLoginCallBack2(me.getSinaCookie());
		} catch(e) {}
		return true;
	};
	this.appLogin = function(ticket, domain, callback) {
		var savestate = tmpData['savestate']?parseInt((new Date()).getTime()/1000 + tmpData['savestate'] * 86400):0;
		var alf = getCookie('ALF')?getCookie('ALF'):0;
		var request = {
			'callback': callback,
			'ticket': ticket,
			'ssosavestate': savestate || alf
		};

		var appLoginURL = me.appLoginURL[domain];
		var url = makeURL(appLoginURL, request);
		excuteScript(me.scriptId, url, "gb2312");
		return true;
	};
	this.autoLoginCallBack3 = function (result) {
		if (result['retcode'] != 0) {
			me.autoLoginCallBack2(result);
			return false;
		}
		me.appLogin(result["ticket"], me.domain, me.name + ".autoLoginCallBack2");
		return true;
	};
	this.setLoginType = function(loginType) {
		// 检查当前页面是否https，如果是，则强制使用https登录，否则浏览器有提示
		var https = location.protocol == "https:"?me.https:0;
		if (https) me.crossDomain = false;
		me.loginType = loginType | https;
		return true;
	};
	this.setServerTime = function(servertime) {
		if (!ssoServerTimeTimer) {
			ssoServerTimeTimer = new prototypeTimer(true);
		}
		// 重置服务器时间
		if (servertime == 0) {
			ssoServerTimeTimer.clear();
			me.servertime = servertime;
			return true;
		}
		// 避免设置不靠谱的时间
		if (servertime < 1294935546) return false;
		var calcServerTime = function() {
			if (me.servertime) {	
				me.servertime += me.calcServerTimeInterval / 1000;
				ssoServerTimeTimer.start(me.calcServerTimeInterval, calcServerTime);
			}
		};
		me.servertime = servertime;
		ssoServerTimeTimer.start(me.calcServerTimeInterval, calcServerTime);
	};

	this.getPinCodeUrl = function (size) {
		if(size == undefined) {
			size = 0;
		}
		if (pcid) {
			 me.loginExtraQuery.pcid = pcid;
		}
		var url = location.protocol == "https:"?pincodeUrl.replace(/^http:/, "https:"):pincodeUrl;
		return url + '?r=' + Math.floor( Math.random()*100000000 ) + '&s=' + size + (pcid.length > 0 ? '&p=' + pcid : '');
	};

	this.showPinCode = function(id) {
		me.$(id).src = me.getPinCodeUrl();
	};

	this.isVfValid = function(){
		return me.getSinaCookie(true)['vf'] != 1;
	};

	this.getVfValidUrl = function() {
		return vfValidUrl;
	};

	this.enableFailRedirect = function() {
		me.failRedirect = true;
	};
	
	var makeNonce = function(len) {
		var x = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var str = "";
		for (var i = 0; i < len; i++ ) {
			str += x.charAt(Math.ceil(Math.random()*1000000)%x.length);
		}
		return str;
	};
	var sinaAutoLogin = function (callback) {
		autoLoginCallBack2 = callback;
		var request = {
			'entry':me.getEntry(),
			'service':me.service,
			'encoding':'UTF-8',
			'gateway':1,
			'returntype':'TEXT',
			'from':me.from
		};
		if (me.domain == 'sina.com.cn') {
			request['callback'] = me.name + '.autoLoginCallBack2';
			request['useticket'] = 0;
		} else {
			request['callback'] = me.name + '.autoLoginCallBack3';
			request['useticket'] = 1;
		}

		var url = location.protocol == "https:"?ssoLoginUrl.replace(/^http:/,"https:"):ssoLoginUrl;
		url = makeURL(url, request);
		excuteScript(me.scriptId, url, "gb2312");
		return true;
	};
	var getCookieExpireTimeByDomain = function (domain) {
		var expireTime = null;
		var cookie = null;
		cookie = me.getSinaCookie();
		if (cookie) expireTime = cookie['et'];
		return expireTime;
	};
	var addEventListener = function(dom, eventName, fn){
		if (dom.addEventListener) {
			dom.addEventListener(eventName, fn, false);
		} else if (dom.attachEvent) {
			dom.attachEvent("on" + eventName, fn);
		} else {
			dom["on" + eventName] = fn;
		}
	};
	var prototypeTimer = function(enable){
		var mytimer = false;
		this.start = function(timeout, callback) {
			if(enable) mytimer = setTimeout(callback, timeout);
		};
		this.clear = function(name) {
			if(enable) {
				clearTimeout(mytimer);
				mytimer = false;
			}
		};
		this.isset = function() {
			return mytimer !== false;
		};
	};
	
	// 此函数用来执行一个script
	var excuteScript = function (id, scriptSource, charset) {
		removeNode(id);
		var head = document.getElementsByTagName('head')[0];
		var newScript = document.createElement('script');
		newScript.charset = charset || 'gb2312';
		newScript.id = id;
		newScript.type = 'text/javascript';
		newScript.src = makeURL(scriptSource, {"client":me.getClientType(), "_": (new Date()).getTime()}); 
		head.appendChild(newScript);
	};
	
	//此函数用于进行一次iframe请求
	var excuteIframe = function(id, url){
		removeNode(id);
		var bodyel = document.getElementsByTagName('body')[0];
		var new_iframe = document.createElement('iframe');
		new_iframe.style.display = 'none';
		new_iframe.src = makeURL(url, {"client":me.getClientType(), "_": (new Date()).getTime()});
		new_iframe.isReady = false;
		addEventListener(new_iframe, 'load', function(){
			if(new_iframe.isReady){return;}
			new_iframe.isReady = true;
			me.doCrossDomainCallBack({scriptId:id});
		});
		bodyel.appendChild(new_iframe);
	};
	
	var makeRequest = function(username, password, savestate) {
		var request = {
			"entry": me.getEntry(),
			"gateway": 1,
			"from": me.from,
			"savestate": savestate,
			"useticket": me.useTicket?1:0
		};
		if (me.failRedirect) {
			me.loginExtraQuery.frd = 1;
		}
		request = objMerge(request, me.loginExtraFlag);
		request = objMerge(request, me.loginExtraQuery);
		request["su"] = sinaSSOEncoder.base64.encode(urlencode(username)); // su是username的别名
		if (me.service) request["service"] = me.service;
		if((me.loginType & rsa) && me.servertime && sinaSSOEncoder && sinaSSOEncoder.RSAKey){
			request["servertime"] = me.servertime;
			request["nonce"] = me.nonce;
			request["pwencode"] = "rsa2";
			request["rsakv"] = me.rsakv;
			var RSAKey = new sinaSSOEncoder.RSAKey();
			RSAKey.setPublic(me.rsaPubkey, '10001');
			password = RSAKey.encrypt([me.servertime, me.nonce].join("\t") + "\n" + password);
		}else if ((me.loginType & wsse) && me.servertime && sinaSSOEncoder && sinaSSOEncoder.hex_sha1) {
			request["servertime"] = me.servertime;
			request["nonce"] = me.nonce;
			request["pwencode"] = "wsse";
			password = sinaSSOEncoder.hex_sha1("" + sinaSSOEncoder.hex_sha1(sinaSSOEncoder.hex_sha1(password)) + me.servertime + me.nonce); // 空字符串为了避免各项全部是数字时造成数字相加而不是字符串链接的情况
		}
		request["sp"] = password; // sp是password的别名
		return request;
	};
	// login by script
	var loginByScript = function (username,password,savestate) {
		if (me.appLoginURL[me.domain]) {
			me.useTicket = 1;
			me.service = me.appDomainService[me.domain] || me.service;  // UNITE-695
		}
		var cdult = 0;
		if (me.domain) cdult = 2;
		if (!me.appLoginURL[me.domain] ) cdult = 3;
		if (me.cdult !== false) {
			cdult = me.cdult;
		}
		if (cdult == 3) {
			crossDomainTime = me.crossDomainTime;
			delete me.appLoginURL[me.domain];
		}
		var request = makeRequest(username,password,savestate);
		request = objMerge( request, {
				"encoding": "UTF-8",
				"callback": me.name + ".loginCallBack",
				"cdult": cdult, // return crossdomain url list
				"domain": me.domain,
				"useticket": me.appLoginURL[me.domain]?1:0,
				"prelt": preloginTime,
				"returntype": "TEXT"
			});
		var url = (me.loginType & https)?ssoLoginUrl.replace(/^http:/,"https:"):ssoLoginUrl;
		url = makeURL(url, request);
		excuteScript(me.scriptId, url, "gb2312");
	};
	// login by iframe
	var loginByIframe = function (username,password,savestate) {
		createIFrame(me.loginFrameName);
		var loginForm = createForm(me.loginFormId);
		var request = makeRequest(username,password,savestate);

		request["encoding"] = "UTF-8";
		if (me.crossDomain == false){
			request["crossdomain"] = 0;
		}
		request["prelt"] = preloginTime;

		if (me.feedBackUrl) {
			request["url"] = makeURL(me.feedBackUrl, {"framelogin":1, "callback": "parent."+me.name+".feedBackUrlCallBack"});
			request["returntype"] = "META"; 
		} else {
			request["callback"] = "parent."+ me.name + ".loginCallBack";
			request["returntype"] = "IFRAME"; 
			request["setdomain"]  = me.setDomain?1:0; 
		}

		for (var key in me.loginExtraQuery) {
			if (typeof me.loginExtraQuery[key] == "function") continue;
			request[key] = me.loginExtraQuery[key]; 
		}
		for (var name in request) {
			loginForm.addInput(name,request[name]);
		}

		var action = (me.loginType & https)?ssoLoginUrl.replace(/^http:/,"https:"):ssoLoginUrl;
		action = makeURL(action, objMerge({"client":me.getClientType()},me.loginExtraFlag));

		loginForm.method = 'post';
		loginForm.action = action;
		loginForm.target = me.loginFrameName;
		
		var result = true;
		try{
			loginForm.submit();
		} catch(e){
			removeNode(me.loginFrameName);
			result = false;
		}
		setTimeout(function(){
			removeNode(loginForm);
		}, 10);
		return result;
	};
	// 创建Iframe
	var createIFrame = function (frameName, src) {
		if (src == null) src = "javascript:false;";
		removeNode(frameName);
		var frame = document.createElement('iframe');
		frame.height = 0;
		frame.width = 0;
		frame.style.display = 'none';
		frame.name = frameName;
		frame.id = frameName;

		frame.src = src;
		appendChild(document.body,frame);
		window.frames[frameName].name = frameName;
		return frame;
	};

	// 创建form表单
	var createForm = function (formName,display) {
		if (display == null)  display = 'none';
		// 确保表单唯一
		removeNode(formName);
		var form = document.createElement('form');
		form.height = 0;
		form.width = 0;
		form.style.display = display;
		form.name = formName;
		form.id = formName;
		appendChild(document.body,form);
		document.forms[formName].name = formName;

		// 添加一个添加元素的方法
		form.addInput = function(name,value,type) {
			if (type == null) type = 'text';
			var _name = this.getElementsByTagName('input')[name];
			if (_name ) { // 避免重复添加
				this.removeChild(_name);
			}
			_name = document.createElement('input');
			this.appendChild(_name);
			_name.id = name;
			_name.name = name;
			_name.type = type;
			_name.value = value;
		};
		return form;
	};
	//删除DOM元素
	var removeNode = function(el){
		try{
			if(typeof(el) === 'string') el = me.$(el);
			el.parentNode.removeChild(el);
		}catch(e){}
	};
	//判断是否为 safari 浏览器
	var isSafari = function(){
		var browserName = navigator.userAgent.toLowerCase();
		return ( (/webkit/i).test(browserName) && !(/chrome/i).test(browserName) );
	};
	var appendChild = function(parentObj,element) {
		parentObj.appendChild(element);
	};
	//cookie 函数
	var getCookie = function( name ) { 
		var Res = eval('/'+ name +'=([^;]+)/').exec(document.cookie);
		return Res == null ? null : Res[1];
	};
	var makeURL = function(url,request) {
		return url + urlAndChar(url) + httpBuildQuery(request);
	};
	var urlAndChar = function(url) {
		 return (/\?/.test(url)?"&":"?");
	};
	var urlencode = function(str) {
		return encodeURIComponent(str);
	};
	var urldecode = function(str) {
		if (str == undefined) return "";
		var decoded = decodeURIComponent(str);
		return decoded == "null"?"":decoded;
	};
	var httpBuildQuery = function(obj) {
		if(typeof obj != "object") return "";
		var arr = new Array();
		for(var key in obj) {
			if (typeof obj[key] == "function") continue;
			arr.push( key + "=" + urlencode(obj[key]));
		}
		return arr.join("&");
	};
	var parse_str = function(str) {
		var arr = str.split("&");
		var arrtmp;
		var arrResult = {};
		for(var i = 0; i < arr.length; i++) {
			arrtmp = arr[i].split("=");
			arrResult[arrtmp[0]] = urldecode(arrtmp[1]);
		}
		return arrResult;
	};
	var objMerge = function(obj1,obj2) {
		for(var item in obj2) {
			obj1[item] = obj2[item];
		}
		return obj1;
	};
	// 获取元素对象
	this.$ = function (id) {
		return document.getElementById(id);
	};

};
/*   
 *   A   JavaScript   implementation   of   the   Secure   Hash   Algorithm,   SHA-1,   as   defined   
 *   in   FIPS   PUB   180-1   
 *   Version   2.1-BETA   Copyright   Paul   Johnston   2000   -   2002.   
 *   Other   contributors:   Greg   Holt,   Andrew   Kepert,   Ydnar,   Lostinet   
 *   Distributed   under   the   BSD   License   
 *   See   http://pajhome.org.uk/crypt/md5   for   details.   
 */   
var sinaSSOEncoder = sinaSSOEncoder || {};
(function(){
 /*   
  *   Configurable   variables.   You   may   need   to   tweak   these   to   be   compatible   with   
  *   the   server-side,   but   the   defaults   work   in   most   cases.   
  */   
 var   hexcase   =   0;     /*   hex   output   format.   0   -   lowercase;   1   -   uppercase                 */   
 var   chrsz       =   8;     /*   bits   per   input   character.   8   -   ASCII;   16   -   Unicode             */   

 /*   
  *   These   are   the   functions   you'll   usually   want   to   call   
  *   They   take   string   arguments   and   return   either   hex   or   base-64   encoded   strings   
  */   
 this.hex_sha1 = function(s){return   binb2hex(core_sha1(str2binb(s),s.length   *   chrsz));};
 /*   
  *   Calculate   the   SHA-1   of   an   array   of   big-endian   words,   and   a   bit   length   
  */   
 var core_sha1 = function(x,   len) {   
 /*   append   padding   */   
 x[len   >>   5]   |=   0x80   <<   (24   -   len   %   32);   
 x[((len   +   64   >>   9)   <<   4)   +   15]   =   len;   

 var   w   =   Array(80);   
 var   a   =     1732584193;   
 var   b   =   -271733879;   
 var   c   =   -1732584194;   
 var   d   =     271733878;   
 var   e   =   -1009589776;   

 for(var   i   =   0;   i   <   x.length;   i   +=   16) {   
	 var   olda   =   a;   
	 var   oldb   =   b;   
	 var   oldc   =   c;   
	 var   oldd   =   d;   
	 var   olde   =   e;   

	 for(var   j   =   0;   j   <   80;   j++) {   
		 if(j   <   16)   w[j]   =   x[i   +   j];   
		 else   w[j]   =   rol(w[j-3]   ^   w[j-8]   ^   w[j-14]   ^   w[j-16],   1);   
		 var   t   =   safe_add(safe_add(rol(a,   5),   sha1_ft(j,   b,   c,   d)),     
				 safe_add(safe_add(e,   w[j]),   sha1_kt(j)));   
		 e   =   d;   
		 d   =   c;   
		 c   =   rol(b,   30);   
		 b   =   a;   
		 a   =   t;   
	 }   

	 a   =   safe_add(a,   olda);   
	 b   =   safe_add(b,   oldb);   
	 c   =   safe_add(c,   oldc);   
	 d   =   safe_add(d,   oldd);   
	 e   =   safe_add(e,   olde);   
 }   
 return   Array(a,   b,   c,   d,   e);   

 };

 /*   
  *   Perform   the   appropriate   triplet   combination   function   for   the   current   
  *   iteration   
  */   
 var sha1_ft = function(t,   b,   c,   d) {   
	 if(t   <   20)   return   (b   &   c)   |   ((~b)   &   d);   
	 if(t   <   40)   return   b   ^   c   ^   d;   
	 if(t   <   60)   return   (b   &   c)   |   (b   &   d)   |   (c   &   d);   
	 return   b   ^   c   ^   d;   
 }; 

 /*   
  *   Determine   the   appropriate   additive   constant   for   the   current   iteration   
  */   
 var sha1_kt = function(t) {   
	 return   (t   <   20)   ?     1518500249   :   (t   <   40)   ?     1859775393   :   
		 (t   <   60)   ?   -1894007588   :   -899497514;   
 };      
 /*   
  *   Add   integers,   wrapping   at   2^32.   This   uses   16-bit   operations   internally   
  *   to   work   around   bugs   in   some   JS   interpreters.   
  */   
 var safe_add = function(x,   y) {   
	 var   lsw   =   (x   &   0xFFFF)   +   (y   &   0xFFFF);   
	 var   msw   =   (x   >>   16)   +   (y   >>   16)   +   (lsw   >>   16);   
	 return   (msw   <<   16)   |   (lsw   &   0xFFFF);   
 };  

 /*   
  *   Bitwise   rotate   a   32-bit   number   to   the   left.   
  */   
 var rol = function(num,   cnt) {   
	 return   (num   <<   cnt)   |   (num   >>>   (32   -   cnt));   
 };  

 /*   
  *   Convert   an   8-bit   or   16-bit   string   to   an   array   of   big-endian   words   
  *   In   8-bit   function,   characters   >255   have   their   hi-byte   silently   ignored.   
  */   
 var str2binb = function(str) {   
	 var   bin   =   Array();   
	 var   mask   =   (1   <<   chrsz)   -   1;
	 for(var   i   =   0;   i   <   str.length   *   chrsz;   i   +=   chrsz)
		 bin[i>>5]   |=   (str.charCodeAt(i   /   chrsz)   &   mask)   <<   (24   -   i%32);
	 return   bin;     
 };


 /*   
  *   Convert   an   array   of   big-endian   words   to   a   hex   string.   
  */   
 var binb2hex = function(binarray) {   
	 var   hex_tab   =   hexcase   ?   "0123456789ABCDEF"   :   "0123456789abcdef";   
	 var   str   =   "";   
	 for(var   i   =   0;   i   <   binarray.length   *   4;   i++)   
	 {   
		 str   +=   hex_tab.charAt((binarray[i>>2]   >>   ((3   -   i%4)*8+4))   &   0xF)   +   
			 hex_tab.charAt((binarray[i>>2]   >>   ((3   -   i%4)*8     ))   &   0xF);   
	 }   
	 return   str;   
 };
 
 /*
  * Convert a string into a base 64 encoded string
  */
 
 this.base64 = {
	encode:function(input) {
		input = "" + input; // Convert to string for encode
		if (input == "") return ""; 
	
		var output = '';
		var chr1, chr2, chr3 = '';
		var enc1, enc2, enc3, enc4 = '';
		var i = 0;
		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)){
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)){
				enc4 = 64;
			}
			output = output+this._keys.charAt(enc1)+this._keys.charAt(enc2)+this._keys.charAt(enc3)+this._keys.charAt(enc4);
			chr1 = chr2 = chr3 = '';
			enc1 = enc2 = enc3 = enc4 = '';
		} while (i < input.length);
		return output;
	},
	
	_keys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

 };
}).call(sinaSSOEncoder);

//RSA
;(function(){

 
	/********************* jsbn.js start ************************/

	// Copyright (c) 2005  Tom Wu
	// All Rights Reserved.
	// See "LICENSE" for details.
	
	// Basic JavaScript BN library - subset useful for RSA encryption.
	
	// Bits per digit
	var dbits;
	
	// JavaScript engine analysis
	var canary = 0xdeadbeefcafe;
	var j_lm = ((canary&0xffffff)==0xefcafe);
	
	// (public) Constructor
	function BigInteger(a,b,c) {
	  if(a != null)
		if("number" == typeof a) this.fromNumber(a,b,c);
		else if(b == null && "string" != typeof a) this.fromString(a,256);
		else this.fromString(a,b);
	}
	
	// return new, unset BigInteger
	function nbi() { return new BigInteger(null); }
	
	// am: Compute w_j += (x*this_i), propagate carries,
	// c is initial carry, returns final carry.
	// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
	// We need to select the fastest one that works in this environment.
	
	// am1: use a single mult and divide to get the high bits,
	// max digit bits should be 26 because
	// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
	function am1(i,x,w,j,c,n) {
	  while(--n >= 0) {
		var v = x*this[i++]+w[j]+c;
		c = Math.floor(v/0x4000000);
		w[j++] = v&0x3ffffff;
	  }
	  return c;
	}
	// am2 avoids a big mult-and-extract completely.
	// Max digit bits should be <= 30 because we do bitwise ops
	// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
	function am2(i,x,w,j,c,n) {
	  var xl = x&0x7fff, xh = x>>15;
	  while(--n >= 0) {
		var l = this[i]&0x7fff;
		var h = this[i++]>>15;
		var m = xh*l+h*xl;
		l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
		c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
		w[j++] = l&0x3fffffff;
	  }
	  return c;
	}
	// Alternately, set max digit bits to 28 since some
	// browsers slow down when dealing with 32-bit numbers.
	function am3(i,x,w,j,c,n) {
	  var xl = x&0x3fff, xh = x>>14;
	  while(--n >= 0) {
		var l = this[i]&0x3fff;
		var h = this[i++]>>14;
		var m = xh*l+h*xl;
		l = xl*l+((m&0x3fff)<<14)+w[j]+c;
		c = (l>>28)+(m>>14)+xh*h;
		w[j++] = l&0xfffffff;
	  }
	  return c;
	}
	if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
	  BigInteger.prototype.am = am2;
	  dbits = 30;
	}
	else if(j_lm && (navigator.appName != "Netscape")) {
	  BigInteger.prototype.am = am1;
	  dbits = 26;
	}
	else { // Mozilla/Netscape seems to prefer am3
	  BigInteger.prototype.am = am3;
	  dbits = 28;
	}
	
	BigInteger.prototype.DB = dbits;
	BigInteger.prototype.DM = ((1<<dbits)-1);
	BigInteger.prototype.DV = (1<<dbits);
	
	var BI_FP = 52;
	BigInteger.prototype.FV = Math.pow(2,BI_FP);
	BigInteger.prototype.F1 = BI_FP-dbits;
	BigInteger.prototype.F2 = 2*dbits-BI_FP;
	
	// Digit conversions
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	var BI_RC = new Array();
	var rr,vv;
	rr = "0".charCodeAt(0);
	for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
	rr = "a".charCodeAt(0);
	for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	rr = "A".charCodeAt(0);
	for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	
	function int2char(n) { return BI_RM.charAt(n); }
	function intAt(s,i) {
	  var c = BI_RC[s.charCodeAt(i)];
	  return (c==null)?-1:c;
	}
	
	// (protected) copy this to r
	function bnpCopyTo(r) {
	  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
	  r.t = this.t;
	  r.s = this.s;
	}
	
	// (protected) set from integer value x, -DV <= x < DV
	function bnpFromInt(x) {
	  this.t = 1;
	  this.s = (x<0)?-1:0;
	  if(x > 0) this[0] = x;
	  else if(x < -1) this[0] = x+DV;
	  else this.t = 0;
	}
	
	// return bigint initialized to value
	function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
	
	// (protected) set from string and radix
	function bnpFromString(s,b) {
	  var k;
	  if(b == 16) k = 4;
	  else if(b == 8) k = 3;
	  else if(b == 256) k = 8; // byte array
	  else if(b == 2) k = 1;
	  else if(b == 32) k = 5;
	  else if(b == 4) k = 2;
	  else { this.fromRadix(s,b); return; }
	  this.t = 0;
	  this.s = 0;
	  var i = s.length, mi = false, sh = 0;
	  while(--i >= 0) {
		var x = (k==8)?s[i]&0xff:intAt(s,i);
		if(x < 0) {
		  if(s.charAt(i) == "-") mi = true;
		  continue;
		}
		mi = false;
		if(sh == 0)
		  this[this.t++] = x;
		else if(sh+k > this.DB) {
		  this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
		  this[this.t++] = (x>>(this.DB-sh));
		}
		else
		  this[this.t-1] |= x<<sh;
		sh += k;
		if(sh >= this.DB) sh -= this.DB;
	  }
	  if(k == 8 && (s[0]&0x80) != 0) {
		this.s = -1;
		if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
	  }
	  this.clamp();
	  if(mi) BigInteger.ZERO.subTo(this,this);
	}
	
	// (protected) clamp off excess high words
	function bnpClamp() {
	  var c = this.s&this.DM;
	  while(this.t > 0 && this[this.t-1] == c) --this.t;
	}
	
	// (public) return string representation in given radix
	function bnToString(b) {
	  if(this.s < 0) return "-"+this.negate().toString(b);
	  var k;
	  if(b == 16) k = 4;
	  else if(b == 8) k = 3;
	  else if(b == 2) k = 1;
	  else if(b == 32) k = 5;
	  else if(b == 4) k = 2;
	  else return this.toRadix(b);
	  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
	  var p = this.DB-(i*this.DB)%k;
	  if(i-- > 0) {
		if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
		while(i >= 0) {
		  if(p < k) {
			d = (this[i]&((1<<p)-1))<<(k-p);
			d |= this[--i]>>(p+=this.DB-k);
		  }
		  else {
			d = (this[i]>>(p-=k))&km;
			if(p <= 0) { p += this.DB; --i; }
		  }
		  if(d > 0) m = true;
		  if(m) r += int2char(d);
		}
	  }
	  return m?r:"0";
	}
	
	// (public) -this
	function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }
	
	// (public) |this|
	function bnAbs() { return (this.s<0)?this.negate():this; }
	
	// (public) return + if this > a, - if this < a, 0 if equal
	function bnCompareTo(a) {
	  var r = this.s-a.s;
	  if(r != 0) return r;
	  var i = this.t;
	  r = i-a.t;
	  if(r != 0) return r;
	  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
	  return 0;
	}
	
	// returns bit length of the integer x
	function nbits(x) {
	  var r = 1, t;
	  if((t=x>>>16) != 0) { x = t; r += 16; }
	  if((t=x>>8) != 0) { x = t; r += 8; }
	  if((t=x>>4) != 0) { x = t; r += 4; }
	  if((t=x>>2) != 0) { x = t; r += 2; }
	  if((t=x>>1) != 0) { x = t; r += 1; }
	  return r;
	}
	
	// (public) return the number of bits in "this"
	function bnBitLength() {
	  if(this.t <= 0) return 0;
	  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
	}
	
	// (protected) r = this << n*DB
	function bnpDLShiftTo(n,r) {
	  var i;
	  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
	  for(i = n-1; i >= 0; --i) r[i] = 0;
	  r.t = this.t+n;
	  r.s = this.s;
	}
	
	// (protected) r = this >> n*DB
	function bnpDRShiftTo(n,r) {
	  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
	  r.t = Math.max(this.t-n,0);
	  r.s = this.s;
	}
	
	// (protected) r = this << n
	function bnpLShiftTo(n,r) {
	  var bs = n%this.DB;
	  var cbs = this.DB-bs;
	  var bm = (1<<cbs)-1;
	  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
	  for(i = this.t-1; i >= 0; --i) {
		r[i+ds+1] = (this[i]>>cbs)|c;
		c = (this[i]&bm)<<bs;
	  }
	  for(i = ds-1; i >= 0; --i) r[i] = 0;
	  r[ds] = c;
	  r.t = this.t+ds+1;
	  r.s = this.s;
	  r.clamp();
	}
	
	// (protected) r = this >> n
	function bnpRShiftTo(n,r) {
	  r.s = this.s;
	  var ds = Math.floor(n/this.DB);
	  if(ds >= this.t) { r.t = 0; return; }
	  var bs = n%this.DB;
	  var cbs = this.DB-bs;
	  var bm = (1<<bs)-1;
	  r[0] = this[ds]>>bs;
	  for(var i = ds+1; i < this.t; ++i) {
		r[i-ds-1] |= (this[i]&bm)<<cbs;
		r[i-ds] = this[i]>>bs;
	  }
	  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
	  r.t = this.t-ds;
	  r.clamp();
	}
	
	// (protected) r = this - a
	function bnpSubTo(a,r) {
	  var i = 0, c = 0, m = Math.min(a.t,this.t);
	  while(i < m) {
		c += this[i]-a[i];
		r[i++] = c&this.DM;
		c >>= this.DB;
	  }
	  if(a.t < this.t) {
		c -= a.s;
		while(i < this.t) {
		  c += this[i];
		  r[i++] = c&this.DM;
		  c >>= this.DB;
		}
		c += this.s;
	  }
	  else {
		c += this.s;
		while(i < a.t) {
		  c -= a[i];
		  r[i++] = c&this.DM;
		  c >>= this.DB;
		}
		c -= a.s;
	  }
	  r.s = (c<0)?-1:0;
	  if(c < -1) r[i++] = this.DV+c;
	  else if(c > 0) r[i++] = c;
	  r.t = i;
	  r.clamp();
	}
	
	// (protected) r = this * a, r != this,a (HAC 14.12)
	// "this" should be the larger one if appropriate.
	function bnpMultiplyTo(a,r) {
	  var x = this.abs(), y = a.abs();
	  var i = x.t;
	  r.t = i+y.t;
	  while(--i >= 0) r[i] = 0;
	  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
	  r.s = 0;
	  r.clamp();
	  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
	}
	
	// (protected) r = this^2, r != this (HAC 14.16)
	function bnpSquareTo(r) {
	  var x = this.abs();
	  var i = r.t = 2*x.t;
	  while(--i >= 0) r[i] = 0;
	  for(i = 0; i < x.t-1; ++i) {
		var c = x.am(i,x[i],r,2*i,0,1);
		if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
		  r[i+x.t] -= x.DV;
		  r[i+x.t+1] = 1;
		}
	  }
	  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
	  r.s = 0;
	  r.clamp();
	}
	
	// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
	// r != q, this != m.  q or r may be null.
	function bnpDivRemTo(m,q,r) {
	  var pm = m.abs();
	  if(pm.t <= 0) return;
	  var pt = this.abs();
	  if(pt.t < pm.t) {
		if(q != null) q.fromInt(0);
		if(r != null) this.copyTo(r);
		return;
	  }
	  if(r == null) r = nbi();
	  var y = nbi(), ts = this.s, ms = m.s;
	  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
	  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
	  else { pm.copyTo(y); pt.copyTo(r); }
	  var ys = y.t;
	  var y0 = y[ys-1];
	  if(y0 == 0) return;
	  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
	  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
	  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
	  y.dlShiftTo(j,t);
	  if(r.compareTo(t) >= 0) {
		r[r.t++] = 1;
		r.subTo(t,r);
	  }
	  BigInteger.ONE.dlShiftTo(ys,t);
	  t.subTo(y,y);	// "negative" y so we can replace sub with am later
	  while(y.t < ys) y[y.t++] = 0;
	  while(--j >= 0) {
		// Estimate quotient digit
		var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
		if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
		  y.dlShiftTo(j,t);
		  r.subTo(t,r);
		  while(r[i] < --qd) r.subTo(t,r);
		}
	  }
	  if(q != null) {
		r.drShiftTo(ys,q);
		if(ts != ms) BigInteger.ZERO.subTo(q,q);
	  }
	  r.t = ys;
	  r.clamp();
	  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
	  if(ts < 0) BigInteger.ZERO.subTo(r,r);
	}
	
	// (public) this mod a
	function bnMod(a) {
	  var r = nbi();
	  this.abs().divRemTo(a,null,r);
	  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
	  return r;
	}
	
	// Modular reduction using "classic" algorithm
	function Classic(m) { this.m = m; }
	function cConvert(x) {
	  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
	  else return x;
	}
	function cRevert(x) { return x; }
	function cReduce(x) { x.divRemTo(this.m,null,x); }
	function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
	function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
	
	Classic.prototype.convert = cConvert;
	Classic.prototype.revert = cRevert;
	Classic.prototype.reduce = cReduce;
	Classic.prototype.mulTo = cMulTo;
	Classic.prototype.sqrTo = cSqrTo;
	
	// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
	// justification:
	//         xy == 1 (mod m)
	//         xy =  1+km
	//   xy(2-xy) = (1+km)(1-km)
	// x[y(2-xy)] = 1-k^2m^2
	// x[y(2-xy)] == 1 (mod m^2)
	// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
	// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
	// JS multiply "overflows" differently from C/C++, so care is needed here.
	function bnpInvDigit() {
	  if(this.t < 1) return 0;
	  var x = this[0];
	  if((x&1) == 0) return 0;
	  var y = x&3;		// y == 1/x mod 2^2
	  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
	  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
	  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
	  // last step - calculate inverse mod DV directly;
	  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
	  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
	  // we really want the negative inverse, and -DV < y < DV
	  return (y>0)?this.DV-y:-y;
	}
	
	// Montgomery reduction
	function Montgomery(m) {
	  this.m = m;
	  this.mp = m.invDigit();
	  this.mpl = this.mp&0x7fff;
	  this.mph = this.mp>>15;
	  this.um = (1<<(m.DB-15))-1;
	  this.mt2 = 2*m.t;
	}
	
	// xR mod m
	function montConvert(x) {
	  var r = nbi();
	  x.abs().dlShiftTo(this.m.t,r);
	  r.divRemTo(this.m,null,r);
	  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
	  return r;
	}
	
	// x/R mod m
	function montRevert(x) {
	  var r = nbi();
	  x.copyTo(r);
	  this.reduce(r);
	  return r;
	}
	
	// x = x/R mod m (HAC 14.32)
	function montReduce(x) {
	  while(x.t <= this.mt2)	// pad x so am has enough room later
		x[x.t++] = 0;
	  for(var i = 0; i < this.m.t; ++i) {
		// faster way of calculating u0 = x[i]*mp mod DV
		var j = x[i]&0x7fff;
		var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
		// use am to combine the multiply-shift-add into one call
		j = i+this.m.t;
		x[j] += this.m.am(0,u0,x,i,0,this.m.t);
		// propagate carry
		while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
	  }
	  x.clamp();
	  x.drShiftTo(this.m.t,x);
	  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
	}
	
	// r = "x^2/R mod m"; x != r
	function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
	
	// r = "xy/R mod m"; x,y != r
	function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
	
	Montgomery.prototype.convert = montConvert;
	Montgomery.prototype.revert = montRevert;
	Montgomery.prototype.reduce = montReduce;
	Montgomery.prototype.mulTo = montMulTo;
	Montgomery.prototype.sqrTo = montSqrTo;
	
	// (protected) true iff this is even
	function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }
	
	// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
	function bnpExp(e,z) {
	  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
	  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
	  g.copyTo(r);
	  while(--i >= 0) {
		z.sqrTo(r,r2);
		if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
		else { var t = r; r = r2; r2 = t; }
	  }
	  return z.revert(r);
	}
	
	// (public) this^e % m, 0 <= e < 2^32
	function bnModPowInt(e,m) {
	  var z;
	  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
	  return this.exp(e,z);
	}
	
	// protected
	BigInteger.prototype.copyTo = bnpCopyTo;
	BigInteger.prototype.fromInt = bnpFromInt;
	BigInteger.prototype.fromString = bnpFromString;
	BigInteger.prototype.clamp = bnpClamp;
	BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
	BigInteger.prototype.drShiftTo = bnpDRShiftTo;
	BigInteger.prototype.lShiftTo = bnpLShiftTo;
	BigInteger.prototype.rShiftTo = bnpRShiftTo;
	BigInteger.prototype.subTo = bnpSubTo;
	BigInteger.prototype.multiplyTo = bnpMultiplyTo;
	BigInteger.prototype.squareTo = bnpSquareTo;
	BigInteger.prototype.divRemTo = bnpDivRemTo;
	BigInteger.prototype.invDigit = bnpInvDigit;
	BigInteger.prototype.isEven = bnpIsEven;
	BigInteger.prototype.exp = bnpExp;
	
	// public
	BigInteger.prototype.toString = bnToString;
	BigInteger.prototype.negate = bnNegate;
	BigInteger.prototype.abs = bnAbs;
	BigInteger.prototype.compareTo = bnCompareTo;
	BigInteger.prototype.bitLength = bnBitLength;
	BigInteger.prototype.mod = bnMod;
	BigInteger.prototype.modPowInt = bnModPowInt;
	
	// "constants"
	BigInteger.ZERO = nbv(0);
	BigInteger.ONE = nbv(1);

/********************* jsbn.js end ************************/

/********************* prng4.js start ************************/

	// prng4.js - uses Arcfour as a PRNG

	function Arcfour() {
	  this.i = 0;
	  this.j = 0;
	  this.S = new Array();
	}
	
	// Initialize arcfour context from key, an array of ints, each from [0..255]
	function ARC4init(key) {
	  var i, j, t;
	  for(i = 0; i < 256; ++i)
		this.S[i] = i;
	  j = 0;
	  for(i = 0; i < 256; ++i) {
		j = (j + this.S[i] + key[i % key.length]) & 255;
		t = this.S[i];
		this.S[i] = this.S[j];
		this.S[j] = t;
	  }
	  this.i = 0;
	  this.j = 0;
	}
	
	function ARC4next() {
	  var t;
	  this.i = (this.i + 1) & 255;
	  this.j = (this.j + this.S[this.i]) & 255;
	  t = this.S[this.i];
	  this.S[this.i] = this.S[this.j];
	  this.S[this.j] = t;
	  return this.S[(t + this.S[this.i]) & 255];
	}
	
	Arcfour.prototype.init = ARC4init;
	Arcfour.prototype.next = ARC4next;
	
	// Plug in your RNG constructor here
	function prng_newstate() {
	  return new Arcfour();
	}
	
	// Pool size must be a multiple of 4 and greater than 32.
	// An array of bytes the size of the pool will be passed to init()
	var rng_psize = 256;

/********************* prng4.js end ************************/

/********************* rng.js start ************************/

	// Random number generator - requires a PRNG backend, e.g. prng4.js
	
	// For best results, put code like
	// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
	// in your main HTML document.
	
	var rng_state;
	var rng_pool;
	var rng_pptr;
	
	// Mix in a 32-bit integer into the pool
	function rng_seed_int(x) {
	  rng_pool[rng_pptr++] ^= x & 255;
	  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
	  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
	  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
	  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
	}
	
	// Mix in the current time (w/milliseconds) into the pool
	function rng_seed_time() {
	  rng_seed_int(new Date().getTime());
	}
	
	// Initialize the pool with junk if needed.
	if(rng_pool == null) {
	  rng_pool = new Array();
	  rng_pptr = 0;
	  var t;
	  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && typeof(window.crypto.random) === 'function') {
		// Extract entropy (256 bits) from NS4 RNG if available
		var z = window.crypto.random(32);
		for(t = 0; t < z.length; ++t)
		  rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
	  }  
	  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
		t = Math.floor(65536 * Math.random());
		rng_pool[rng_pptr++] = t >>> 8;
		rng_pool[rng_pptr++] = t & 255;
	  }
	  rng_pptr = 0;
	  rng_seed_time();
	  //rng_seed_int(window.screenX);
	  //rng_seed_int(window.screenY);
	}
	
	function rng_get_byte() {
	  if(rng_state == null) {
		rng_seed_time();
		rng_state = prng_newstate();
		rng_state.init(rng_pool);
		for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
		  rng_pool[rng_pptr] = 0;
		rng_pptr = 0;
		//rng_pool = null;
	  }
	  // TODO: allow reseeding after first request
	  return rng_state.next();
	}
	
	function rng_get_bytes(ba) {
	  var i;
	  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
	}
	
	function SecureRandom() {}
	
	SecureRandom.prototype.nextBytes = rng_get_bytes;
	
/********************* rng.js end ************************/

/********************* rsa.js start ************************/

	// Depends on jsbn.js and rng.js
	
	// Version 1.1: support utf-8 encoding in pkcs1pad2
	
	// convert a (hex) string to a bignum object
	function parseBigInt(str,r) {
	  return new BigInteger(str,r);
	}
	
	function linebrk(s,n) {
	  var ret = "";
	  var i = 0;
	  while(i + n < s.length) {
		ret += s.substring(i,i+n) + "\n";
		i += n;
	  }
	  return ret + s.substring(i,s.length);
	}
	
	function byte2Hex(b) {
	  if(b < 0x10)
		return "0" + b.toString(16);
	  else
		return b.toString(16);
	}
	
	// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
	function pkcs1pad2(s,n) {
	  if(n < s.length + 11) { // TODO: fix for utf-8
		alert("Message too long for RSA");
		return null;
	  }
	  var ba = new Array();
	  var i = s.length - 1;
	  while(i >= 0 && n > 0) {
		var c = s.charCodeAt(i--);
		if(c < 128) { // encode using utf-8
		  ba[--n] = c;
		}
		else if((c > 127) && (c < 2048)) {
		  ba[--n] = (c & 63) | 128;
		  ba[--n] = (c >> 6) | 192;
		}
		else {
		  ba[--n] = (c & 63) | 128;
		  ba[--n] = ((c >> 6) & 63) | 128;
		  ba[--n] = (c >> 12) | 224;
		}
	  }
	  ba[--n] = 0;
	  var rng = new SecureRandom();
	  var x = new Array();
	  while(n > 2) { // random non-zero pad
		x[0] = 0;
		while(x[0] == 0) rng.nextBytes(x);
		ba[--n] = x[0];
	  }
	  ba[--n] = 2;
	  ba[--n] = 0;
	  return new BigInteger(ba);
	}
	
	// "empty" RSA key constructor
	function RSAKey() {
	  this.n = null;
	  this.e = 0;
	  this.d = null;
	  this.p = null;
	  this.q = null;
	  this.dmp1 = null;
	  this.dmq1 = null;
	  this.coeff = null;
	}
	
	// Set the public key fields N and e from hex strings
	function RSASetPublic(N,E) {
	  if(N != null && E != null && N.length > 0 && E.length > 0) {
		this.n = parseBigInt(N,16);
		this.e = parseInt(E,16);
	  }
	  else
		alert("Invalid RSA public key");
	}
	
	// Perform raw public operation on "x": return x^e (mod n)
	function RSADoPublic(x) {
	  return x.modPowInt(this.e, this.n);
	}
	
	// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
	function RSAEncrypt(text) {
	  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
	  if(m == null) return null;
	  var c = this.doPublic(m);
	  if(c == null) return null;
	  var h = c.toString(16);
	  if((h.length & 1) == 0) return h; else return "0" + h;
	}
	
	// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
	//function RSAEncryptB64(text) {
	//  var h = this.encrypt(text);
	//  if(h) return hex2b64(h); else return null;
	//}
	
	// protected
	RSAKey.prototype.doPublic = RSADoPublic;
	
	// public
	RSAKey.prototype.setPublic = RSASetPublic;
	RSAKey.prototype.encrypt = RSAEncrypt;
	//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;
	
	//暴露RSAKey
	this.RSAKey = RSAKey;

//example:
//	var rsa = new RSAKey();
//	rsa.setPublic(encode_key, key_plus);
//	password = rsa.encrypt(password);

}).call(sinaSSOEncoder);

sinaSSOController = new SSOController();
sinaSSOController.init();
