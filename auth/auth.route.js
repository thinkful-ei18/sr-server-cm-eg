'use strict';
const express = require('express');
const User = require('../users/userModel');
const router = express.Router();
const createToken = require('./createToken');
//================================== Login Route ====================>

router.post('/auth', (req,res,next) => {
  let requiredFields = ['username','password'];

  let loginInfo = {};
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const err = new Error();
      err.status = 400;
      err.message = `Missing ${field} field in request`;
      return next(err);
    }

    loginInfo[field] = req.body[field];
  });

  User.findOne({'username': loginInfo.username})
    .then(dbresults => {
      if (!dbresults) {
        const err = new Error();
        err.message = 'User could not be found';
        err.status = 400;
        return next(err);
      }
      dbresults.validatePassword(loginInfo.password)
        .then(validationResult => {
          if (validationResult) {
            let authToken = createToken(dbresults.username, dbresults.firstName, dbresults.lastName, dbresults.id);
            res.json({authToken});
          } else {
            const err = new Error();
            err.message = 'Credentials not Recognized.';
            err.status = 400;
            return next(err);
          }
        });
    })
    .catch(err => {
      return next(err);
    });

});


module.exports = router;