'use strict';
//================================== Require Dependencies ====================>
const chai =require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {app} = require('../index');


//================================== Test Stats Route ====================>
const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV2YW5nNTIyIiwiZmlyc3RuYW1lIjoiRXZhbiIsImxhc3RuYW1lIjoiR2FycmV0dCIsInVzZXJpZCI6IjVhZDYwYThjOWY3NGExMDI1NmRjYmFkYiIsImlhdCI6MTUyMzk3NjkxMn0.Pa_NwB8uwed9QD7SHzV4WvuojNAq-FGFn7-d-XuJUwU';

describe('GET /stats', function () {
  it('should return an object containing game stats and user stats', function () {
    console.log(process.env.JWT_SECRET, 'JWT_SECRET');
    return chai.request(app)
      .get('/api/stats')
      .set('Authorization', authToken)
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});