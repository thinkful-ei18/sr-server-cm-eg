'use strict';
//============================ Import Dependencies ===============>

const chai = require('chai');
const chaiHttp = require('chai-http');

const {TEST_DATABASE_URL} = require('../config');
const {dbConnect, dbDisconnect} = require('../db-mongoose');
const {runServer} = require('../index');
const mongoose = require('mongoose');


//================================== Set Process Variables ====================>

process.env.NODE_ENV = 'test';
process.stdout.write('\x1Bc\n');

//================================== Import Models ====================>
const User = require('../users/userModel');
const seedDB = require('./seedDB');

const expect = chai.expect;
chai.use(chaiHttp);
//================================== Before and After Actions ====================>



before(function() {
  runServer();
  seedDB();
  return dbConnect(TEST_DATABASE_URL);
});


after(function() {
  return dbDisconnect();
});


describe('Mocha and Chai', function() {
  it('should be properly setup', function() {
    expect(true).to.be.true;
  });
});
