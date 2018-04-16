'use strict';
//================================== Dependencies ============================>
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const {JWT_SECRET} = require('../config');

//================================== Authentication Middleware ============================>

const authenticate = (req,res,next) => {
  // Check if the client has presented an Authorization header. If not, we can outright reject their request. 
  if (req.header && req.get('Authorization')) {

    // Check to see if the client has presented a Bearer Token. If not, reject their request.
    if (req.get('Authorization').split(' ')[0] !== 'Bearer')  {
      const err = new Error();
      err.status = 403;
      err.message = 'Invalid Authorization Header. Expected Bearer';
      return next(err);
    }

    // Now, we extract the token from the header and verify it with the JWT library
    const token = req.get('Authorization').split(' ')[1];
    
    jwt.verify(token, JWT_SECRET)
      .then(info => {
        req.user = info;
        next();
      })
      .catch(err => {
        console.log('hit error block');
        const error = new Error();
        error.status = 403;
        error.message = 'JWT Verification Failed. This token is not valid. Please try renewing';
        next(error);
      });
  } else {
    const err = new Error();
    err.status = 403;
    err.message = 'Not Authorized';
    err.info = 'Either the client presented no Auth token or the Auth Token was invalid. This would likely be resolved by logging out and logging back in.';
    return next(err);
  }
};


app.get('/test', authenticate, (req,res) => {
  res.send('You had authorization');
});


app.listen(8080);