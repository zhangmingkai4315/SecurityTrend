const express = require('express');
const utils = require('../utils');
const Trends = require('../models/Trends');
const TrendsType = require('../models/TrendsType');
const errors = require('../errors');

const __ = global.__;
const router = express.Router();
router.get('/', (req, res) => {
  const page = req.query.page || 1;
  const type_id = req.query.type_id||0;
  Trends.findAll({
    where:{
      type_id: type_id === 0? {$gt: 0}:type_id ,
    },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: 10,
    offset: (page - 1) * 10,
    include:[TrendsType]
  }, {
    raw: true
  })
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

router.put('/:id/pageview', (req, res) => {
  Trends.findOne({ where: { id: req.params.id } })
    .then( trend => {
      if (trend) {
        return trend.addPageView();
      } else {
        res.status(404).json(utils.notFoundJsonObject());
        throw errors.StopProcessError;
      }
    }).then(()=>{
      res.status(200).json(utils.dataJsonObject(__('Update success')));
    })
    .catch((err) => {
      if(err.message === errors.StopProcessError.message){
        return;
      }
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