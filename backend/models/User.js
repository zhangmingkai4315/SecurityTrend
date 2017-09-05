'use strict';
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const utils = require('../utils');
const config = require('../config');
const sequelize = require('../db');

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING(60),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg:__('Email can not be empty')
      },
      isEmail: {
        msg:__('Email is not valid')
      },
      len: [1, 255]
    }  
  },
  password: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    validate: {
      isLongEnough:  (val) => {
        if (val.length < 7) {
          throw new Error(__('You password is too short'));
        }
      }
    }
  },
  username: {
    type: Sequelize.STRING(60)
  },
  password_hash: {
    type: Sequelize.STRING
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
},{
  hooks:{
    beforeCreate:function (user) {
      return new Promise((resolve,reject)=>{
        user.email = user.email.toLowerCase();
        if (user.password) {
          bcrypt.hash(user.get('password'), 10, (err, hash)=> {
            if (err) {
              reject(err);
            }
            user.password_hash = hash;
            resolve();
          });
        }
      });
    }
  }
});

User.prototype.authenticate= function(password){
  const that = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, that.password_hash, function (err, res){
      if(res == true){
        return resolve(that); 
      }else{
        return reject(utils.forbiddenJsonObject(__('Password is not correct')));
      }
    });
  });
};

User.prototype.generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) * config['token_exp'],
      data: data
    }, config['secret'], (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
User.prototype.changePassword =function (password) {
  return new Promise((resolve, reject) => {
    this.set('update_at', new Date());
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      this.set('password_hash', hash);
      this.save()
        .then(()=>resolve())
        .catch((err)=>reject(err));
    });
  });
},
User.prototype.verifyToken=(token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config['secret'], (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
module.exports = User;
