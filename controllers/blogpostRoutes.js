const router = require("express").Router();
const withAuth = require("../utils/auth");
const { BlogPost, Comment, User } = require("../models");

router.get("/:id", async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    const blogPost = blogData.get({ plain: true });
    console.log(blogPost);

    res.render("blogpost", {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  "/:id",
  /*withAuth,*/ async (req, res) => {
    try {
      const commentData = await Comment.create({
        ...req.body,
        ...req.body.blog_id,
        user_id: req.session.user_id,
      });
      res.json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
