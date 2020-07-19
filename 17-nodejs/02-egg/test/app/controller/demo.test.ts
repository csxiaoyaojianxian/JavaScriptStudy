import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

// https://mochajs.org/#usage

describe('test/app/controller/demo.test.ts', () => {
  it('should GET /', async () => {
    const result = await app.httpRequest().get('/').expect(200);
    assert(result.text === `<h1>${app.env}</h1>`);
  });
});
