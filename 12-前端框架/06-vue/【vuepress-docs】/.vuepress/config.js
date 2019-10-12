module.exports = {
    base: '/', // 用于部署时的子路径
    title: 'csxiaoyao.com', // 网站的标题
    description: 'luban document, created by victorsun', // 网站描述，HTML中表现为一个 <meta> 标签
    head: [ // head 中额外标签
        // ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    host: '0.0.0.0', // dev 服务器的主机
    port: 2048, // dev 服务器的端口
    dest: './dist', // 指定 vuepress build 的输出目录
    evergreen: false, // 忽略浏览器兼容性
    markdown: {
        lineNumbers: true, // 代码块的左侧显示行号
        externalLinks: { target: '_blank', rel: 'noopener noreferrer' }, // 键和值对将被添加到指向外部链接的 <a> 标签，默认选项将在新窗口中打开外部链接
        anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }, // 锚点配置
        toc: { includeLevel: [1, 2, 3] }, // [[toc]]目录
        config: md => { // 插件
            // md.set({ breaks: true })
            // md.use(require('markdown-it-xxx'))
        }
    },
    themeConfig: {
        nav: [ // 导航栏
            {
                text: '主页',
                link: '/'
            }, {
                text: '菜单',
                items: [{
                    text: '普通菜单',
                    link: '/'
                }, {
                    text: '分组菜单',
                    items: [{
                        text: 'test1',
                        link: '/test1'
                    }, {
                        text: 'test2',
                        link: '/test2'
                    }]
                }]
            }, {
                text: '访问主页',
                link: 'http://www.csxiaoyao.com'
            }
        ],
        // 侧边栏
        sidebar: [
            '/test1',
            ['/test1', '链接到test1'],
            {
                title: '链接到test2',
                collapsable: false,
                children: [
                    '/test1',
                    '/test2',
                ]
            }
        ],
        // 展开所有标题层级
        displayAllHeaders: false,
        // 激活标题链接
        activeHeaderLinks: true, // false 可以提高性能
        // 搜索
        search: true,
        searchMaxSuggestions: 10,
        // 更新时间戳 git
        lastUpdated: '最后更新时间', // string | boolean
        // serviceWorker
        serviceWorker: {
            updatePopup: true, // 弹窗提示更新 Boolean | Object, 默认值是 undefined
            // 如果设置为 true, 默认的文本配置将是: 
            updatePopup: { 
               message: "有内容更新", 
               buttonText: "更新" 
            }
        },
        // 假定 GitHub，也可以是一个完整的 GitLab URL
        repo: 'csxiaoyaojianxian/JavaScriptStudy',
        // 自定义项目仓库链接文字，默认根据 `themeConfig.repo` 中的 URL 来自动匹配是 "GitHub"/"GitLab"/"Bitbucket" 中的哪个，如果不设置时是 "Source"
        repoLabel: '访问仓库',
        // 以下为可选的 "Edit this page" 链接选项，如果你的文档和项目位于不同仓库：
        docsRepo: 'vuejs/vuepress',
        // 如果你的文档不在仓库的根目录下：
        docsDir: 'docs/xxx',
        // 如果你的文档在某个特定的分支（默认是 'master' 分支）：
        docsBranch: 'master',
        // 默认为 false，设置为 true 来启用
        editLinks: true,
        // 自定义编辑链接的文本。默认是 "Edit this page"
        editLinkText: '修改此页'
    }
}