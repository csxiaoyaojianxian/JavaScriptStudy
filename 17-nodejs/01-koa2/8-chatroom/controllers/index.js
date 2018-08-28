
module.exports = {
    'GET /': async (ctx, next) => {
        let user = ctx.state.user;
        if (user) {
            console.log("response GET / : " + user);
        } else {
            ctx.response.redirect('/signin');
        }
    }
};