<?php

class Sql
{
    protected $_dbHandle;
    protected $_result;
    private $filter = '';

    /*
     * connection
     */
    // 连接数据库
    public function connect($host, $port, $username, $password, $dbname, $charset)
    {
        try {
            $dsn = sprintf("mysql:host=%s;dbname=%s;charset=%s", $host, $dbname, $charset);
            $option = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);
            $this->_dbHandle = new PDO($dsn, $username, $password, $option);
        } catch (PDOException $e) {
            exit('error: ' . $e->getMessage());
        }
    }

    /*
     * CRUD
     */
    
    /**
     * 1. 查询 无条件查询所有
     * @param  $length=0 时无 limit
     * @return 返回二维数组
     */
    public function selectAll($start=0,$length=0)
    {
        $sql = sprintf("select * from `%s` %s", $this->_table, $this->filter);
        if($length > 0){
            $sql .= " limit " . $start . "," . $length;
        }

        if(SHOW_SQL == true){
            echo $sql;
        }

        $sth = $this->_dbHandle->prepare($sql);
        $sth->execute();
        return $sth->fetchAll();
    }

    /**
     * 2. 查询 根据id查询
     * @param  $id 字段名必须为 `id`
     * @return 返回一组数据(一维数组)
     */
    public function select($id)
    {
        $sql = sprintf("select * from `%s` where `id` = '%s'", $this->_table, $id);

        if(SHOW_SQL == true){
            echo $sql;
        }

        $sth = $this->_dbHandle->prepare($sql);
        $sth->execute();
        return $sth->fetch();
    }

    /**
     * 3. 查询 根据字段匹配查询
     * @param  $data 查询条件为数组，array("key1"=>"value1","key2"=>"value2")
     * @param  $length=0 时无 limit
     * @return 返回二维数组
     */
    public function selectCondition($data,$start=0,$length=0)
    {
        $sql = sprintf("select * from `%s` where %s", $this->_table, $this->formatSelect($data));
        if($length > 0){
            $sql .= " limit " . $start . "," . $length;
        }

        if(SHOW_SQL == true){
            echo $sql;
        }

        $sth = $this->_dbHandle->prepare($sql);
        $sth->execute();
        return $sth->fetchAll();
    }

    /**
     * 4. 查询 根据sql查询所有，模糊查询
     * @param  $sql 针对模糊查询等情况
     * @return 返回二维数组
     */
    public function selectSql($sql)
    {
        if(SHOW_SQL == true){
            echo $sql;
        }

        $sth = $this->_dbHandle->prepare($sql);
        $sth->execute();
        return $sth->fetchAll();
    }

    /**
     * 5. 新增
     * @param $data array("key1"=>"value1","key2"=>"value2")
     * @return 返回影响的行数(integer)
     */
    public function add($data)
    {
        $sql = sprintf("insert into `%s` %s", $this->_table, $this->formatInsert($data));

        if(SHOW_SQL == true){
            echo $sql;
        }

        return $this->query($sql);
    }

    // 根据条件 (id) 删除，返回影响的行数
    public function delete($id)
    {
        $sql = sprintf("delete from `%s` where `id` = '%s'", $this->_table, $id);

        if(SHOW_SQL == true){
            echo $sql;
        }

        $sth = $this->_dbHandle->prepare($sql);
        $sth->execute();
        return $sth->rowCount();
    }

    // 修改数据，返回影响的行数
    // $ids 用于查找
    // $data 用于更新
    public function update($ids, $data)
    {
        $sql = sprintf("update `%s` set %s where %s", $this->_table, $this->formatUpdate($data), $this->formatSelect($ids));

        if(SHOW_SQL == true){
            echo $sql;
        }

        return $this->query($sql);
    }

    /*
     * 中间方法
     */
    // 查询条件
    public function where($where = array())
    {
        if (isset($where)) {
            $this->filter .= ' WHERE ';
            $this->filter .= implode(' ', $where);
        }
        return $this;
    }

    // 排序条件
    public function order($order = array())
    {
        if(isset($order)) {
            $this->filter .= ' ORDER BY ';
            $this->filter .= implode(',', $order);
        }
        return $this;
    }

    // 自定义SQL查询，返回影响的行数
    public function query($sql)
    {
        $sth = $this->_dbHandle->prepare($sql);
        $sth->execute();
        return $sth->rowCount();
    }

    /**
     * TOOLS
     */
    // 数组 => 条件查询格式 sql语句
    private function formatSelect($data)
    {
        $fields = array();
        foreach ($data as $key => $value) {
            $fields[] = sprintf("`%s` = '%s'", $key, $value);
        }
        return implode(' and ', $fields);
    }

    // 数组 => 插入格式 sql语句
    private function formatInsert($data)
    {
        $fields = array();
        $values = array();
        foreach ($data as $key => $value) {
            $fields[] = sprintf("`%s`", $key);
            $values[] = sprintf("'%s'", $value);
        }

        $field = implode(',', $fields);
        $value = implode(',', $values);

        return sprintf("(%s) values (%s)", $field, $value);
    }

    // 数组 => 更新格式 sql语句
    private function formatUpdate($data)
    {
        $fields = array();
        foreach ($data as $key => $value) {
            $fields[] = sprintf("`%s` = '%s'", $key, $value);
        }
        return implode(',', $fields);
    }

}