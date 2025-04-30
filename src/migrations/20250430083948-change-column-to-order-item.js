'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('OrderItems', 'orderId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Orders', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    queryInterface.changeColumn('OrderItems', 'productId', {
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
    queryInterface.changeColumn('OrderItems', 'orderId', {
      type: Sequelize.UUID,
      allowNull: false
    });
    queryInterface.changeColumn('OrderItems', 'productId', {
      type: Sequelize.UUID,
      allowNull: false
    });
  }
};
