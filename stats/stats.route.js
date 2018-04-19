
'use strict';
//================================== Bring in Dependencies ====================>
const express = require('express');
const router = express.Router();
const User = require('../users/userModel');
const jwtAuth = require('../auth/authenticate');


//================================== User Stats Get Route ====================>

router.get('/stats', jwtAuth, (req,res,next) => {
  let {username} = req.user;

  User.findOne({username})
    .then(user => {
      if (user === null) {
        const err = new Error();
        err.message= 'User not found';
        err.status = 400;
        return next(err);
      }
      let questionStats = [];

      let currentNode = user.questions.head;
      while(currentNode !== null) {
        questionStats.push({
          question:currentNode.value.question,
          score: currentNode.value.score
        });
        currentNode = currentNode.next;
      }
      const statObj = {
        overallScore: user.totalscore,
        questionStats,
        sessionsCompleted:user.sessionsCompleted
      };

      res.json(statObj);
    })
    .catch(next);
});


router.post('/stats', jwtAuth, (req,res,next) => {
  let {username} = req.user;

  User.findOneAndUpdate({username}, {$inc: {sessionsCompleted: 1}})
    .then(result => {
      res.status(200).json({'message':'Session increment received'});
    })
    .catch(next);
});



module.exports = router;