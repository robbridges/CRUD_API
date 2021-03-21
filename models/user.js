'use strict';
// user database model, all attributes should be validated
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
        isEmail: {
          msg: 'Please provide a properly formatted email address ex: test@test.com'
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
        
      },
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  // many to one aassociation between a user and the course
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
      }
    });
  }
  
  return User;
};
