<?php

/**
 * 【vsf程序入口】
 * @Author: csxiaoyao
 * @Date:   2017-07-11 15:45:02
 * @Last Modified by:   sunshine
 * @Last Modified time: 2017-12-18 14:43:59
 */

/*
 * 加载常量
 */
define(__DIR__, dirname(__FILE__)); // 为 PHP 5.2 提供支持
define('APP_PATH', __DIR__ . '/'); // 应用目录为当前目录
require(APP_PATH . 'lib/constants.php');

// 加载配置文件
$config = require(APP_PATH . 'config/config.php');

// 加载框架核心文件
require(APP_PATH . 'vendor/VSF.php');

// 加载工具库
require(APP_PATH . 'lib/tools.php');

// 实例化框架类
$runtime = new VSF($config);
$runtime->run();
