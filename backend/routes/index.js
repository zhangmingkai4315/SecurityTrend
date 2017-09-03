var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res) {
  res.json(utils.dataJsonObject({'api':'v1.0'}));
});

module.exports = router;
