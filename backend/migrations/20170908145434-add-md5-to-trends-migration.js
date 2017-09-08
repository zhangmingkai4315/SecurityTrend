'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'trends',
      'content_md5',
      {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    );
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn(
      'trends',
      'content_md5'
    );
  }
};
