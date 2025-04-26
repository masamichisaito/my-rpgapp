const request = require('supertest');
const app = require('../app'); // Express アプリケーションのインスタンス

describe('Server Initialization', () => {
  it('should redirect GET / to /rpg/start', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/rpg/start');
  });
});

describe('POST /rpg/start', () => {
  it('should redirect to /rpg/battle when valid name is provided', async () => {
    const res = await request(app)
      .post('/rpg/start')
      .send({ heroName: '勇者' });
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/rpg/battle');
  });

  it('should return 200 and show error when name is missing', async () => {
    const res = await request(app)
      .post('/rpg/start')
      .send({ heroName: '' });
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('名前は必須です');
  });
});
