/*
 * @Author: victorsun - csxiaoyao
 * @Date: 2020-02-01 17:07:04
 * @LastEditors  : victorsun
 * @LastEditTime : 2020-02-01 21:03:23
 * @Description: www.csxiaoyao.com
 */
module.exports = function(grunt){
    // 1. 初始化插件配置
    grunt.initConfig({
        //主要编码处
        concat: { // 任务名
            options: { //可选项配置
                separator: ';'   //使用;连接合并
            },
            build: { //此名称任意
                src:  ["src/js/*.js"],  //合并哪些js文件
                dest: "build/js/built.js" //输出的js文件
            }
        },
        pkg : grunt.file.readJSON('package.json'),
        uglify : {
            options: {  //不是必须的
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                files: {
                    'build/js/built-<%=pkg.name%>-<%=pkg.version%>.min.js': ['build/js/built.js']
                }
            }
        },
        jshint : {
            options: {
                jshintrc : '.jshintrc' //指定配置文件
            },
            build : ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'build/css/output.min.css': ['src/css/*.css']
                }
            }
        },
        watch : {
            scripts : {
                files : ['src/js/*.js', 'src/css/*.css'],
                tasks : ['concat', 'jshint', 'uglify', 'cssmin'],
                options : {spawn : false}  
            }
        }
    });
    // 2. 加载插件任务
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 3. 注册构建任务
    // grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'cssmin', 'watch']); // 同步执行
    // 优化
    grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'cssmin']); // 同步执行
    grunt.registerTask('myWatch', ['default','watch']); // 同步执行
};