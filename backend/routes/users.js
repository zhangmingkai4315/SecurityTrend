var express = require('express');
var router = express.Router();
var utils = require('../utils');
var User = require('../models/User');
const middleware = require('../middleware');
/* GET users listing. */

router.get('/', middleware.tokenMiddleWare,(req, res)=> {
  User.findAll({},{raw:true})
    .then(function(users){
      if(users){
        res.json(utils.dataJsonObject(users));
      }else{
        res.send(404, utils.notFoundJsonObject());
      }
    })
    .catch(function(){
      res.send(500, utils.serverFailJsonObject());
    });
});

/* GET users listing. */
router.get('/:id', middleware.tokenMiddleWare,(req, res) => {
  User.findOne({where:{id:req.params.id}}, { raw: true })
    .then(function (users) {
      if (users) {
        res.json(utils.dataJsonObject(users));
      } else {
        res.send(404, utils.notFoundJsonObject());
      }
    })
    .catch(function () {
      res.send(500, utils.serverFailJsonObject());
    });
});
// /signup :  create a new user 

router.post('/signup', (req,res)=>{
  let email = req.body.email;
  let password = req.body.password;
  let password_confirm = req.body.password_confirm;
  if(password !== password_confirm ){
    res.status(400).json(utils.postDataNotCorrectJsonObject(__('The confirmed password not equal to the password')));
    return;
  }
  User.create({'email':email,'password':password})
    .then(function(user){
      return user.generateToken();
    }).then((token)=>{
      throw {
        name:'noerror',
        data:{
          message: __('Create user success'),
          token: token
        }
      };
    }).catch(function(error){
      utils.errorSelector(error,res);
    });
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({where: { email: email }})
    .then(function (user) {
      if (user){
        return user.authenticate(password,user.password_hash);
      }else{
        throw { error: __('User not exist'), code: 404 };
      }
    }).then((user)=>{
      return user.generateToken(user.toJSON());
    }).then((token)=>{
      res.status(200).json(utils.dataJsonObject({ token: token }));
    }).catch(function (error) {
      if(error && error.code){
        res.status(error.code).json(utils.customJsonObject(null,error.error,error.code));
      }else{
        res.status(500).json(utils.serverFailJsonObject());
      }
    });
});

// router.put()

router.put('/:id', middleware.tokenMiddleWare, (req, res) => {
  User.update(req.body,{ where: { id: req.params.id } })
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

router.put('/:id/password', middleware.tokenMiddleWare,(req, res) => {
  let old_password = req.body.old_password;
  let password = req.body.password;
  User.findOne({ where: { id: req.params.id } })
    .then(function (user) {
      if (user) {
        return user.authenticate(old_password);
      } else {
        throw { error: __('User not exist'), code: 404 };
      }
    })
    .then(function (user) {
      return user.changePassword(password);
    }).then(()=>{
      res.status(200).json(utils.dataJsonObject(__('Change password success')));
    }).catch(function(error){
      if (error&&error.code){
        res.status(error.code).json(error);
      }else{
        res.status(500).json(utils.serverFailJsonObject());
      }   
    });
});

router.delete('/:id', middleware.tokenMiddleWare, (req,res)=>{
  User.destroy({where:{id:req.params.id}})
    .then((data)=>{
      if(data){
        res.status(200).json(utils.dataJsonObject(__('Delete success')));
      }else{
        res.status(404).json(utils.notFoundJsonObject());
      }
    })
    .catch(err=>{
      res.status(500).json(utils.serverFailJsonObject(err.name));
    });
});



module.exports = router;
