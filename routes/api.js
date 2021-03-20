const express = require('express');
const router = express.Router();
const {User, Course} = require('../models');
const {asyncHandler} = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/user-auth');

// should return authenticated user
router.get('/users',  asyncHandler(async (req, res) => {
  const users = await User.findAll();
  
  res.json(users);
}));
// returns all courses
router.get('/courses', asyncHandler(async (req, res) => {

    const courses = await Course.findAll({  
      });
  res.json(courses);
}));
// adds user to the database
router.post('/users', asyncHandler(async (req, res) => {
  let user = await User.create(req.body);
  res.json(user);
}));


module.exports = router;