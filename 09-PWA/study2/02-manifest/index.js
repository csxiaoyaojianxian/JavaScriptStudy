(function() {
    /**
     * 生成列表卡片（dom元素）
     * @param {Object} movie 相关数据
     */
    function createCard(movie) {
        var li = document.createElement('li');
        // var img = document.createElement('img');
        var title = document.createElement('div');
        var genres = document.createElement('div');
        var desc = document.createElement('div');
        var casts = document.createElement('span');
        title.className = 'title';
        genres.className = 'genres';
        desc.className = 'desc';
        // img.src = movie.image;
        title.innerText = movie.title;
        genres.innerText = movie.genres.join(', ');
        casts.innerText = movie.casts.map((ele) => { return ele.name }).join(',');
        movie.casts && desc.appendChild(casts);
        // li.appendChild(img);
        li.appendChild(title);
        li.appendChild(genres);
        li.appendChild(desc);

        return li;
    }

    /**
     * 根据获取的数据列表，生成展示列表
     * @param {Array} list 列表数据
     */
    function fillList(list) {
        list.forEach(function (movie) {
            var node = createCard(movie);
            document.querySelector('#js-list').appendChild(node);
        });
    }

    /**
     * 控制tip展示与显示的内容
     * @param {string | undefined} text tip的提示内容
     */
    function tip(text) {
        if (text === undefined) {
            document.querySelector('#js-tip').style = 'display: none';
        }
        else {
            document.querySelector('#js-tip').innerHTML = text;
            document.querySelector('#js-tip').style = 'display: block';
        }
    }

    /**
     * 控制loading动画的展示
     * @param {boolean | undefined} isloading 是否展示loading
     */
    function loading(isloading) {
        if (isloading) {
            tip();
            document.querySelector('#js-loading').style = 'display: block';
        }
        else {
            document.querySelector('#js-loading').style = 'display: none';
        }
    }
    
    /**
     * 根据用户输入结果
     * 使用XMLHttpRequest查询并展示数据列表
     */
    function queryMovie() {
        var input = document.querySelector('#js-search-input');
        var query = input.value;
        var url = `https://api.douban.com/v2/movie/search?q=${query}&fields=id,title,image,author,publisher,price&count=10`
        /*
        var xhr = new XMLHttpRequest();
        // var url = '/movie?q=' + query + '&fields=id,title,image,author,publisher,price';
        if (query === '') {
            tip('请输入关键词');
            return;
        }
        document.querySelector('#js-list').innerHTML = '';
        document.querySelector('#js-thanks').style = 'display: none';
        loading(true);
        xhr.timeout = 60000;
        xhr.onreadystatechange = function () {
            var response = {};
            if (xhr.readyState === 4 && xhr.status === 200) {
                loading(false);
                try {
                    response = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    response = xhr.responseText;
                }
                tip();
                if (response.subjects.length === 0) {
                    tip('无结果');
                }
                else {
                    input.blur();
                    fillList(response.subjects);
                    document.querySelector('#js-thanks').style = 'display: block';
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
        */
        $.ajax({
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            type : "post",
            url : url,
            cache : false, //默认值true
            dataType : "jsonp",
            jsonp: "callback", // 必须，返回的响应需要以此为前缀
            success : function(data){
                tip();
                if (data.subjects.length === 0) {
                    tip('无结果');
                }
                else {
                    input.blur();
                    fillList(data.subjects);
                    document.querySelector('#js-thanks').style = 'display: block';
                }
            }
        });
    }

    /**
     * 监听“搜索”按钮点击事件
     */
    document.querySelector('#js-search-btn').addEventListener('click', function () {
        queryMovie();
    });

    /**
     * 监听“回车”事件
     */
    window.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            queryMovie();
        }
    });
})();