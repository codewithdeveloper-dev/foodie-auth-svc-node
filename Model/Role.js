const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Role = sequelize.define('Role', {
  TranId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Roll: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
}, {
  tableName: 'Roles',
  timestamps: false,
});

module.exports = Role;
