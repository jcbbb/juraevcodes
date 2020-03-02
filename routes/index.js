const express = require('express');
const projects = require('../public/data/projects.json');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { projects });
});

module.exports = router;
