'use strict';
// Import Linked List Class
const LinkedList = require('../linkedList/linkedlist');

// Grab Questions from Question JSON File
const questionArr = require('./questions');


// Insert all Questions in QuestionList 
let QuestionList = new LinkedList();

questionArr.forEach(question => {
  LinkedList.insertLast(question, QuestionList);
});


module.exports = QuestionList;
