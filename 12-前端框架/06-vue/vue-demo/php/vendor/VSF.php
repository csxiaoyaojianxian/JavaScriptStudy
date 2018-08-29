<?php
/**
 * 【vsf core】
 * @Author: csxiaoyao
 * @Date:   2017-07-11 17:17:34
 * @Last Modified by:   sunshine
 * @Last Modified time: 2017-12-19 23:49:51
 *
 * 【功能】
 * 自动加载类文件
 * 检测开发环境
 * 过滤敏感字符
 * 移除全局变量的老用法
 * 处理路由
 */

require(APP_PATH . 'vendor/Model.php');

define("ENTRY_NAME","index.php");

class VSF
{
	// 配置变量
	protected $_config = array();

	// 构造函数
    public function __construct($config)
    {
        $this->_config = $config;
    }

    // 运行程序
    public function run()
    {
        // 自动加载控制器和模型类
        spl_autoload_register(array($this, 'loadClass'));
        // 检测开发环境
        $this->setReporting();
        // 检测敏感字符并删除
        $this->removeMagicQuotes();
        // 配置数据库信息
        $this->setDbConfig();
        // 路由处理
        $this->route();
    }

    // 【 路由处理 】
    // 
    //    controller: item
    //    action:     index
    //    param1:     csxiaoyao
    //    param2:     sunshine
    // 
    // 方式1：
    // 例：http://localhost/demo/index.php/item/index?param1=csxiaoyao&param2=sunshine
    // 注意点：只解析出 controller 和 action，参数使用 $_GET[] 获取

    // 方式2：使用 restful 风格，最终也会转换为方式1
    // 例：http://localhost/demo/item/index/csxiaoyao/sunshine
    // 注意点：无入口文件名
    // 
    public function route()
    {
        $controllerName = $this->_config['defaultController'];
        $actionName = $this->_config['defaultAction'];
        $param = array();

        $url = $_SERVER['REQUEST_URI'];
        $positionStart = strpos($url, REQ_PATH);
        // 取 REQ_PATH 之后 ? 之前的内容 ( controller & action )
        // 方式2
        if($positionStart === false){
            $url = substr($url, $positionStart + strlen(REQ_PATH) - strlen(ENTRY_NAME));
        }
        // 方式1
        else{
            $url = substr($url, $positionStart + strlen(REQ_PATH));
        }
        $positionEnd = strpos($url, '?');
        $url = $positionEnd === false ? $url : substr($url, 0, $positionEnd);
        // 删除前后的“/”
        $url = trim($url, '/');

        if ($url) {
            // 使用“/”分割字符串，并保存在数组中
            $urlArray = explode('/', $url);
            // 删除空的数组元素
            $urlArray = array_filter($urlArray);
            // 获取控制器名
            $controllerName = $urlArray ? $urlArray[0] : $controllerName;
            // 获取动作名
            array_shift($urlArray);
            $actionName = $urlArray ? $urlArray[0] : $actionName;
        }

        // 判断控制器(首字母转大写)和操作是否存在
        $controller = ucfirst($controllerName) . 'Controller';
        if (!class_exists($controller)) {
            exit($controller . ' controller not exist!');
        }
        if (!method_exists($controller, $actionName)) {
            exit($actionName . ' method not exist!');
        }

        // 如果控制器和操作名存在，实例化控制器
        $dispatch = new $controller($controllerName, $actionName);

        // 调用方法，可向方法中传入参数，等同于：$dispatch->$actionName($param)
        $param = array();
        call_user_func_array(array($dispatch, $actionName), $param);
    }

    // 自动加载控制器和模型类 
    public static function loadClass($class)
    {
        $frameworks = __DIR__ . '/' . $class . '.php';
        $controllers = APP_PATH . 'app/controllers/' . $class . '.php';
        $models = APP_PATH . 'app/models/' . $class . '.php';

        if (file_exists($frameworks)) {
            // 加载框架核心类
            include $frameworks;
        } elseif (file_exists($controllers)) {
            // 加载应用控制器类
            include $controllers;
        } elseif (file_exists($models)) {
            //加载应用模型类
            include $models;
        } else {
            // 错误代码
        }
    }

    // 检测开发环境
    public function setReporting()
    {
        if (APP_DEBUG === true) {
            error_reporting(E_ALL);
            ini_set('display_errors','On');
        } else {
            error_reporting(E_ALL);
            ini_set('display_errors','Off');
            ini_set('log_errors', 'On');
        }
    }

    // 删除敏感字符
    public function stripSlashesDeep($value)
    {
        $value = is_array($value) ? array_map(array($this, 'stripSlashesDeep'), $value) : stripslashes($value);
        return $value;
    }
    // 检测敏感字符并删除
    public function removeMagicQuotes()
    {
        if (get_magic_quotes_gpc()) {
            $_GET = isset($_GET) ? $this->stripSlashesDeep($_GET ) : '';
            $_POST = isset($_POST) ? $this->stripSlashesDeep($_POST ) : '';
            $_COOKIE = isset($_COOKIE) ? $this->stripSlashesDeep($_COOKIE) : '';
            $_SESSION = isset($_SESSION) ? $this->stripSlashesDeep($_SESSION) : '';
        }
    }

    // 配置数据库信息
    public function setDbConfig()
    {
        if ($this->_config['db']) {
            Model::setDbConfig($this->_config['db']);
        }
    }

}