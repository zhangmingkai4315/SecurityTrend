var express = require('express');
var utils = require('../utils');
var router = express.Router();
router.get('/',(req,res)=>{
  res.json(utils.dataJsonObject([]))
})
module.exports = router