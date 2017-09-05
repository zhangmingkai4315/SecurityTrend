'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db');
const TrendsType = require('./trends_type');
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
  type_id: {
    type: Sequelize.INTEGER,
    references: {
      model: TrendsType,
      key: 'id',
    }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
Trends.belongsTo(TrendsType, { foreignKey: 'type_id', as: 'Type'});
TrendsType.hasMany(Trends);
module.exports = Trends;