# Jest 安装和配置

## Jest 安装

由于我们的项目是使用 `typescript-library-starter` 初始化的，已经内置了 Jest 的安装，但是安装的版本却不是最新的，我们可以对 `package.json` 中的相关依赖版本做修改，重新安装。

```json
{
  "@types/jest": "^24.0.13",
  "jest": "^24.8.0",
  "jest-config": "^24.8.0",
  "ts-jest": "^24.0.2",
  "typescript": "^3.4.5"
}
```

> 注意，这里都是目前最新的版本，未来如果有版本升级的话，可以自行更新到最新版本。

更改版本后，在命令行再次执行 `npm install` 即可安装到相应版本。

## Jest 配置

在 `package.json` 文件中有 `jest` 字段，对应 Jest 配置：

```json
"jest": {
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testEnvironment": "jsdom",
  "testRegex": "/test/.*\\.(test|spec)\\.(ts)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  "collectCoverageFrom": [
    "src/*.{js,ts}",
    "src/**/*.{js,ts}"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/test/boot.ts"
  ]
},
```

接下来，我们就分别来看这几个配置的含义。

- [transform](https://jestjs.io/docs/en/configuration#transform-object-string-string)

简单地说就是一种转换器配置，比如我们这里的 

```json
"transform": {
  ".(ts|tsx)": "ts-jest"
},
```

表示的就是使用 `ts-jest` 工具把 `.ts` 和 `.tsx` 文件内容转换成 JavaScript，因为我们也是使用 TypeScript 编写测试代码，而 Node.js 是不能直接支持 TypeScript 的，所以需要配置转换器。

- [testEnvironment](https://jestjs.io/docs/en/configuration#testenvironment-string)

测试环境。

```json
"testEnvironment": "jsdom"
```

表示它是一个类浏览器的测试环境，我们可以使用浏览器环境中的一些 API。

- [testRegex](https://jestjs.io/docs/en/configuration#testregex-string-array-string)

要测试文件的正则表达式。
 
```json
"testRegex": "/test/.*\\.(test|spec)\\.(ts)$"
``` 
 
表示 `test` 目录下所有以 `.test.ts` 和 `.spec.ts` 的文件都需要跑测试。

- [moduleFileExtensions](https://jestjs.io/docs/en/configuration#modulefileextensions-array-string)

模块文件扩展名，当你去引入一个模块并没有指定扩展名的时候，它会依次尝试去添加这些扩展名去找你引入的模块文件。

```json
"moduleFileExtensions": [
  "ts",
  "tsx",
  "js"
]
```

表示优先找 `.ts` 的模块、然后是 `.tsx`，最后是 `.js`。

- [coverageThreshold](https://jestjs.io/docs/en/configuration#coveragethreshold-object)

测试覆盖率的阈值设定，当我们的测试覆盖率达不到阈值的时候，测试会失败。

```json
"coverageThreshold": {
  "global": {
    "branches": 90,
    "functions": 95,
    "lines": 95,
    "statements": 95
  }
}
```

表示全局的代码分支覆盖率要达到 `90%`，方法覆盖率要达到 `95%`，代码行数覆盖率达到 `95%`，声明覆盖率达到 `95%`。

- [collectCoverageFrom](https://jestjs.io/docs/en/configuration#collectcoveragefrom-array)

收集指定文件的测试覆盖率(即使你没为这些文件编写测试)，它的值为 [glob patterns](https://github.com/jonschlinkert/micromatch) 类型。

```json
"collectCoverageFrom": [
  "src/*.{js,ts}",
  "src/**/*.{js,ts}"
]
```

表示收集 `src` 目录以及它的所有子目录中的 `js` 和 `ts` 文件的测试覆盖率。


- [setupFilesAfterEnv](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array)

测试框架安装后立即执行的代码文件列表。

```json
"setupFilesAfterEnv": [
  "<rootDir>/test/boot.ts"
]
```

表示每次跑具体测试代码之前会先运行 `<rootDir>/test/boot.ts` 中的代码，`<rootDir>` 表示当前项目的根目录。这个配置在之后的章节我们会具体介绍。

其他关于 Jest 的配置，感兴趣的同学可以去[官网](https://jestjs.io/docs/en/configuration)做扩展学习。

至此，我们学习了 Jest 的安装和配置，下节课我们就开始编写 `ts-axios` 库的单元测试。






