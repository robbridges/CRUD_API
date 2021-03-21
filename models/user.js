'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a first name',
        },
        notEmpty: {
          msg: 'Please provide a first name',
        },
      },
    },
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a last name',
        },
        notEmpty: {
          msg: 'Please provide a last name',
        },
      },
    },
    emailAddress: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a valid email address',
        },
        notEmpty: {
          msg: 'Please provide a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        const hash = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hash);
      },
      validate: {
        notNull: {
          msg: 'Please provide a valid email address',
        },
        notEmpty: {
          msg: 'Please provide a valid email address',
        },
        isEmail: {
          msg: 'Please provide a properly formatted email address ex: test@test.com'
        },
      },
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull:false,
      }
    });
  }
  
  return User;
};
