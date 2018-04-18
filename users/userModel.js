'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const QuestionList = require('../questions/question.linkedlist');


const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  questions: { type: Object, default: () => QuestionList}
});

userSchema.set('toObject', {virtuals:true},{
  transform: function (doc, ret) {
    ret.id = ret._id,
    delete ret._id,
    delete ret.password,
    delete ret.__v;
  }
});

userSchema.virtual('totalscore').get(function () {
  let currentNode = this.questions.head;
  let total = 0;
  while (currentNode.next !== null) {
    total+= Number(currentNode.value.score);
    currentNode = currentNode.next;
  }
  return total;
});


userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);