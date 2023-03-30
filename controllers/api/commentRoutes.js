const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post(
    "/",
    /*withAuth,*/ async (req, res) => {
      try {
        const commentData = await Comment.create({
          ...req.body,
          ...req.body.blog_id,
          user_id: req.session.user_id,
        });
        console.log(commentData);
        // res.json(commentData);
      } catch (err) {
        res.status(400).json(err);
      }
    }
  );

module.exports = router;