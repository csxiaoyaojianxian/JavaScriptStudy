<?php

/**
 * Created by PhpStorm.
 * User: csxiaoyao
 * Date: 2017/7/13
 * Time: 15:14
 */
class UserModel extends Model
{
    /**
     * 自定义当前模型操作的数据库表名称
     * 如果不指定默认为类名称的小写字符串
     */
//    public $_table = 'user';

    /*
     * 获取总用户数
     * 返回一个整数
     */
    public function getUserAmount(){
        $sql = sprintf("select count(id) from `%s`", $this->_table);
        $result = $this->selectSql($sql);
        return $result[0]["count(id)"];
    }

}