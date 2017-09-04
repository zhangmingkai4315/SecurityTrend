'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db');
const TrendsType = sequelize.define('trends_type', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
    validate: {
      notEmpty: {
        msg: 'title can not be empty'
      },
      len: [1, 255]
    }
  },
  description: {
    type: Sequelize.STRING
  },
  img_url: {
    type: Sequelize.TEXT
  }
},{
  freezeTableName: true,
  timestamps: false
});
module.exports = TrendsType;