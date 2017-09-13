'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db');
const __ = global.__;
const TrendsType = sequelize.define('trends_type', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
    validate: {
      notEmpty: {
        msg: __('Trends type\'s title can not be empty')
      },
      len: [1, 255]
    }
  },
  description: {
    type: Sequelize.STRING
  },
  img_url: {
    type: Sequelize.STRING
  }
},{
  freezeTableName: true,
  timestamps: false
});
module.exports = TrendsType;