'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {foreignKey: 'userID'})
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    Lastname: DataTypes.STRING,
    description: DataTypes.STRING,
    profileImg: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    jobTitle: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};