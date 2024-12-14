const request = require('supertest');
const app = require('../src/app');

describe('Job API Tests', () => {
  it('should fetch all jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
