var express = require('express');
var router = express.Router();
var utils = require('../utils');
var User = require('../models/user')
/* GET users listing. */
router.get('/', (req, res, next)=> {
  User.findAll({},{raw:true})
      .then(function(users){
        if(users){
          res.json(utils.dataJsonObject(users));
        }else{
          res.send(404, utils.notFoundJsonObject())
        }
      })
      .catch(function(error){
        res.send(500, utils.serverFailJsonObject())
      })
});

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  User.findOne({}, { raw: true })
    .then(function (users) {
      if (users) {
        res.json(utils.dataJsonObject(users));
      } else {
        res.send(404, utils.notFoundJsonObject())
      }
    })
    .catch(function (error) {
      res.send(500, utils.serverFailJsonObject())
    })
});
// POST users to create a new user

router.post('/',(req,res,next)=>{
  let email = req.body.email;
  let password = req.body.password;
  let password_confirm = req.body.password_confirm;
  if(password !== password_confirm ){
    res.status(400).json(utils.postDataNotCorrectJsonObject('the confirmed password not equal to the password'))
    return 
  }
  User.create({'email':email,'password':password})
      .then(function(user){
        return user.generateToken()
      }).then((token)=>{
        res.status(201).json(utils.customJsonObject({
          message: 'create user success',
          token: token
        }, null, 201))
      }).catch(function(error){
        console.log(error)
        if ('SequelizeUniqueConstraintError' === error.name){
          res.status(400).json(utils.postDataNotCorrectJsonObject('email already exist'))
        } else if ('SequelizeValidationError' === error.name){
          res.status(400).json(utils.postDataNotCorrectJsonObject('validate error'))
        }else{
          res.status(500).json(utils.serverFailJsonObject('create use fail'))
        }
      })
})

router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({where: { email: email }})
    .then(function (user) {
      if (user){
        return user.authenticate(password,user.password_hash)
      }else{
        throw { error: 'user not exist', code: 404 }
      }
    }).then((user)=>{
        return user.generateToken(user.toJSON())
    }).then((token)=>{
       res.status(200).json(utils.dataJsonObject({ token: token }))
    }).catch(function (error) {
       if(error && error.code){
         res.status(error.code).json(utils.customJsonObject(null,error.error,error.code))
       }else{
         res.status(500).json(utils.serverFailJsonObject())
       }
    })
});

// router.put()

router.put('/:id', (req, res) => {
  User.update(req.body,{ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        res.status(200).json(utils.dataJsonObject('update success'))
      } else {
        res.status(404).json(utils.notFoundJsonObject())
      }
    })
    .catch(() => {
      res.status(500).json(utils.serverFailJsonObject())
    })
})

router.put('/:id/password', (req, res) => {
  let old_password = req.body.old_password;
  let password = req.body.password;
  User.findOne({ where: { id: req.params.id } })
    .then(function (user) {
      if (user) {
        console.log(old_password)
        return user.authenticate(old_password)
      } else {
        throw { error: 'user not exist', code: 404 }
      }
    })
    .then(function (user) {
      return user.changePassword(password)
    }).then(()=>{
        res.status(200).json(utils.dataJsonObject('change password success')) 
    }).catch(function(error){
        if (error&&error.code){
          res.status(error.code).json(error)
        }else{
          res.status(500).json(utils.serverFailJsonObject())
        }
       
    })
})

router.delete('/:id',(req,res)=>{
  User.destroy({where:{id:req.params.id}})
      .then((data)=>{
        if(data){
          res.status(200).json(utils.dataJsonObject('delete success'))
        }else{
          res.status(404).json(utils.notFoundJsonObject())
        }
      })
      .catch(err=>{
        res.status(500).json(utils.serverFailJsonObject())
      })
})



module.exports = router;
