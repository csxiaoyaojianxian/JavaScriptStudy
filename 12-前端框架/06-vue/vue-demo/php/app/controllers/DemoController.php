<?php

/**
 * @Author: sunshine
 * @Date:   2017-12-18 16:02:34
 * @Last Modified by:   sunshine
 * @Last Modified time: 2017-12-20 22:37:59
 */

header('Content-type: text/json;charset=utf-8');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:Authorization,Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods:GET,POST");

require(APP_PATH . 'vendor/Controller.php');

class DemoController extends Controller
{
    /*
     * test
     */
    public function getLunbo()
    {
        $data = array(
            array(
            	"url"=>"http://www.csxiaoyao.com",
            	"img"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg"
            ),
            array(
            	"url"=>"http://blog.csxiaoyao.com",
            	"img"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/01/javascript.jpg"
            ),
            array(
            	"url"=>"http://blog.csxiaoyao.com",
            	"img"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/01/study-1.jpg"
            )
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getnewslist() 
    {
        $data = array(
            array(
                "id"=>1,
                "title"=>"新闻标题1",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"新闻摘要新闻摘要新闻摘要新闻摘要",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
            ),
            array(
                "id"=>2,
                "title"=>"新闻标题2",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"新闻摘要新闻摘要新闻摘要新闻摘要",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
            ),
            array(
                "id"=>3,
                "title"=>"新闻标题3",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"新闻摘要新闻摘要新闻摘要新闻摘要",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
            ),
            array(
                "id"=>4,
                "title"=>"新闻标题4",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"新闻摘要新闻摘要新闻摘要新闻摘要",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
            ),
            array(
                "id"=>5,
                "title"=>"新闻标题5",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"新闻摘要新闻摘要新闻摘要新闻摘要",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
            ),
        );
        echo handler::OUTPUT(SUC, "ok", $data);

    }

    public function getnew()
    {
        $param = handler::PARAM(array('id'));
        $dataValidate = array(
            $param["id"] => PATTERN_REQUIRE
        );
        if( !tools::PARAM_VALIDATE($dataValidate) ) {
            echo handler::OUTPUT(FAILED, "error params", "");
            exit();
        }
        $data = array(
            array(
                "id"=>$param["id"],
                "title"=>"新闻标题".$param["id"],
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "click"=>"2",
                "content"=>"新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容",
            )
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getimgcategory()
    {
        $data = array(
            array(
                "title"=>"家居生活",
                "id"=>1
            ),
            array(
                "title"=>"摄影设计",
                "id"=>2
            ),
            array(
                "title"=>"科技",
                "id"=>3
            ),
            array(
                "title"=>"情感",
                "id"=>4
            ),
            array(
                "title"=>"生活",
                "id"=>5
            ),
            array(
                "title"=>"都市",
                "id"=>6
            ),
            array(
                "title"=>"玄幻",
                "id"=>7
            )
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getimages()
    {
        $param = handler::PARAM(array('id'));
        $data = array(
            array(
                "id"=>1,
                "title"=>"图文分享标题1",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "zhaiyao"=>"图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要"
            ),
            array(
                "id"=>2,
                "title"=>"图文分享标题2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "zhaiyao"=>"图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要"
            ),
            array(
                "id"=>3,
                "title"=>"图文分享标题3",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "zhaiyao"=>"图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要"
            ),
            array(
                "id"=>4,
                "title"=>"图文分享标题4",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "zhaiyao"=>"图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要图文分享摘要"
            ),
        );
        if($param["id"] !== "" && $param["id"]>0 ){
            $data = $data[$param["id"]-1];
        }
        
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getthumimages()
    {
        $param = handler::PARAM(array('id'));
        $data = array(
            array("src"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg"),
            array("src"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg"),
            array("src"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg"),
            array("src"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg")
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getimageinfo()
    {
        $param = handler::PARAM(array('id'));
        $data = array(
            "id"=>$param["id"],
            "title"=>"图片标题".$param["id"],
            "add_time"=>"2017-12-18T07:07:07.000Z",
            "click"=>"2",
            "content"=>"图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容图片内容",
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getcomments()
    {
        $param = handler::PARAM(array('id','pageIndex'));
        $data = array(
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            ),
            array(
                "user_name"=>"匿名用户",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "content"=>"评论内容评论内容评论内容"
            )
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getgoods()
    {
        $param = handler::PARAM(array('id','pageIndex'));
        $data = array(
            array(
                "id"=>1,
                "title"=>"MI6",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"小米6，变焦双摄，拍人更美",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "sell_price"=>2000,
                "market_price"=>2500,
                "stock_quantity"=>60
            ),
            array(
                "id"=>2,
                "title"=>"MI6",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"小米6，变焦双摄，拍人更美",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "sell_price"=>2000,
                "market_price"=>2500,
                "stock_quantity"=>60
            ),
            array(
                "id"=>3,
                "title"=>"MI6",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"小米6，变焦双摄，拍人更美",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "sell_price"=>2000,
                "market_price"=>2500,
                "stock_quantity"=>60
            ),
            array(
                "id"=>4,
                "title"=>"MI6",
                "add_time"=>"2017-12-18T07:07:07.000Z",
                "zhaiyao"=>"小米6，变焦双摄，拍人更美",
                "click"=>"2",
                "img_url"=>"http://www.csxiaoyao.com/blog/wp-content/uploads/2017/06/nodejs.jpg",
                "sell_price"=>2000,
                "market_price"=>2500,
                "stock_quantity"=>60
            )
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }

    public function getinfo()
    {
        $data = array(
            "id"=>1,
            "title"=>"MI6",
            "add_time"=>"2017-12-18T07:07:07.000Z",
            "goods_no"=>"123456",
            "sell_price"=>2000,
            "market_price"=>2500,
            "stock_quantity"=>60
        );
        echo handler::OUTPUT(SUC, "ok", $data);
    }
    
}