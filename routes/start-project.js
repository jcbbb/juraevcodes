const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('start-project');
});

module.exports = router;
