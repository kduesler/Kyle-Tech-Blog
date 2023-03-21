const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/",  async (req, res) => {
  try {
    const commentData = await Comment.create(req.body, {
      user_id: req.session.user_id,
    });

    res.json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
