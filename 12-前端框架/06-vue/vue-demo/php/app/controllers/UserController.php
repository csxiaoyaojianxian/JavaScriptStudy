<?php
/**
 * Created by PhpStorm.
 * User: csxiaoyao
 * Date: 2017/7/13
 * Time: 15:24
 */

header('Content-type: text/json;charset=utf-8');

require(APP_PATH . 'vendor/Controller.php');

// require(APP_PATH . 'vendor/Redis.php');

class UserController extends Controller
{
    /*
     * test
     */
    public function test()
    {
        // 批量接收参数
        $param = handler::PARAM(array('email','pwd'));
        // 验证参数
        $dataValidate = array(
            $param["email"]    => PATTERN_REQUIRE,
            $param["email"]    => PATTERN_EMAIL,
            $param["pwd"]      => PATTERN_REQUIRE,
            $param["pwd"]      => PATTERN_PWD,
        );
        if( !tools::PARAM_VALIDATE($dataValidate) ) {
            echo handler::OUTPUT(FAILED, "error params", "");
            return;
        }

        // 初始化模型
        $UserModel = new UserModel();
        $data = array(
            "email" => $param['email'],
            "pwd" => tools::ENCRYPT($param['pwd']),
            "time" => tools::TIME()
        );
        $count = $UserModel->add($data);
        // 使用 redis
        $result = array();
        // $redisKey = "USER_INF_" . $param["email"];
        // if(MyRedis::get($redisKey)){
        //     $result = MyRedis::get($redisKey);
        // }else{
            // db操作
            $condition = array(
                "email" => $param['email'],
                "pwd" => tools::ENCRYPT($param['pwd'])
            );
            $result = $UserModel->selectCondition($condition);
        //     MyRedis::set($redisKey, $result);
        // }
        echo handler::OUTPUT(SUC, "ok", $result);
    }

}