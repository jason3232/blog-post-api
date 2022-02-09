const express = require("express");
const apicache = require('apicache');

const { CustomError, handleError } = require('./errors.js');
const { fetchBlogPosts, sortBlogPosts } = require('./utils.js');
const { validSortBy, validDirection } = require('./constants.js');

const app = express();
const cache = apicache.middleware;

app.use(cache('1 hour'));

app.get("/api/ping", (req, res) => {
    res.status(200).json({ success: true });
});

app.get("/api/posts", async (req, res, next) => {
    let tags = req.query.tags;
    if (tags) {
        tags = tags.split(",");
    } else {
        return next(new CustomError(400, "tag parameter is required"));
    }

    let sortBy = req.query.sortBy || "id";
    if (!validSortBy.includes(sortBy)) {
        return next(new CustomError(400, "sortBy parameter must be one of the following:  " + String(validSortBy)));
    }

    let direction = req.query.direction || 'asc';
    if (!validDirection.includes(direction)) {
        return next(new CustomError(400, "sortBy parameter must be one of the following:  " + String(validDirection)));
    }

    try {
        let posts = await fetchBlogPosts(tags);
        res.status(200).json({ posts: sortBlogPosts(posts, sortBy, direction) });
    } catch (e) {
        // Catch and log error to console for debugging
        console.log(e);
        // Wrap the error before showing to clients
        return next(new CustomError(400, "An Error occured when fetching blog posts"));
    }
});

app.use((err, req, res, next) => {
    handleError(err, res);
})

module.exports = app;
