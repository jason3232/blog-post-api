const app = require('../src/api.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Ping API', () => {
    it('GET /api/ping should return 200 suceess', async () => {
        const res = await request.get('/api/ping');
        expect(res.statusCode).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('success');
    });
});

describe('Blog Posts API', () => {
    it('GET /api/posts without tags parameter should return 400 error', async () => {
        const res = await request.get('/api/posts');
        expect(res.statusCode).toEqual(400);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('error');
    });

    it('GET /api/posts with invalid sortBy parameter should return 400 error', async () => {
        const res = await request.get('/api/posts?tags=tech&sortBy=foo');
        expect(res.statusCode).toEqual(400);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('error');
    });

    it('GET /api/posts with invalid direction parameter should return 400 error', async () => {
        const res = await request.get('/api/posts?tags=tech&direction=foo');
        expect(res.statusCode).toEqual(400);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('error');
    });

    it('GET /api/posts with correct parameters should return 200 with json blog posts data', async () => {
        const res = await request.get('/api/posts?tags=tech');
        expect(res.statusCode).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('posts');
    })
})