const express = require('express');
const router = express.Router();
const {User, Course} = require('../models');
const {asyncHandler} = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/user-auth');

// should return authenticated user
router.get('/users', authenticateUser,  asyncHandler(async (req, res) => {
  const user = req.currentUser;

  
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddress

  })
}));
// returns all courses
router.get('/courses', asyncHandler(async (req, res) => {

    const courses = await Course.findAll({  
      });
  res.json(courses);
}));
// adds user to the database
router.post('/users', asyncHandler(async (req, res) => {
  try {
    let user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.json(error);
    console.log(req.body);
  }
}));


module.exports = router;