<?php
/**
 * Created by PhpStorm.
 * User: sunshine
 * Date: 2017/7/24
 * Time: 1:01
 */

class handler{

    /**
     * GET / POST / REQUEST
     * @param $keyword
     * @return string
     */
    public static function GET($keyword){
        return isset($_GET[$keyword]) ? trim($_GET[$keyword]) : '';
    }
    public static function POST($keyword){
        return isset($_POST[$keyword]) ? trim($_POST[$keyword]) : '';
    }
    protected static function REQUEST($keyword){
        return isset($_REQUEST[$keyword]) ? trim($_REQUEST[$keyword]) : '';
    }

    /**
     * 批量获取参数
     * @param $param
     * @return array
     */
    public static function PARAM($param){
        $returnData = array();
        foreach ($param as $val){
            $returnData[$val] = handler::REQUEST($val);
        }
        return $returnData;
    }

    /**
     * 返回 json 格式数据
     * @param $code
     * @param $msg
     * @param $data
     * @return string
     */
    public static function OUTPUT($code, $msg, $data){
        header("HTTP/1.1 " . $code);
        $returnData = array("code"=>$code, "msg"=>$msg, "data"=>$data);
        return json_encode($returnData);
    }
}