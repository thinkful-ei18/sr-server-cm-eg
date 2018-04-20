'use strict';
const mongoose = require('mongoose');
const {TEST_DATABASE_URL} = require('../config');

const User = require('../users/userModel');

const seedUsers = [
  {
    'firstName':'Carl',
    'lastName':'Sagan',
    'username':'cSagan',
    'password':'coolCarluniverseboi223'
  },
  {
    'firstName':'Jimmy',
    'lastName':'Neutron',
    'username':'jneutron',
    'password':'jboiScienceBRO'
  },
];



const seedDB = () => {
  mongoose.connect(TEST_DATABASE_URL)
    .then(() => {
      return mongoose.connection.db.dropDatabase()
        .then(result => {
          console.info(`Dropped Database: ${result}`);
        });
    })
    .then(() => {
      return User.insertMany(seedUsers);
    })
    .then(res => {
      console.log('Users Inserted');
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
    });

};

if (require.main === module) {
  seedDB();
}
module.exports = seedDB;