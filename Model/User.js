const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./Role')

const User = sequelize.define('Userlist', {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserName: {
    type: DataTypes.STRING(100),
  },
  Email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  RollId: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
    references: {
      model: Role,
      key: 'TranId',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Userlist',
  timestamps: false,
});

User.belongsTo(Role, { foreignKey: 'RollId' });

module.exports = User;
