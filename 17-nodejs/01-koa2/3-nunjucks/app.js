/**
 * nunjucks模板引擎
 */
// $ npm install nunjucks --save

const nunjucks = require('nunjucks');

// 模板引擎对象
function createEnv(path, opts) {
    var
        // 给每个参数加上默认值
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        // 创建一个文件系统加载器
        env = new nunjucks.Environment(
            // 从views目录读取模板
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }),{
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html', {
    name: '<Nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
});
console.log(s);

console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));