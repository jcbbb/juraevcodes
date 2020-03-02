const express = require('express');

const router = express.Router();
const services = require('../public/data/services.json');

router.get('/', (req, res) => {
  res.render('services', { services });
});

module.exports = router;
