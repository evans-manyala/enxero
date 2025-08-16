import request from 'supertest';
import app from '../app';
import '../test/setup';

describe('Auth API Integration', () => {
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  let refreshToken: string;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testEmail,
        username: 'testuser',
        password: testPassword,
        firstName: 'Test',
        lastName: 'User',
      });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
    expect(res.body.data.user.email).toBe(testEmail);
    refreshToken = res.body.data.refreshToken;
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: testPassword,
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
    expect(res.body.data.user.email).toBe(testEmail);
    refreshToken = res.body.data.refreshToken;
  });

  it('should refresh the access token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .send({
        refreshToken,
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
  });
}); 