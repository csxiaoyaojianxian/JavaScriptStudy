<?php
/**
 * 【数据库连接组件】
 * @Author: csxiaoyao
 * @Date:   2017-07-11 19:17:34
 * @Last Modified by:   sunshine
 * @Last Modified time: 2017-12-18 14:55:31
 */

/**
 * 加载数据库操作
 */
require(APP_PATH . 'vendor/Sql.php');

class Model extends Sql
{
    protected $_model;
    protected $_table;
    protected static $_dbConfig = array();

    public function __construct()
    {
        // 连接数据库
        $this->connect(self::$_dbConfig['host'], self::$_dbConfig['port'], self::$_dbConfig['username'], self::$_dbConfig['password'],
            self::$_dbConfig['dbname'],self::$_dbConfig['charset']);

        // 获取数据库表名
        if (!$this->_table) {
            // 获取模型类名称
            $this->_model = get_class($this);
            // 删除类名最后的 Model 字符
            $this->_model = substr($this->_model, 0, -5);
            // 数据库表名与类名一致
            $this->_table = strtolower($this->_model);
        }
    }

    public static function setDbConfig($config)
    {
        self::$_dbConfig = $config;
    }
}