'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('fucking describe', () => {

  /*it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });*/

  it('bitch', () => {
    return app.httpRequest()
      .get('/')
      // .expect('hi, egg')
      .expect(200);
  });
});
