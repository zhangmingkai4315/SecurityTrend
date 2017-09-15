const express = require('express');
const router = express.Router();
const utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res) {
  res.json(utils.dataJsonObject({'api':'v1.0'}));
});

module.exports = router;
