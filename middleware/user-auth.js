'use strict';

const auth = require('basic-auth');
const bcrypt = require ('bcrypt');
const e = require('express');
const { User } = require('../models');


exports.authenticateUser = async (req, res, next) => {
  // Parse the user's credentials from the Authorization header.
  let message;
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne( { where: {emailAddress: credentials.emailAddress} } );
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
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

  
  // If the user's credentials are available...
     // Attempt to retrieve the user from the data store
     // by their username (i.e. the user's "key"
     // from the Authorization header).

  // If a user was successfully retrieved from the data store...
     // Use the bcrypt npm package to compare the user's password
     // (from the Authorization header) to the user's password
     // that was retrieved from the data store.

  // If the passwords match...
     // Store the retrieved user object on the request object
     // so any middleware functions that follow this middleware function
     // will have access to the user's information.

  // If user authentication failed...
     // Return a response with a 401 Unauthorized HTTP status code.

  // Or if user authentication succeeded...
     // Call the next() method.
};


