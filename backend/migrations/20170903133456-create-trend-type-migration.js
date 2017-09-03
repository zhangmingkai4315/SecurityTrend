'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('trends_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.TEXT
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('trends_type');
  }
};
