'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('./userModel');

router.get('/users', (req, res) => {
  User
    .find()
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

module.exports = router; 