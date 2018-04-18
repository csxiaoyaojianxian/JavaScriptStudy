const
    request = require('supertest'),
    app = require('../03-hello-koa-http');

describe('#test koa app', () => {

    let server = app.listen(9900);

    describe('#test server', () => {

        it('#test GET /', async () => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, world!</h1>');
        });

        it('#test GET /path?name=Bob', async () => {
            let res = await request(server)
                .get('/path?name=Bob')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, Bob!</h1>');
        });
    });
});