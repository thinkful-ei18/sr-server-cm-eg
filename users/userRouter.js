'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./userModel');


// USER ENDPOINTS
router.get('/users', (req, res) => {
  User
    .find()
    .limit(5)
    .then(result => {
      let leaderBoard = result.map((user) => {
        return {
          username: user.username,
          score:user.totalscore,
          id:user._id,
          completedSessions:user.sessionsCompleted
        };
      }).sort((a,b) => b.score - a.score);
      res.json(leaderBoard);
    })
    .catch(console.log);
});


router.post('/users', (req,res,next) => {
  // Extract required fields from request body and run validation
  let requiredFields = ['username', 'password', 'firstName', 'lastName'];
  const user = {};
  requiredFields.forEach(field => {
    if (!req.body) {
      const err = new Error();
      err.message = 'No request body sent';
      err.status = 400;
      return next(err);
    }

    if (!(field in req.body)) {
      const err = new Error();
      err.message = `Missing ${field} field in request`;
      err.status = 400;
      return next(err);
    }

    if (field === 'password') {

      if (req.body[field].length < 8) {
        const err = new Error();
        err.message = 'Password is not long enough. 8 characters minimum.';
        err.status = 400;
        return next(err);
      }

      if (req.body[field].length !== req.body[field].trim().length) {
        const err = new Error();
        err.message = 'Extra whitespace in password. Please retry and ensure password contains no whitespace';
        err.status = 400;
        return next(err);
      }
    }
    user[field] = req.body[field];
  });

  // Take input password value and replace with hashed password
  user.password = bcrypt.hashSync(user.password,10);

  // Send user to Database
  User.create(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(inconvenience => {
      return next(inconvenience);
    });

});


module.exports = router; 