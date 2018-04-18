// sign in:

module.exports = {
    'GET /signin': async (ctx, next) => {
        console.log('GET /signin');
    },

    'POST /signin': async (ctx, next) => {
        console.log('POST /signin');
        let name = ctx.request.body.name || 'csxiaoyao';
        let user = {
            name: name
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};