'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION postgis');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('DROP EXTENSION postgis');
  },
};
