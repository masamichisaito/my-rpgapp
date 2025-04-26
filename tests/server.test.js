// tests/server.test.js
const request = require('supertest');
const app = require('../app');

describe('Server Initialization', () => {
  it('should redirect GET / to /rpg/start', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/rpg/start');
  });
});
