var fn_index = async (ctx, next) => {
    ctx.response.body = `
        <h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="csxiaoyao"></p>
            <p>Password: <input name="password" type="password" value="19931128"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'csxiaoyao' && password === '19931128') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};