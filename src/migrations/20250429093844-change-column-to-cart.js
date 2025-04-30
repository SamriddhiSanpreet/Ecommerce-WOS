'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Carts', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Registrations', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    queryInterface.changeColumn('Carts', 'product_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Products', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' 
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Carts', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false
    });
    queryInterface.changeColumn('Carts', 'product_id', {
      type: Sequelize.UUID,
      allowNull: false
  });
  }
};
