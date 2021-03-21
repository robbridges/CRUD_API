'use strict';
const {
  Model
} = require('sequelize');
module.exports =(sequelize, DataTypes) => {
  class Course extends Model {};
  Course.init({
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a valid course title',
        },
        notEmpty: {
          msg: 'Please provide a valid course title',
        },
      },
     },
    description: { 
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Please provide a valid course description',
        },
        notEmpty: {
          msg: 'Please provide a valid course description',
        },
      }, 
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Course',
  });
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
      }
    });
  }
  
  return Course;
};