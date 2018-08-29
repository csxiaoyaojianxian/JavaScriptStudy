<?php
/**
 * 【配置】
 * @Author: csxiaoyao
 * @Date:   2017-07-11 17:13:40
 * @Last Modified by:   sunshine
 * @Last Modified time: 2017-12-18 14:57:39
 */

/*
 * 开关参数配置
 */
define('APP_DEBUG', true); // 开启调试模式，输出错误信息
define('SHOW_SQL', false); // 打印sql

/*
 * 开启session
 */
session_start();

/*
 * 加载redis配置
 */
$redisConfig = APP_PATH . 'config/redis.php';
require_once $redisConfig;

/*
 * 加载数据库配置
 */
$dbConfig = APP_PATH . 'config/db.php';
require_once $dbConfig;

// 默认控制器和操作名
$config['defaultController'] = 'User';
$config['defaultAction'] = 'test';

return $config;