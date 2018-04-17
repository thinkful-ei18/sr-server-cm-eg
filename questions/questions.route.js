'use strict';

//================================== Bring in Dependencies ====================>
const express = require('express');
const router = express.Router();
const User = require('../users/userModel');
const jwtAuth = require('../auth/authenticate');
const LinkedList = require('../linkedList/linkedlist');


//================================== Questions Endpoint ====================>
/**
 * @description The purpose of this endpoint is retreiving a question from the database. It simply pulls the first question ->
 * from the linked list stored in the database and sends it to the client. It does not edit or change anything. 
 * 
 */
router.get('/questions', jwtAuth, (req,res,next) => {
  // Extract username so that DB query can be made for user's questions
  const {username} = req.user;

  User.findOne({username})
    .then(user => {
      let questionToSend = user.questions.head.value;
      res.json({'question':questionToSend.question});
    });
 
});


router.post('/questions', jwtAuth, (req,res,next) => {
  const {userAnswer} = req.body;
  const {username} = req.user;
  User.findOne({username})
    .then(user => {
      if (user.questions.head.value.answer.toLowerCase() !== userAnswer.toLowerCase()) {
        res.json({'result': `Incorrect. The Correct answer is ${user.questions.head.value.answer}`});
        let question = LinkedList.shiftFirst(user.questions);
        LinkedList.insertForwardThird(question, user.questions);

        User.updateOne({username}, {$set: {questions:user.questions}})
          .then(result => {
            console.log(`list updated for ${req.user.username}`);
          });
      } else {
        res.json({'result':'Correct!'});
        let question = LinkedList.shiftFirst(user.questions);
        LinkedList.insertLast(question,user.questions);

        User.updateOne({username}, {$set: {questions:user.questions}})
          .then(result => {
            console.log(`list updated for ${req.user.username}`);
          });

      }
    })
    .catch(next);

});



module.exports = router;