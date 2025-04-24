'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize'); 

module.exports = (sequelize) => { 
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.Registration, {
        foreignKey: 'roleId',
        as: 'registrations'
      });
    }
  }
  Role.init({
    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    name: { 
      type: DataTypes.ENUM('admin', 'seller', 'user'),
      allowNull: false
    },
    slug: { 
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
