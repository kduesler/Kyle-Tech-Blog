const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", /*withAuth,*/ async (req, res) => {
  try {
    const postData = await BlogPost.create(req.body, {
      user_id: req.session.user_id,
    });

    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', /*withAuth,*/ async (req,res) => {
  try {
    const postData = await BlogPost.update(
      {
        title: req.body.title,
        contents: req.body.contents,
      },
      {
        where: {
          id: req.params.id,
          // user_id: req.session.user_id, 
        },
      }
    )

    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete('/:id', /*withAuth,*/ async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
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
