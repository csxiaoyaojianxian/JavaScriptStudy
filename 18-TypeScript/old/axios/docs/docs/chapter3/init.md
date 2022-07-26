# 初始化项目

## 创建代码仓库

接下来，我们开始初始化项目，首先我们先去 GitHub 上创建一个 repo，填好 repo 名称，以及写一下 README，对项目先做个简单的描述。

通常我们初始化一个项目，需要配置一大堆东西，比如 `package.json`、`.editorconfig`、`.gitignore` 等；还包括一些构建工具如 `rollup`、`webpack` 以及它们的配置。

当我们使用 TypeScript 去写一个项目的时候，还需要配置 TypeScript 的编译配置文件 `tsconfig.json` 以及
`tslint.json` 文件。

这些茫茫多的配置往往会让一个想从零开始写项目的同学望而却步，如果有一个脚手架工具帮我们生成好这些初始化文件该多好。好在确实有这样的工具，接下来我们的主角 `TypeScript library starter` 隆重登场。

## TypeScript library starter

它是一个开源的 TypeScript 开发基础库的脚手架工具，可以帮助我们快速初始化一个 TypeScript 项目，我们可以去它的[官网地址](https://github.com/alexjoverm/typescript-library-starter)学习和使用它。

### 使用方式

```bash
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios

npm install
```

先通过 `git clone` 把项目代码拉下来到我们的 `ts-axios` 目录，然后运行 `npm install` 安装依赖，并且给项目命名，我们仍然使用 `ts-axios`。

安装好依赖后，我们先来预览一下这个项目的目录结构。

### 目录文件介绍

`TypeScript library starter` 生成的目录结构如下：

```
├── CONTRIBUTING.md
├── LICENSE 
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── src // 源码目录
├── test // 测试目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件
└── tslint.json // TypeScript lint 文件
```

### 优秀工具集成

使用 `TypeScript library starter` 创建的项目集成了很多优秀的开源工具：

- 使用 [RollupJS](https://rollupjs.org/) 帮助我们打包。
- 使用 [Prettier](https://github.com/prettier/prettier) 和 [TSLint](https://palantir.github.io/tslint/) 帮助我们格式化代码以及保证代码风格一致性。
- 使用 [TypeDoc](https://typedoc.org/) 帮助我们自动生成文档并部署到 GitHub pages。
- 使用 [Jest](https://jestjs.io/)帮助我们做单元测试。
- 使用 [Commitizen](https://github.com/commitizen/cz-cli)帮助我们生成规范化的提交注释。
- 使用 [Semantic release](https://github.com/semantic-release/semantic-release)帮助我们管理版本和发布。
- 使用 [husky](https://github.com/typicode/husky)帮助我们更简单地使用 git hooks。
- 使用 [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog)帮助我们通过代码提交信息自动生成 change log。

这里我们列举了很多工具，感兴趣的同学们可以点开他们的链接对这些工具做进一步学习。

### Npm Scripts

`TypeScript library starter` 同样在 `package.json` 中帮我们配置了一些 `npm scripts`，接下来我们先列举一下我们开发中常用的 `npm scripts`，剩余的我们在之后学习中遇到的时候再来介绍。

 - `npm run lint`: 使用 TSLint 工具检查 `src` 和 `test` 目录下 TypeScript 代码的可读性、可维护性和功能性错误。
 - `npm start`: 观察者模式运行 `rollup` 工具打包代码。
 - `npm test`: 运行 `jest` 工具跑单元测试。
 - `npm run commit`: 运行 `commitizen` 工具提交格式化的 `git commit` 注释。
 - `npm run build`: 运行 `rollup` 编译打包 TypeScript 代码，并运行 `typedoc` 工具生成文档。
 
## 关联远程分支
 
 代码已经初始化好，接下来我们要把当前代码仓库关联我们的远程仓库，首先在命令行中运行命令查看远程分支：
 
```bash
git remote -v
```

这里我们不会得到任何输出，因为我们还没有关联远程分支，我们先去 GitHub 上找到我们仓库的地址，在命令行运行：

```bash
git remote add origin 仓库地址
```

关联后，远程库的名字就是 `origin`，这是 `Git` 默认的叫法，也可以改成别的，但是 `origin` 这个名字一看就知道是远程库。

接着你就可以继续运行 `git remote -v` 查看关联结果了。

### 拉取代码

运行如下命令从远程仓库拉取 master 分支代码并合并：

```bash
git pull origin master
```

这个时候会报错：

```bash
error: The following untracked working tree files would be overwritten by merge:
	README.md
Please move or remove them before you merge.
Aborting
```

因为我们在使用 `typescript library starter` 初始化代码的时候也创建了 `README.md`，和远程仓库的 `README.md` 冲突了。我们把 `README.md` 文件删除，再次运行：

```bash
git pull origin master
```

这次代码就拉取成功了，并且在本地也创建了一个 `master` 分支。 

 
### 提交代码

最后我们来提交代码，首先运行：

```bash
git add .
```
把提交的代码从工作区添加到暂存区，然后运行 `npm run commit` 这个 `npm` 脚本来提交代码，运行后它会依次询问你几个问题，比如你这次修改的范围包括哪些、提交的描述、是否有 break change、影响了哪些 issue 等等。

填写完毕，工具会帮我们运行 `git commit` 并且自动把我们提交的信息合成一条提交注释。接着运行命令把代码推送到远程 git 仓库中：

```bash
git push origin master
```

接着我们去 GitHub 仓库中就可以看到刚才这条提交记录了。

至此，我们项目已经初始化完毕，接下来我们就开始编写源码实现 axios 了。


