'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Registrations', 'phone', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Registrations', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
