const router = require("express").Router();
const withAuth = require("../utils/auth");
const { BlogPost } = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    // Find All the blogposts that match the userid
    const postData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);

    const blogPost = blogData.get({ plain: true });
    console.log(blogPost);

    res.render("myblogpost", {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", /*withAuth,*/ async (req, res) => {
  try {
    const postData = await BlogPost.update({
      title: req.body.title,
      contents: req.body.contents,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
