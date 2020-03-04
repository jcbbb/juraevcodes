const express = require('express');

const router = express.Router();

const services = require('../public/data/project-services.json');
const structures = require('../public/data/website-structure.json');

router.get('/', (req, res) => {
  res.render('start-project', { services, structures });
});

module.exports = router;
