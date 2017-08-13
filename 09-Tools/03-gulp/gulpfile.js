// 定义依赖项和插件
var gulp=require('gulp'),
    gutil=require('gulp-util'),
    uglify=require('gulp-uglify'),
    concat=require('gulp-concat');

// 定义名为 "js" 的任务
gulp.task('js', function(){
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js'));
	// 自动检查指定的资源的变化
	gulp.watch('./js/*.js', ['js']);
});

// 定义默认任务
gulp.task('default', ['js']);