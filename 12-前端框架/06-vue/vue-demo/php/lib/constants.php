<?php
/**
 * Created by PhpStorm.
 * User: csxiaoyao
 * Date: 2017/7/13
 * Time: 20:06
 */

/**
 * variable
 */
// 请求路径
define('REQ_PATH', $_SERVER['SCRIPT_NAME']);

/**
 * 正则表达式
 */
define('PATTERN_REQUIRE', "/^\S+$/");
define('PATTERN_EMAIL', "/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/");
define('PATTERN_PHONE', "/^1[3|5|7|8|][0-9]{9}$/");
define('PATTERN_PWD', "/^\w{6,50}$/");


/**
 * http code
 */
define('SUC', 200);
// 操作成功
define('SUCCESS', 200);
// 用户未登录
define('CHECK_LOGIN_FAILED', 401);
// 操作失败 (数据库)
define('FAILED', 403);

/**
 * error
 */
