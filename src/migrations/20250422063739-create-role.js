'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      name: {
        type: Sequelize.ENUM('admin', 'seller', 'user'), 
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};