const express = require('express');
const router = express.Router();
const {User, Course} = require('../models');
const {asyncHandler} = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/user-auth');


router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  
  res.json({
    emailAddress: user.emailAddress,
    name: user.firstName
  })
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
    console.log(error);

  }
}));


module.exports = router;