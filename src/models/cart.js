'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Registration, { foreignKey: "user_id" });
      Cart.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  Cart.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    product_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }    
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};