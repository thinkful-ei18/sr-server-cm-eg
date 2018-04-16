'use strict';
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const createToken = (username,firstname, lastname, userid) => {
  const userInfo = {
    username,
    firstname,
    lastname,
    userid
  };

  return jwt.sign(userInfo, JWT_SECRET);
};


module.exports = createToken;