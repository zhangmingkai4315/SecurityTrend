'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db');
const TrendsType = require('./TrendsType');

const __ = global.__;

const Trends = sequelize.define('trends', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: __('Trends title can not be empty')
      },
      len: [1, 255]
    }  
  },
  short_description: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  url: {
    type: Sequelize.STRING
  },
  img_url: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  pageview:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
}, { freezeTableName: true});
Trends.belongsTo(TrendsType, { foreignKey: 'type_id'});

Trends.prototype.addPageView = function(){
  this.pageview = this.pageview+1;
  return this.save();
};

module.exports = Trends;