var express = require('express');
var utils = require('../utils');
var TrendsType = require('../models/trends_type');

var router = express.Router();
router.get('/', (req, res) => {
  TrendsType.findAll({}, { raw: true })
    .then(function (types) {
      if (types) {
        res.json(utils.dataJsonObject(types));
      } else {
        res.send(404, utils.notFoundJsonObject());
      }
    })
    .catch(function (err) {
      res.send(500, utils.serverFailJsonObject(err.message));
    });
});

router.get('/:id', (req, res) => {
  TrendsType.findOne({where:{id:req.params.id}}, { raw: true })
    .then(function (types) {
      if (types) {
        res.json(utils.dataJsonObject(types));
      } else {
        res.send(404, utils.notFoundJsonObject());
      }
    })
    .catch(function (err) {
      res.send(500, utils.serverFailJsonObject(err.message));
    });
});

router.get('/', (req, res) => {
  TrendsType.findAll({}, { raw: true })
    .then(function (types) {
      if (types) {
        res.json(utils.dataJsonObject(types));
      } else {
        res.send(404, utils.notFoundJsonObject());
      }
    })
    .catch(function (err) {
      res.send(500, utils.serverFailJsonObject(err.message));
    });
});

router.get('/', (req, res) => {
  TrendsType.findAll({}, { raw: true })
    .then(function (types) {
      if (types) {
        res.json(utils.dataJsonObject(types));
      } else {
        res.send(404, utils.notFoundJsonObject());
      }
    })
    .catch(function (err) {
      res.send(500, utils.serverFailJsonObject(err.message));
    });
});

router.get('/', (req, res) => {
  TrendsType.findAll({}, { raw: true })
    .then(function (types) {
      if (types) {
        res.json(utils.dataJsonObject(types));
      } else {
        res.send(404, utils.notFoundJsonObject());
      }
    })
    .catch(function (err) {
      res.send(500, utils.serverFailJsonObject(err.message));
    });
});
module.exports = router;