'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
    }
  }
  Order.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    totalPrice: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    paymentMethod: {
      type: Sequelize.ENUM('cod', 'card', 'upi', 'netbanking'),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'),
      defaultValue: 'confirmed'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};