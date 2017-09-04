var express = require('express');
var utils = require('../utils');
var TrendsType = require('../models/TrendsType');

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

router.post('/', (req, res) => {
  let name = req.body.name;
  let description = req.body.description||'';
  let img_url = req.body.img_url||'';
  if(name){
    TrendsType.create({name,description,img_url})
    .then(function(){
      return res.json(utils.customJsonObject('create trend type success',null,201));
    }).catch(function(error){
      utils.errorSelector(error,res);
    });
  }else{
    return res.json(utils.postDataNotCorrectJsonObject('name not exist'));
  }
});

router.put('/:id', (req, res) => {
  TrendsType.update(req.body,{ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        res.status(200).json(utils.dataJsonObject('update success'));
      } else {
        res.status(404).json(utils.notFoundJsonObject());
      }
    })
    .catch(() => {
      res.status(500).json(utils.serverFailJsonObject());
    });
});

router.delete('/:id', (req, res) => {
  TrendsType.destroy({where:{id:req.params.id}})
    .then((data)=>{
      if(data){
        res.status(200).json(utils.dataJsonObject('delete success'));
      }else{
        res.status(404).json(utils.notFoundJsonObject());
      }
    })
    .catch(err=>{
      res.status(500).json(utils.serverFailJsonObject(err.name));
    });
});
module.exports = router;