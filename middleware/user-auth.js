'use strict';

const auth = require('basic-auth');
const bcrypt = require ('bcryptjs');
const { User } = require('../models');

// authenicate user function
exports.authenticateUser = async (req, res, next) => {
  // Parse the user's credentials from the Authorization header.
  let message;
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne( { where: {emailAddress: credentials.name} } );
    if (user) {
      const authenticated = bcrypt
        .compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`The user ${user.emailAddress} is authenticated`);
        
        req.currentUser = user.id; 
      } else {
        message = `Authenticated failed for ${user.emailAddress}`;
      }
    } else {
      message = `We found no such user in the database ${user.firstName} ${user.lastName}`;
    }

  } else {
    message = 'Auth header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied'});
  } else {
    next();
  }


};


