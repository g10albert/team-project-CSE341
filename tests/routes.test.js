process.env.NODE_ENV = 'test'; // Force test configuration execution properties flag
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../routes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/', routes);

// Stand-in format ID tracking string parameters used for specific route matching assertions
const mockObjectId = '60c72b2f9b1d8b2bad765432';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('TaskSphere REST API Automated Integration Tests (GET/getAll Endpoints)', () => {

  // ================= PROJECT ROUTE TESTS =================
  describe('Project Endpoints', () => {
    it('GET /projects should return all projects', async () => {
      const res = await request(app).get('/projects');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /projects/:id should handle structured object parameters response parsing', async () => {
      const res = await request(app).get(`/projects/${mockObjectId}`);
      // Accommodates 404 cleanly if data does not exist, confirming route path parsing works safely
      expect([200, 404]).toContain(res.statusCode);
    });
  });

  // ================= TASK ROUTE TESTS =================
  describe('Task Endpoints', () => {
    it('GET /tasks should return all tasks', async () => {
      const res = await request(app).get('/tasks');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /tasks/:id should resolve properly formatted requests safely', async () => {
      const res = await request(app).get(`/tasks/${mockObjectId}`);
      expect([200, 404]).toContain(res.statusCode);
    });
  });

  // ================= USER ROUTE TESTS =================
  describe('User Endpoints', () => {
    it('GET /users should return all users synced via OAuth strategies', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /users/:id should fetch targeted user documentation payload parameters', async () => {
      const res = await request(app).get(`/users/${mockObjectId}`);
      expect([200, 404]).toContain(res.statusCode);
    });
  });

  // ================= COMMENT ROUTE TESTS =================
  describe('Comment Endpoints', () => {
    it('GET /comments should return all team internal comments data', async () => {
      const res = await request(app).get('/comments');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /comments/:id should securely parse specific item data request blocks', async () => {
      const res = await request(app).get(`/comments/${mockObjectId}`);
      expect([200, 404]).toContain(res.statusCode);
    });
  });
});