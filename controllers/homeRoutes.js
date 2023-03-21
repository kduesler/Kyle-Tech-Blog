const router = require('express').Router();
const { BlogPost } = require("../models");

router.get('/', (req, res) => {
    // Get all books from the book table
    BlogPost.findAll().then((bookData) => {
      res.json(bookData);
    });
  });

module.exports = router;