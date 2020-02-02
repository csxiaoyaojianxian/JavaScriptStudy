var gulp = require('gulp');
var $ = require('gulp-load-plugins')()//引入的是函数，调用以后返回的是对象


// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
// var less = require('gulp-less');
// var cssClean = require('gulp-clean-css');
// var htmlMin = require('gulp-htmlmin');
// var livereload = require('gulp-livereload');
// var connect = require('gulp-connect');
var open = require('open');

//注册合并压缩js的任务
gulp.task('js', function () {
	//你的任务执行 具体过程
	return gulp.src('src/js/*.js')//找目标原文件 将原文件的数据读取到gulp的内存中
		.pipe($.concat('build.js'))//合并js文件
		.pipe(gulp.dest('dist/js/'))//临时输出
		.pipe($.uglify())//压缩js文件
		.pipe($.rename({suffix:'.min'}))//重命名
		.pipe(gulp.dest('dist/js/'))//输出
		//.pipe(livereload())//实时加载
		.pipe($.connect.reload())
});

//注册编译less的任务
gulp.task('less', function () {
	return gulp.src('src/less/*.less')
		.pipe($.less())//将less文件转换为css文件
		.pipe(gulp.dest('src/css/'))
		//.pipe(livereload())//实时加载
		.pipe($.connect.reload())
});

//注册合并压缩css的任务
gulp.task('css',['less'] ,function () {
	return gulp.src('src/css/*.css')
		.pipe($.concat('build.css'))
		.pipe(gulp.dest('dist/css/'))
		.pipe($.rename({suffix:'.min'}))
		.pipe($.cleanCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css/'))
		//.pipe(livereload())//实时加载
		.pipe($.connect.reload())

});

//注册压缩html的任务
gulp.task('html', function () {
	return gulp.src('index.html')
		.pipe($.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist/'))
		//.pipe(livereload())//实时加载
		.pipe($.connect.reload())
});

//注册监视的任务--->半自动
gulp.task('watch',['default'], function () {
	//开启监视
	livereload.listen();

	//确认监视的目标并且绑定相应的任务
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css', 'less']);
});

//注册一个全自动的任务
gulp.task('server',['default'], function () {
	//配置服务器选项
	$.connect.server({
		root : 'dist/',//监视的源目标文件路径
		livereload : true,//是否实时刷新
		port : 5000//开启端口号
	});
	open('http://localhost:5000/');

	//确认监视的目标并且绑定相应的任务
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css', 'less']);
})




//注册一个默认任务
gulp.task('default', ['js', 'less', 'css','html']);


