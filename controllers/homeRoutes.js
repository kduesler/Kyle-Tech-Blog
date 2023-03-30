const router = require('express').Router();
const { BlogPost, User, Comment} = require("../models");

router.get('/', async (req, res) => {
    try {
      // Get all blogs and JOIN with user data
      const blogData = await BlogPost.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
    
      const blogposts = blogData.map((blogpost) => blogpost.get({ plain: true }));
  
      res.render('homepage', { 
        blogposts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

module.exports = router;