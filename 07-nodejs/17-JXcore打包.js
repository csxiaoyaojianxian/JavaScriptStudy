// JXcore 是一个支持多线程的 Node.js 发行版本，基本不需要对现有的代码做任何改动就可以直接线程安全地以多线程运行

// 【 1 下载 】
// $ curl http://jxcore.com/xil.sh | sudo bash
// $ jx --version

// 【 2 打包 】
// 例如，项目包含以下文件，其中 index.js 是主文件：
// drwxr-xr-x  2 root root  4096 Nov 13 12:42 images
// -rwxr-xr-x  1 root root 30457 Mar  6 12:19 index.html
// -rwxr-xr-x  1 root root 30452 Mar  1 12:54 index.js
// drwxr-xr-x 23 root root  4096 Jan 15 03:48 node_modules
// drwxr-xr-x  2 root root  4096 Mar 21 06:10 scripts
// drwxr-xr-x  2 root root  4096 Feb 15 11:56 style

// $ jx package index.js index  # 使用 jx 命令打包以上项目，并指定 index.js 为 Node.js 项目的主文件

// 生成两个文件：
// index.jxp 中间件文件，包含了需要编译的完整项目信息
// index.jx 完整包信息的二进制文件，可运行在客户端上

// 【 3 载入 JX 文件 】
// $ node index.js command_line_arguments  # 使用 jx 命令打包项目
// $ jx index.jx command_line_arguments  # 使用 JXcore 编译后，执行生成的 jx 二进制文件