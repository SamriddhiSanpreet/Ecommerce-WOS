'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'brand', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'color', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'size', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'material', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'brand');
    await queryInterface.removeColumn('Products', 'color');
    await queryInterface.removeColumn('Products', 'size');
    await queryInterface.removeColumn('Products', 'material');
  }
};
