const fetch = require("node-fetch");
const { dataSource } = require('./constants.js');

/**
 * Fetch blog posts from the data source
 * @async
 * @param {Array} tags - An array of tags
 * @returns {Promise} A promise that contains a list of posts when fulfilled 
 */
 const fetchBlogPosts = async (tags) => {
    let posts = [];
    let set = new Set();
    await Promise.all(
        tags.map((tag) =>
            fetch(dataSource + tag)
                .then((res) => res.json())
                .then((json) => {
                    for (let post of json.posts) {
                        if (!set.has(post.id)) {
                            set.add(post.id);
                            posts.push(post);
                        }
                    }
                })
        )
    );
    return posts;
};

/**
 * Sort blog posts with the specified parameters
 * @param {Array} posts - An array of posts
 * @param {string} sortBy - Key to sort the posts array with
 * @param {string} direction - Direction to sort the array
 * @returns {Array} An sorted array by the key and direction provided
 */
const sortBlogPosts = (posts, sortBy, direction) => {
    // all valid sorting keys are number values so we can just subtract it
    return posts.sort((a, b) => {
        return direction === 'asc' 
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy]
    });
};

module.exports = {
    fetchBlogPosts,
    sortBlogPosts
}