const express = require('express');
const router = express.Router();
const {User, Course} = require('../models');
const {asyncHandler} = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/user-auth');
const e = require('express');


// should return authenticated user
router.get('/users', authenticateUser,  asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.currentUser);

  
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddress

  })
}));
// returns all courses
router.get('/courses', asyncHandler(async (req, res) => {

    const courses = await Course.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      });
  res.json(courses);
}));

router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [{
        model: User,
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        },
    }],
    attributes: {
        exclude: ['createdAt', 'updatedAt'],
    },
   });
  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404).json({message: "Course not found"});
  }
  


}));


// adds user to the database
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').json();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
    } else {
    res.json(error.message);
    }
    
  }
}));

router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  try {
    await Course.create(req.body);
    res.status(201).location('/').json();
  } catch (error) {
    res.status(400).json(error.message);
    
  }
}));

router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  try {
    if ( course ) {
      if(course.userId === req.currentUser) {
        await course.update(req.body);
        res.status(204).send();
      } else {
        res.status(403).send({ msg: 'Only the owner can update this course.'});
      }
    } else {
      res.status(404).json({message: 'Course not found'});
    } 
  } catch (error) {
    res.status(400).json(error.message);
  } 
}));

router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  try {
    if ( course ) {
      if(course.userId === req.currentUser) {
        await course.destroy();
        res.status(204).send();
      } else {
        res.status(403).send({ msg: 'Only the course owner can delete a course.'});
      }
    } else {
      res.status(404).json({message: 'Course not found'});
    } 
  } catch (error) {
    res.json(error.message);
  } 
}));




module.exports = router;