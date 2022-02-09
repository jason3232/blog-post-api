const nock = require('nock');

const { fetchBlogPosts, sortBlogPosts } = require('../src/utils.js');
const { sampleSort, sampleFetch, sampleFetchMultipleTags } = require('./sampleData');

describe('fetchBlogPosts', () => {
    it('fetch with unused tag should return empty response', async () => {
        nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=foo')
        .reply(200, { posts: [] });

        const posts = await fetchBlogPosts(['foo']);
        expect(posts).toHaveLength(0);
    })

    it('fetch with sample tag should match sample data', async () => {
        nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, sampleFetch);

        const posts = await fetchBlogPosts(['tech']);
        expect(posts).toEqual(sampleFetch.posts);
    })

    it('fetch with multiple tags should match sample data', async () => {
        nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, sampleFetchMultipleTags);
        nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=history')
        .reply(200, sampleFetchMultipleTags);

        const posts = await fetchBlogPosts(['history', 'tech']);
        expect(posts).toEqual(sampleFetchMultipleTags.posts);
    })
})

describe('sortBlogPosts', () => {
    it('sort with sample parameter should match sample data', async () => {
        expect(sortBlogPosts(sampleFetchMultipleTags.posts, 'likes', 'desc')).toEqual(sampleSort.posts);
    })
})