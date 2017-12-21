<?php
/**
 * Created by PhpStorm.
 * User: victorsun
 * Date: 2017/7/24
 * Time: 19:26
 */

class MyRedis{

    private static $handler;

    private static function handler(){
        if(!self::$handler){
            self::$handler = new Redis();
            self::$handler -> connect(REDIS_HOST,REDIS_PORT);
            self::$handler -> auth(REDIS_AUTH);
        }
        return self::$handler;
    }

    public static function get($key){
        $value = self::handler() -> get($key);
        $value_serl = @unserialize($value);
        if(is_object($value_serl)||is_array($value_serl)){
            return $value_serl;
        }
        return $value;
    }

    /**
     * @param integer $timeDiff: 与REDIS_TTL的时差
     * @return bool
     */
    public static function set($key,$value,$timeDiff=0){
        if(is_object($value)||is_array($value)){
            $value = serialize($value);
        }
        if(REDIS_TTL){
            return self::handler() -> setex($key,REDIS_TTL+$timeDiff,$value);
        }else{
            return self::handler() -> set($key,$value);
        }
    }
}


