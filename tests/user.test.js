const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('User API Tests', () => {
  // 테스트 데이터를 설정합니다.
  let token;

  beforeAll(async () => {
    // 사용자 등록
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'testuser@example.com', password: 'password123' });

    // 사용자 로그인
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' });

    token = res.body.token; // 로그인 성공 시 반환된 JWT 토큰 저장
  });

  afterAll(async () => {
    // 테스트 종료 후 MongoDB 연결 해제
    await mongoose.connection.close();
  });

  it('should fetch user profile with valid token', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`); // JWT 토큰을 Authorization 헤더에 포함

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('testuser@example.com');
  });

  it('should return 401 for unauthorized profile access', async () => {
    const res = await request(app).get('/api/auth/profile'); // 토큰 없이 요청

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Access Denied');
  });
});
