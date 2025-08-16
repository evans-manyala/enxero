import request from 'supertest';
import app from '../app';
import '../test/setup';

describe('Notifications API Integration', () => {
  let accessToken: string;
  let notificationId: string;
  let userId: string;

  beforeAll(async () => {
    // Register and login a user to get access token and userId
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: `notificationuser_${Date.now()}@example.com`,
        username: `notificationuser_${Date.now()}`,
        password: 'TestPassword123!',
        firstName: 'Notification',
        lastName: 'User',
      });
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.status).toBe('success');
    accessToken = registerRes.body.data.accessToken;
    userId = registerRes.body.data.user.id;
  });

  it('should send a notification', async () => {
    const res = await request(app)
      .post('/api/v1/notifications/send')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        type: 'info',
        message: 'Test notification',
        data: { foo: 'bar' },
      });
    expect([200, 201]).toContain(res.status);
    expect(res.body.status).toBe('success');
    expect(res.body.data.message).toBe('Test notification');
    notificationId = res.body.data.id;
  });

  it('should list notifications', async () => {
    const res = await request(app)
      .get('/api/v1/notifications')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some((n: any) => n.id === notificationId)).toBe(true);
  });

  it('should mark a notification as read', async () => {
    const res = await request(app)
      .patch(`/api/v1/notifications/${notificationId}/read`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect([200, 204]).toContain(res.status);
  });

  it('should delete a notification', async () => {
    const res = await request(app)
      .delete(`/api/v1/notifications/${notificationId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(204);
  });
}); 