var express = require('express');
var utils = require('../utils');
var Trends = require('../models/Trends');
var __ = global.__;
var router = express.Router();
router.get('/', (req, res) => {
  Trends.findAll({}, { raw: true })
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
  Trends.findOne({ where: { id: req.params.id } }, { raw: true })
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

router.post('/', (req, res) => {
  let title = req.body.title;
  if (title) {
    Trends.create(req.body)
      .then(function () {
        return res.json(utils.customJsonObject(__('Create trend type success'), null, 201));
      }).catch(function (error) {
        utils.errorSelector(error, res);
      });
  } else {
    return res.json(utils.postDataNotCorrectJsonObject(__('Trends title can not be empty')));
  }
});

router.put('/:id', (req, res) => {
  Trends.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        res.status(200).json(utils.dataJsonObject(__('Update success')));
      } else {
        res.status(404).json(utils.notFoundJsonObject());
      }
    })
    .catch(() => {
      res.status(500).json(utils.serverFailJsonObject());
    });
});

router.delete('/:id', (req, res) => {
  Trends.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        res.status(200).json(utils.dataJsonObject(__('Delete success')));
      } else {
        res.status(404).json(utils.notFoundJsonObject());
      }
    })
    .catch(err => {
      res.status(500).json(utils.serverFailJsonObject(err.name));
    });
});
module.exports = router;