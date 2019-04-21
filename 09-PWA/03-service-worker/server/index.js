/**
 * @file index.js
 */

let path = require('path');
let express = require('express');
let fs = require('fs');

let app = express();
let port = 8080;

let movies = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, '/movies.json'),
        {
            encoding: 'utf-8'
        }
    )
);

/**
 * Shuffles array in place. ES6 version
 *
 * @param {Array} a items An array containing the items.
 * @return {Array} shuffled array
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// 静态资源响应
app.use(express.static('public'));

// 首页 html 响应
app.get('/', function (req, res) {
    res.sendFile('index.html', {root: 'public'});
});

// 电影列表数据接口
app.get('/api/movies', function (req, res) {
    shuffle(movies.subjects);
    res.json(movies);
});

// 启动服务器
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
