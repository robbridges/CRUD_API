const express = require('express');
const router = express.Router();
const {User, Course} = require('../models');
const {asyncHandler} = require('../middleware/asyncHandler');

router.get('/users', asyncHandler(async (req, res) => {
  let users = await User.findAll();
  res.json(users);
}));

router.get('/courses', asyncHandler(async (req, res) => {

    const courses = await Course.findAll({  
      });
  res.json(courses);
}));

router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.location('/').status(201).end()
  } catch (error) {
    console.log('ERROR: ', error.name);

  }
}));
router.post('/courses', asyncHandler(async (req, res) => {
  try {
    await Course.create(req.body);
    res.location('/').status(201).end()
  } catch (error) {
    console.log('ERROR: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

module.exports = router;