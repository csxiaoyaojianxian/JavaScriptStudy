# Gulp快速入门教程

* Gulp介绍

  * 中文主页: http://www.gulpjs.com.cn/
  * gulp是与grunt功能类似的**前端项目构建**工具, 也是基于Nodejs的自动**任务运行器**
  * 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的
    合并、压缩、检查、监听文件变化、浏览器自动刷新、测试等任务
  * gulp更高效(异步多任务), 更易于使用, 插件高质量

* 安装 nodejs, 查看版本: node -v

* 创建一个简单的应用gulp_test
  ```
  |- dist
  |- src
    |- js
    |- css
    |- less
  |- index.html
  |- gulpfile.js-----gulp配置文件
  |- package.json
    {
      "name": "gulp_test",
      "version": "1.0.0"
    } 
  ```

* 安装gulp:
  * 全局安装gulp
    ```
    npm install gulp -g
    ```
  * 局部安装gulp
    ```
    npm install gulp --save-dev
    ```
  * 配置编码: gulpfile.js
    ```
    //引入gulp模块
    var gulp = require('gulp');
    //定义默认任务
    gulp.task('任务名', function() {
      // 将你的任务的任务代码放在这
    });
    gulp.task('default', ['任务'])//异步执行
    ```
  * 构建命令: 
    ```
    gulp
    ```

* 使用gulp插件
  * 相关插件:
    * gulp-concat : 合并文件(js/css)
    * gulp-uglify : 压缩js文件
    * gulp-rename : 文件重命名
    * gulp-less : 编译less
    * gulp-clean-css : 压缩css
    * gulp-livereload : 实时自动编译刷新
  * 重要API
    * gulp.src(filePath/pathArr) : 
      * 指向指定路径的所有文件, 返回文件流对象
      * 用于读取文件
    * gulp.dest(dirPath/pathArr)
      * 指向指定的所有文件夹
      * 用于向文件夹中输出文件
    * gulp.task(name, [deps], fn) 
      * 定义一个任务
    * gulp.watch() 
      * 监视文件的变化
  * 处理js
    * 创建js文件
      * src/js/test1.js
        ```
        (function () {
          function add(num1, num2) {
            var num3 = 0;
            num1 = num2 + num3;
            return num1 + num2;
          }
          console.log(add(10, 30));
        })();
        ```
      * src/js/test2.js
        ```
        (function () {
          var arr = [2,3,4].map(function (item, index) {
              return item+1;
          });
          console.log(arr);
        })();
        ```
    * 下载插件:
      ```
      npm install gulp-concat gulp-uglify gulp-rename --save-dev
      ```
    * 配置编码
      ```
      var concat = require('gulp-concat');
      var uglify = require('gulp-uglify');
      var rename = require('gulp-rename');
      
      gulp.task('minifyjs', function() {
          return gulp.src('src/js/*.js') //操作的源文件
              .pipe(concat('built.js')) //合并到临时文件     
              .pipe(gulp.dest('dist/js')) //生成到目标文件夹
              .pipe(rename({suffix: '.min'})) //重命名  
              .pipe(uglify())    //压缩
              .pipe(gulp.dest('dist/js'));
      });
      
      gulp.task('default', ['minifyjs']);
      ```
    * 页面引入js浏览测试 : index.html
      ```
      <script type="text/javascript" src="dist/js/built.min.js"></script>
      ```
    * 打包测试: gulp
  * 处理css
    * 创建less/css文件
      * src/css/test1.css
        ```
        #div1 {
          width: 100px;
          height: 100px;
          background: green;
        }
        ```
      * src/css/test2.css
        ```
        #div2 {
          width: 200px;
          height: 200px;
          background: blue;
        }
        ```
      * src/less/test3.less
        ```
        @base: yellow;
        .index1 { color: @base; }
        .index2 { color: green; }
        ```
    * 下载插件:
      ```
      npm install gulp-less gulp-clean-css --save-dev 
      ```
    * 配置编码
      ```
      var less = require('gulp-less');
      var cleanCSS = require('gulp-clean-css');
      
      //less处理任务
      gulp.task('lessTask', function () {
        return gulp.src('src/less/*.less')
            .pipe(less()) 
            
            .pipe(gulp.dest('src/css'));
      })
      //css处理任务, 指定依赖的任务
      gulp.task('cssTask',['lessTask'], function () {
      
        return gulp.src('src/css/*.css')
            .pipe(concat('built.css'))
            .pipe(gulp.dest('dist/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/css'));
      });
      
      gulp.task('default', ['minifyjs', 'cssTask']);
      ```
    * 页面引入css浏览测试 : index.html
      ```
      <link rel="stylesheet" href="dist/css/built.min.css">
      <div id="div1" class="index1">div1111111</div>
      <div id="div2" class="index2">div2222222</div>
      ```
    * 打包测试: gulp
  * 处理html
      * 下载插件:
        ```
        npm install gulp-htmlmin --save-dev
        ```
      * 配置编码
        ```
        var htmlmin = require('gulp-htmlmin');
        //压缩html任务
        gulp.task('htmlMinify', function() {
            return gulp.src('index.html')
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest('dist'));
        });
        gulp.task('default', ['minifyjs', 'cssTask', 'htmlMinify']);
        ```
      * 修改页面引入
        ```
        <link rel="stylesheet" href="css/built.min.css">
        <script type="text/javascript" src="js/built.min.js"></script>
        ```
      * 打包测试: gulp    
  * 自动编译
    * 下载插件
      ```
      npm install gulp-livereload --save-dev
      ```
    * 配置编码:
      ```
      var livereload = require('gulp-livereload');
                
      //所有的pipe
      .pipe(livereload());
      
      gulp.task('watch', ['default'], function () {    
        //开启监视
        livereload.listen();
        //监视指定的文件, 并指定对应的处理任务
        gulp.watch('src/js/*.js', ['minifyjs'])
        gulp.watch(['src/css/*.css','src/less/*.less'], ['cssTask','lessTask']);
      });
      ```
      
    * 热加载(实时加载)
        * 下载插件：gulp-connect
        ```
        1、 npm install gulp-connect --save-dev
        2、 注册 热加载的任务 server，注意依赖build任务 
        3、注册热加载的任务
            //配置加载的选项
            connect.server({
                  root : 'dist/',//提供服务的根路径
                  livereload : true,//是否实时刷新
                  port : 5000//开启端口号
             });
             // 自动开启链接
             open('http://localhost:5000');//npm install open --save-dev
             // 监视目标文件
            gulp.watch('src/js/*.js', ['js']);
            gulp.watch(['src/css/*.css', 'src/css/*.less'], ['cssMin', 'less']);
        ```
    
    * 扩展
        * 打包加载gulp插件
        * 前提：将插件下载好。
        * 下载打包插件： gulp-load-plugins
        * npm install gulp-load-plugins --save-dev
        * 引入： var $ = require('gulp-load-plugins')();！！！引入的插件是个方法，必须记住调用。
        * 神来之笔：其他的插件不用再引入了
        * 使用方法：
            ```
            * 所有的插件用 $ 引出，其他插件的方法名统一为插件的功能名字(即插件名字的最后一部分)：如：concat,connect,cssmin...
            gulp.task('lib', function() {
              gulp.src('bower_components/**/*.js')
              .pipe(gulp.dest(app.devPath + 'vendor'))
              .pipe(gulp.dest(app.prdPath + 'vendor'))
              .pipe($.connect.reload());
            });

            ```