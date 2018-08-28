<?php

require(APP_PATH . 'lib/handler.php');

class tools {

    public static function TIME(){
        $timeOffset = 8;
        return gmdate("Y-m-d H:i:s", time() + $timeOffset * 3600);
    }

    /**
     * 密码安全
     * @param $str
     * @return string
     */
    public static function ENCRYPT($str){
        return md5($str);
    }

    /**
     * 参数验证
     * @param $str
     * @param $pattern
     * @return bool
     */
    public static function VALIDATE($str,$pattern){
        return preg_match($pattern,$str)?true:false;
    }
    public static function PARAM_VALIDATE($data){
        foreach ($data as $key=>$val){
            if(tools::VALIDATE($key,$val) == false){
                return false;
            }
        }
        return true;
    }

    /**
     * 编码转换
     * 传入数组/字符串
     */
    // 例：GBK转UTF8，TRANSCODE("GBK","UTF-8")
    public static function TRANSCODE($data,$from,$to)
    {
        if(is_array($data)){
            $result = array();
            foreach ($data as $key => $value){
                $result[$key] = tools::TRANSCODE($value,$from,$to);
            }
            return $result;
        }elseif (is_string($data)){
            $data = iconv($from, $to."//IGNORE", $data);
            return $data;
        }else{
            return $data;
        }
    }
}