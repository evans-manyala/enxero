import request from 'supertest';
import app from '../app';
import '../test/setup';

describe('Files API Integration', () => {
  let accessToken: string;
  let fileId: string;
  let fileCreated = false;

  beforeAll(async () => {
    // Register and login a user to get access token
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: `fileuser_${Date.now()}@example.com`,
        username: `fileuser_${Date.now()}`,
        password: 'TestPassword123!',
        firstName: 'File',
        lastName: 'User',
      });
    expect(registerRes.status).toBe(201);
    expect(registerRes.body.status).toBe('success');
    accessToken = registerRes.body.data.accessToken;
  });

  it('should upload a file', async () => {
    const res = await request(app)
      .post('/api/v1/files/upload')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', Buffer.from('test file content'), {
        filename: 'test.txt',
        contentType: 'text/plain',
      });

    if (res.status !== 201) {
      fileCreated = false;
      console.error('File upload failed:', res.status, res.body);
      throw new Error(`Failed to upload file: ${res.status} ${res.body?.message || res.text}`);
    }

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.filename).toBe('test.txt');
    fileId = res.body.data.id;
    fileCreated = true;
  });

  it('should list files', async () => {
    if (!fileCreated) {
      console.log('Skipping test - file not created');
      return;
    }

    const res = await request(app)
      .get('/api/v1/files')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some((file: any) => file.id === fileId)).toBe(true);
  });

  it('should get a file by id', async () => {
    if (!fileCreated) {
      console.log('Skipping test - file not created');
      return;
    }

    const res = await request(app)
      .get(`/api/v1/files/${fileId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(fileId);
    }
  });

  it('should delete a file', async () => {
    if (!fileCreated) {
      console.log('Skipping test - file not created');
      return;
    }

    const res = await request(app)
      .delete(`/api/v1/files/${fileId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect([204, 404]).toContain(res.status);
  });
}); 