---
style: ocean
---
# Webpack总结 - csxiaoyao-webpack脚手架
[TOC]
> Write By CS逍遥剑仙
> 我的主页: [www.csxiaoyao.com](http://www.csxiaoyao.com)
> GitHub: [github.com/csxiaoyaojianxian](https://github.com/csxiaoyaojianxian)
> Email: sunjianfeng@csxiaoyao.com
> QQ: [1724338257](wpa.qq.com/msgrd?uin=1724338257&site=qq&menu=yes)

![sunshine](http://www.csxiaoyao.com/src/img/sign.jpg)

> 本文所有代码均已经在 macos 和 windows 中实践，并注明了系统的差异

## 1. Webpack 与 Gulp / Grunt 对比 

**WebPack** : 模块化解决方案（模块打包机），能够分析项目结构，找到JavaScript模块及浏览器不能直接运行的拓展语言（Scss，TypeScript等），转换和打包为合适的格式供浏览器使用。WebPack把项目当做一个整体，通过一个给定的主文件（如：index.js）开始找到项目的所有依赖文件，使用loaders处理，最后打包为一个（或多个）浏览器可识别的JavaScript文件

**Gulp/Grunt** : 前端开发流程优化工具，在配置文件中指明对某些文件进行编译、组合、压缩等任务的具体步骤并自动完成

## 2. 安装

### 2.1 创建package.json文件

```shell
# 创建标准的npm说明文件
npm init
# 回车默认即可
```

### 2.2 安装Webpack作为依赖包

```shell
# 全局安装
npm install -g webpack
# 安装到项目目录
npm install --save-dev webpack
```

### 2.3 创建目录文件夹

创建两个文件夹：app 和 public，app文件夹存放原始数据和编写的JavaScript模块，public文件夹存放供浏览器读取的文件（包括使用webpack打包生成的js文件及一个`index.html`文件）

```text
webpack sample project
|-- node_modules/
|-- app/
|   |-- Greeter.js
|   |-- main.js
|-- public/
|   |--index.html
|-- package.json
```

## 3. 使用

### 3.1 编写基础代码

**index.html ** 用于测试引入打包后的js文件（暂定名为`bundle.js`）

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```

**Greeter.js** 中定义一个返回包含问候信息的`html`元素的函数,并依据CommonJS规范导出这个函数为一个模块

```javascript
// Greeter.js
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";
  return greet;
};
```

**main.js** 把`Greeter模块`返回的节点插入页面。

```JavaScript
//main.js 
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
```

### 3.2 命令行基本使用

webpack可以在终端中使用，在基本的使用方法如下：

```shell
# {extry file} 处填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file} 处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}
```

> 未全局安装webpack时需要额外指定其在node_modules中的地址
>
> ```shell
> # webpack非全局安装的情况，后同
> node_modules/.bin/webpack app/main.js public/bundle.js
> ```

### 3.3 通过配置文件使用

创建 websocket 配置文件 `webpack.config.js`

```javascript
module.exports = {
  entry:  __dirname + "/app/main.js",// 唯一入口文件
  output: {
    path: __dirname + "/public",// 打包后的文件存放路径
    filename: "bundle.js"// 打包后输出文件的文件名
  }
}
```

> **注**：“__dirname” 是 node.js 中的全局变量，指向当前执行脚本所在的目录

打包文件只需命令行执行 `webpack`，将自动引用 `webpack.config.js` 文件中的配置选项

```shell
webpack
```

### 3.4 更快捷地执行打包任务

对`npm`进行配置后可以使用 `npm` 引导任务执行，在命令行中使用简单的 `npm start` 命令替代略微繁琐的命令 `node_modules/.bin/webpack`，在 `package.json` 中对 `scripts` 对象进行相关设置：

```json
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" // 修改此处，JSON文件不支持注释，引用时清除
  },
  "author": "csxiaoyao",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^1.12.9"
  }
}
```

> **注：**
>
> 1. `package.json` 中的 `script` 会按一定顺序寻找命令对应位置（包含本地的`node_modules/.bin`），所以全局或局部安装的Webpack都不需要指明详细的路径
> 2. npm的`start`命令特殊，`npm start` 可直接执行其对应的命令，而如果脚本名称不是 `start`，需执行 `npm run {script name}` 如 `npm run build`

```shell
npm start
```

## 4. 功能扩展

### 4.1 生成Source Maps（简化调试）

通过配置 `devtool`，`webpack` 可以在打包时生成 `source maps`，为开发者提供一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，更容易调试，`devtool` 有四种不同的配置选项：

| devtool选项                      | 配置结果                                     |
| ------------------------------ | ---------------------------------------- |
| `source-map`                   | 在一个单独的文件中产生一个完整且功能完全的文件，这个文件具有最好的`source map`，但会减慢打包速度 |
| `cheap-module-source-map`      | 在一个单独的文件中生成一个不带列映射的`map`，不带列映射提高了打包速度，但也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便 |
| `eval-source-map`              | 使用`eval`打包源文件模块，在同一个文件中生成干净的完整的`source map`，这个选项可以在不影响构建速度的前提下生成完整的`sourcemap`，但是对打包后输出的JS文件的执行具有性能和安全的隐患，在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项 |
| `cheap-module-eval-source-map` | 这是在打包文件时最快的生成`source map`的方法，生成的`Source Map` 会和打包后的`JavaScript`文件同行显示，没有列映射，和`eval-source-map`选项具有相似的缺点 |

上述选项由上到下打包速度越来越快，同时也具有越来越多的负面作用，对中小型的项目，`eval-source-map`是一个很好的选项，但只应该开发阶段使用，对 `webpack.config.js`进行如下配置：

```javascript
module.exports = {
  devtool: 'eval-source-map',
  ...
}
```

### 4.2 构建本地服务器

`Webpack` 提供了一个基于node.js构建的可选的本地开发服务器，可以让浏览器监听代码修改，并自动刷新显示，安装依赖并配置，更多配置参考 [https://webpack.js.org/configuration/dev-server](https://webpack.js.org/configuration/dev-server/)

```shell
npm install --save-dev webpack-dev-server
```

| devserver配置选项      | 功能描述                                     |
| ------------------ | ---------------------------------------- |
| contentBase        | 默认为根文件夹提供本地服务器（本例设置到“public"目录）          |
| port               | 设置默认监听端口，默认为”8080“                       |
| inline             | 设置为`true`，当源文件改变时自动刷新页面                  |
| historyApiFallback | 依赖 HTML5 history API，如果设置为`true`，所有跳转将指向index.html（开发单页应用） |

修改配置文件 `webpack.config.js`

```javascript
module.exports = {
  ...
  devServer: {
    contentBase: "./public",// 本地服务器根目录
    historyApiFallback: true,// 不跳转
    inline: true// 实时刷新
  } 
}
```

在 `package.json` 中的 `scripts` 对象中添加命令以开启本地服务器

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack",
  "server": "webpack-dev-server --open"
},
```

开启本地服务器，在`8080`端口查看结果

```shell
npm run server
```

### 4.3 Loaders

通过使用不同的`loader`，`webpack`能调用外部的脚本或工具，实现对不同格式的文件处理，比如分析转换scss为css，或把下一代的JS文件（ES6，ES7）转换为现代浏览器兼容的JS文件，对React可以把JSX文件转换为JS文件

Loaders需单独安装并在 `webpack.config.js` 中配置 `modules`，Loaders配置包括：

- `test`：匹配loaders处理文件的拓展名的正则表达式（必须）
- `loader`：loader名称（必须）
- `include/exclude`：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
- `query`：为loaders提供额外的设置选项（可选）

#### 4.3.1 实例1：配置读取 json 文件

把 `Greeter.js` 中的问候消息单独存放于 `config.json`

```json
{
  "greetText": "Hi there and greetings from JSON!"
}
```

更新 Greeter.js

```javascript
var config = require('./config.json');

module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = config.greetText;
  return greet;
};
```

> **注**：由于`webpack3.*/webpack2.*`已内置可处理JSON文件，所以无需再添加`webpack1.*`需要的`json-loader`

#### 4.3.2 实例2：配置 babel

Babel是一个编译JavaScript的平台（ES6、ES7、JSX...），Babel有一些模块化的包，核心功能位于`babel-core`的npm包中，webpack可以把其不同的包整合在一起使用，对每个需要的功能或拓展需要安装单独的包（如解析Es6的`babel-preset-es2015`包和解析JSX的`babel-preset-react`包）

1. 安装依赖模块

```shell
# npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```

2. 配置 `webpack`

```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
};
```

3. 安装 `react`

```shell
npm install --save react react-dom
```

4. 使用ES6语法，更新`Greeter.js`并返回一个React组件

```javascript
// Greeter.js
import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
```

5. 修改`main.js`，使用ES6的模块定义和渲染Greeter模块

```javascript
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));
```

6. 重新打包

```shell
npm start
```

7. 访问 `localhost:8080` 查看效果

8. 使用单独的配置文件配置Babel

为简化Babel配置，把babel的配置选项单独放在 `.babelrc` 配置文件中（webpack会自动调用）

```javascript
module.exports = {
   ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    }
};
```

新建 `.babelrc` 文件

```json
{
  "presets": ["react", "es2015"]
}
```

#### 4.3.3 实例3：配置 css-loader &  style-loader

webpack提供两个工具处理样式表，`css-loader`使开发者能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能，`style-loader`将所有的计算后的样式加入页面中，二者组合把样式表嵌入webpack打包后的JS文件中

1. 安装依赖模块

```shell
npm install --save-dev style-loader css-loader
```

2. 配置 `webpack`

```javascript
module.exports = {
   ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
};
```

> 注：注意此处对同一个文件引入多个loader的方法

3. 在app文件夹中创建 `main.css` 文件

```css
/* main.css */
html {
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
h1, h2, h3, h4, h5, h6, p, ul {
  margin: 0;
  padding: 0;
}
```

4. 入口文件导入 `main.css` 文件

```javascript
//main.js
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

import './main.css';//使用require导入css文件

render(<Greeter />, document.getElementById('root'));
```

#### 4.3.4 实例4：配置 CSS module

CSS modules 技术意在把 JS 的模块化思想带入 CSS 中，通过CSS模块，所有的类名，动画名默认都只作用于当前模块，不必担心在不同的模块中使用相同的类名造成冲突

1. 配置 `webpack`

```JavaScript
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
};
```

2. 在app文件夹下创建 `Greeter.css` 文件

```css
.root {
  background-color: #eee;
  padding: 10px;
  border: 3px solid #ccc;
}
```

3. 导入 `.root` 到 `Greeter.js` 中，相同的类名也不会造成不同组件之间的污染

```javascript
import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';//导入

class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}>//添加类名
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
```

4. CSS modules 更多详见官方文档[https://github.com/css-modules/css-modules]()

#### 4.3.5 实例5：配置 CSS预处理器

`Sass` 和 `Less` 等预处理器是对原生CSS的拓展，允许使用 `variables`, `nesting`, `mixins`, `inheritance` 等不存在于CSS中的特性来写CSS，CSS预处理器可将其转化为浏览器可识别的CSS语句，常用的CSS 处理`loaders`:

- `Less Loader`
- `Sass Loader`
- `Stylus Loader`

此外存在一个更强大的CSS的处理平台`-PostCSS` [https://github.com/postcss/postcss](https://github.com/postcss/postcss) ，例如使用PostCSS为CSS代码自动添加适应不同浏览器的CSS前缀

1. 安装`postcss-loader` 和 `autoprefixer`（自动添加前缀插件）

```shell
npm install --save-dev postcss-loader autoprefixer
```

2. 配置 `webpack`

```javascript
//webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    }
}
```

3. 在根目录新建 `postcss.config.js` 文件

```javascript
// postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

4. 重新使用`npm start`打包，css会自动根据Can i use里的数据添加不同前缀

## 5. 插件

### 5.1 区别 Loaders 和 Plugins

loaders 在打包构建过程中处理源文件（JSX，Scss，Less..），一次处理一个

Plugins 直接作用于整个构建过程，不直接操作单个文件

### 5.2 使用插件

#### 5.2.1 实例1：banner-plugin

添加版权声明插件，插件地址：[https://webpack.js.org/plugins/banner-plugin](https://webpack.js.org/plugins/banner-plugin/) ，修改配置文件，打包后的JS文件中会插入版权信息

```javascript
const webpack = require('webpack');

module.exports = {
	...
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究')
    ],
};
```

#### 5.2.2 实例2：HtmlWebpackPlugin

HtmlWebpackPlugin 插件依据一个简单的`index.html`模板，生成一个自动引用打包后的JS文件的新`index.html` （添加`hash`值给js文件生成版本）

1. 安装依赖

```shell
npm install --save-dev html-webpack-plugin
```

2. 修改项目结构

移除public文件夹，`index.html` 文件会自动生成，在app目录下创建 `index.tmpl.html `文件模板（包含`title`等必须元素），编译过程中插件会自动添加所依赖的 css、js、favicon 等文件，并生成最终的html页面

```html
<!-- index.tmpl.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
  </body>
</html>
```

3. 更新`webpack`配置文件，新建 `build` 文件夹存放最终的输出文件

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    ...
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"// 创建插件实例，并传入相关参数
        })
    ],
};
```

4. 执行`npm start`，build文件夹下生成 `bundle.js` 和 `index.html`

#### 5.2.3 实例3：Hot Module Replacement

`Hot Module Replacement`（HMR）允许在修改组件代码后自动刷新实时预览

1. 安装`react-transform-hmr`

```shell
npm install --save-dev babel-plugin-react-transform react-transform-hmr
```

2. 配置Babel

```json
// .babelrc
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",
         "imports": ["react"],
         "locals": ["module"]
       }]
     }]]
    }
  }
}
```

3. 配置 `webpack`

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"// 创建插件实例，并传入相关参数
        }),
        new webpack.HotModuleReplacementPlugin()// 热加载插件
    ],
};
```

4. 使用React时可以热加载模块，每次保存能在浏览器上看到更新内容

## 6. 产品阶段的构建

在产品阶段，还需要对打包的文件进行额外的处理，如优化、压缩、缓存及分离CSS和JS

### 6.1 创建 webpack.production.config.js 文件

```javascript
// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"// 创建插件实例，并传入相关参数
        }),
        new webpack.HotModuleReplacementPlugin()// 热加载插件
    ],
};
```

### 6.2 配置 package.json

```json
//package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open",
    "build": "NODE_ENV=production webpack --config ./webpack.production.config.js --progress"
  },
  "author": "csxiaoyao",
  "license": "ISC",
  "devDependencies": {
	...
  },
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  }
}
```

> 注：此处 build 脚本合并了两条命令，是 Mac 的 bash / Linux 的 shell 中的独特操作，powershell / cmd 不支持这种操作，Windows 下拆分命令为：
>
> ```json
> "build": "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress"
> ```

### 6.3 优化插件

- `OccurenceOrderPlugin`：（内置）为组件分配ID，分析和优先考虑使用最多的模块并为它们分配最小的ID
- `UglifyJsPlugin`：（内置）压缩JS代码
- `ExtractTextPlugin`：分离CSS和JS文件

1. 安装依赖

```shell
npm install --save-dev extract-text-webpack-plugin
```

2. 配置 `webpack`

```javascript
// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'none',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ],
};
```

3. 执行

```shell
npm run build
```

### 6.4 缓存

webpack可以把哈希值添加到打包的文件名中，添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前

```javascript
module.exports = {
	...
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
	...
};
```
![sunshine](http://www.csxiaoyao.com/src/img/sign.jpg)
