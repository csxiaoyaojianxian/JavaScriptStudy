# GulpStudy

## 1. 安装 Gulp.js

```Shell
npm install -g gulp
```

## 2. 配置

### 2.1 创建 package.json 文件 

```Shell
npm init
```

### 2.2 安装依赖项 

```Shell
npm install --save-dev gulp gulp-util
```

### 2.3 安装需要的插件

此处安装两个插件 **gulp-uglify** 和 **gulp-concat**，实现对 Javascript 文件压缩和合并，加上 **--save-dev** 参数会同时添加到包配置文件 **package.json**，以确保项目所需的依赖包可通过 **npm** 安装

```Shell
npm install --save-dev gulp-uglify gulp-concat
```

### 2.4 创建配置文件 

创建 gulpfile.js 文件

```javascript
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
```

## 3. 运行 

```Shell
gulp
```