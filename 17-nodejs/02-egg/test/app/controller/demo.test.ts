import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

// https://mochajs.org/#usage

describe('test/app/controller/demo.test.ts', () => {
  it('should GET /api/demo testEnv', async () => {
    const result = await app.httpRequest().get('/api/demo').expect(200);
    assert(result.text === `<h1>${app.env}</h1>`);
  });
});
