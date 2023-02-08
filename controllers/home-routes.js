const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const techBlogData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['contents'],
                },
            ],
        });

        const posts = techBlogData.map((post) =>
            post.get({ plain: true })
        );
        console.log("posts:", posts)
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});