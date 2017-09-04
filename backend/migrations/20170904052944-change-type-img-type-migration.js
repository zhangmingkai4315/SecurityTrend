'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('trends_type','img_url',{
      type:Sequelize.STRING
    });
  },

  down: function (queryInterface, Sequelize) {
  }
};
