const router = require("express").Router();
const { Post, Comment } = require("../models");
const withAuth = require ('../utils/auth');

// get all posts and include comments
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["contents", "comment_date"],
        },
      ],
    });

    // serialize data so the template engine can read it
    const posts = postData.map((post) => post.get({ plain: true }));
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
router.get('/post/:id', async (rec, req) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["contents", "comment_date"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// prevent access to dashboard unless logged in by using withAuth middleware
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// If the user is logged in redirect them to the home page, if not render login view
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
