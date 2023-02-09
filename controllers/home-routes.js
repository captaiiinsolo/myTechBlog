const router = require("express").Router();
const { Post, Comment } = require("../models");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const techBlogData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["contents"],
        },
      ],
    });

    // serialize data so the template engine can read it
    const posts = techBlogData.map((post) => post.get({ plain: true }));
    console.log("posts:", posts);
    // pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get post by ID

// Create New Post

// Update post

// Delete post

module.exports = router;
