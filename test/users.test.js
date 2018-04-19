'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../index');
const User = require('../users/userModel');


describe('GET /users', function () {
  it('should return a list of users', function () {
    return chai
      .request(app)
      .get('/api/users')
      .then(res => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.an('Array');
        chai.expect(res.body[0]).to.be.an('Object');
        chai.expect('username' in res.body[0]).to.be.true;
      });
  });
});


describe('POST /users', function () {
  it('should create a new user', function () {
    return chai
      .request(app)
      .post({username:'smootheyboi', 'password': 'hellothere', 'firstName':'coolBoi', 'lastName':'Skillz'})
      .send()
      .then(res => {
        return User
          .findOne({username:'smootheyboi'})
          .then(response => {
            // chai.expect(response)
            console.log(response);
          })
      });
      
  })
})