'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Orders', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Carts', 
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Orders', 'userId', {
      type: Sequelize.UUID,
      allowNull: false
    });
  }
};
