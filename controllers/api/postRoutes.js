const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.create({
      ...req.body, 
      user_id: req.session.user_id,
    });

    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
