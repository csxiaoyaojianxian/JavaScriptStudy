# ts-axios 编译与发布

## 需求分析

前面的章节我们完成 `ts-axios` 库的代码编写和单元测试。这一章我们希望把代码部署发布到公共 `npm` 上，供别人下载使用。但是并不是所有人都会使用 TypeScript 开发，仍然有大量的 JavaScript 用户，它们是不能直接引用 TypeScript 代码的，因此我们需要先对源码做编译和打包，然后再发布。

由于我们会把包发布到公共的 npm 源，如果你还没有 `npm` 账号，那么需要先去[官网注册](https://www.npmjs.com/signup)。注册完成后，可以去终端执行 `npm login` 登录。这个步骤非常重要，决定你最终能否发布成功。

## 编译和打包

我们会利用 [rollup](https://github.com/rollup/rollup) 来打包我们的 `ts-axios` 库，它是一个非常著名的编译打包工具，Vue.js 也是利用 rollup 编译打包的。相比 webpack，它非常适合去编译和打包一些 JS 库。

由于使用 `typescript-library-starter` 初始化我们的项目，我们已经拥有了 rollup 打包的相关配置和相关插件的安装，接下来我们就来对生成的 `rollup.config.ts` 做小小的修改。

### 修改 rollup.config.ts

```typescript
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

const libraryName = 'axios'

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ]
}
```

注意要修改的地方，把 `libraryName` 修改为 `axios`，`input` 修改为 `src/index.ts`。

`rollup` 的配置很简单，我们简单地过一下。

- input

表示打包入口文件。

- output

表示输出的目标文件，它是一个对象数组，我们可以指定输出的格式，比如 `umd` 格式、`es` 模式等。

- external

声明它的外部依赖，可以不被打包进去。

- watch

监听文件的变化，重新编译，只有在编译的时候开启 `--watch` 才生效。

- plugins

编译过程中使用的插件，其中 `rollup-plugin-typescript2` 就是用来编译 TypeScript 文件，`useTsconfigDeclarationDir` 表示使用 `tsconfig.json` 文件中定义的 `declarationDir`。其它插件感兴趣的同学可以自己去查阅文档。

### 修改 package.json

由于我们已经在 `rollup.config.ts` 中修改了 `libraryName` 为 `axios`， 那么在 `package.json` 文件中你需要做相关的修改：

```typescript
{
  "main": "dist/axios.umd.js",
  "module": "dist/axios.es5.js",
  "typings": "dist/types/index.d.ts"
}
```

然后我们在控制台执行 `npm run build`，会编译输出 `dist` 目录，其中 `lib` 目录是单个 `.ts` 文件编译后的 `.js` 文件。`types` 目录是所有 `.ts` 文件编译后生产的 `.d.ts` 声明文件。`axios.es5.js` 是编译后生成的 es 模式的入口文件，用在 `package.json` 的 `module` 字段，`axios.umd.js` 文件是编译后生成的 `umd` 模式的入口文件，用在 `package.json` 的 `main` 字段。

## 自动化部署

由于 `semantic-release` 插件过于黑盒也略微重量，我还是决定教同学们自己编写自动化部署脚本，这样更灵活，意义也更大，因为大部分场景是用不到那么多 feature 的。

### 修改 package.json

发布到 npm 之前你需要为你的包命名，由于 `ts-axios` 这个名字已经被占用了，我使用了 `ts-axios-new` 这个名称，当然你学到这里，就需要起一个新名字了。可以使用 `npm view [<@scope>/]<pkg>[@<version>]` 的方式去搜索一个包名是否已经存在，比如你搜索 `npm view ts-axios-new` 会发现这个包已经存在，返回这个包相关信息。如果你搜索 `npm view xxxx` 返回错误 404 的话，那么你就可以使用 `xxxx` 这个包名了。

如果你想让你发布的包关联你的仓库地址，可以配置 `repository` 的 `url` 字段。

另外我们增加 2 个 npm scripts：

```json
{
  "prepub": "npm run test:prod && npm run build",
  "pub": "sh release.sh"
}
```

当我们运行 `npm run pub` 的时候，会优先执行 `prepub` 脚本，在 `prepub` 中我们运行了 `test:prod` 和 `build` 2 个脚本。`&&` 符号表示前面一个命令执行成功后才会执行后面的任务。

`npm run test:prod` 实际上运行了 `npm run lint && npm run test -- --no-cache`。 先运行 `lint` 去校验我们的源码和测试文件是否遵循 `tslint` 规范，再运行 `test` 去跑测试。

`npm run build` 实际上运行了 `tsc --module commonjs`、`rollup -c rollup.config.ts` 和 `typedoc --out docs --target es6 --theme minimal --mode file src`。先运行 `tsc` 去编译我们的 `TypeScript` 文件，`dist/lib` 和 `dist/types` 下的文件就是该命令产生的，然后运行 `rollup` 去构建 `axios.umd.js` 及 `axios.es.js`，最后运行 `typedoc` 去构建项目的文档。

运行完 `prepub` 后就会再运行 `pub` 命令，实际上执行了 `sh release.sh` 命令，但是目前我们没有这个脚本，接下来我们就需要来编写部署脚本 `release.sh`。

### 编写部署脚本

`release.sh`：

```bash
#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo  # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish
  npm publish
fi
```

部署脚本是 shell 脚本，shell 脚本就是封装了多行控制台命令，来逐行解释他们的含义。

`#!/usr/bin/env sh` 用来表示它是一个 shell 脚本。

`set -e` 告诉脚本如果执行结果不为 true 则退出。

`echo "Enter release version: "` 在控制台输出 `Enter release version:`。

`read VERSION` 表示从标准输入读取值，并赋值给 $VERSION 变量。

`read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r`，其中 `read -p` 表示给出提示符，后面接着 `Releasing $VERSION - are you sure? (y/n)` 提示符；`-n 1` 表示限定最多可以有 1 个字符可以作为有效读入；`-r` 表示禁止反斜线的转义功能。因为我们的 read 并没有指定变量名，那么默认这个输入读取值会赋值给 `$REPLY` 变量。

`echo` 输出空值表示跳到一个新行，`#` 在 shell 脚本中表示注释。

`if [[ $REPLY =~ ^[Yy]$ ]]` 表示 shell 脚本中的流程控制语句，判断 `$REPLY` 是不是大小写的 `y`，如果满足，则走到后面的 `then` 逻辑。

`echo "Releasing $VERSION ..."`  在控制台输出 `Releasing $VERSION ...`。

`git add -A` 表示把代码所有变化提交到暂存区。

`git commit -m "[build] $VERSION"` 表示提交代码，提交注释是 `[build] $VERSION`。

`npm version $VERSION --message "[release] $VERSION"` 是修改 `package.json` 中的 `version` 字段到 `$VERSION`，并且提交一条修改记录，提交注释是 `[release] $VERSION`。

`git push origin master` 是把代码发布到主干分支。

`npm publish` 是把仓库发布到 `npm` 上，我们会把 `dist` 目录下的代码都发布到 `npm` 上，因为我们在 `package.json` 中配置的是 `files` 是 `["dist"]`。

## 运行部署脚本

接下来我们就运行 `npm run pub` 脚本部署，我们会发现在 `npm run prepub` 阶段，在执行 `tslint  --project tsconfig.json -t codeFrame 'src/**/*.ts' 'test/**/*.ts'` 的时候失败了，原因是我们有代码不符合 lint 规范。原来是 `core/xhr.ts` 文件中 `processCancel` 函数中对 `promise` 的处理，我们没有对异常情况处理，所以我们要给它加上 `catch` 的逻辑：

```typescript
function processCancel(): void {
  if (cancelToken) {
    cancelToken.promise
      .then(reason => {
        request.abort()
        reject(reason)
      })
      .catch(
        /* istanbul ignore next */
        () => {
        // do nothing
      })
  }
}
```

由于我们不会走到 `catch` 逻辑，所以我们给它添加一个注释 `/* istanbul ignore next */` 忽略该代码分支的测试。

然后我们再重新运行 `npm run pub` 逻辑，它会先执行 `test`，然后运行 `build` 编译代码，再执行 `release.sh` 脚本。我们输入了要发布的版本，它就可以完成了整个代码的发布流程。

通过编写部署脚本的一行命令发布的方式，不仅可以用在这种 JS 库，也可以用于我们平时项目开发中，可以大大帮助我们提高生产率，也是前端工程化中必不可少的一个环节，希望同学们都能学会并掌握它。

至此我们完成了项目的部署和发布，我们也可以在 `npm` 官网上看到我们发布的包，下一节课我们来创建一个实际项目，来引用我们开发的 `ts-axios` 库。


