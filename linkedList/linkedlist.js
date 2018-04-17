'use strict';

const _Node = require('./node');

class LinkedList {
  constructor() {
    this.head = null;
  }

  static shiftFirst(list) {
    let tempNode = list.head;
    list.head = list.head.next;
    return tempNode.value;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  // Insert item a third of the length of the list ahead of the beginning.
  static insertForwardThird(item, list) {
    if (!list.head) {
      return false;
    }
    let lengthCounter = 0;
    let currentNode = list.head;

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
      lengthCounter++;
    }

    let thirdIndex = Math.floor(lengthCounter/3);

    currentNode = list.head;
    lengthCounter = 0;
    while(currentNode.next !== null && lengthCounter < (thirdIndex-1)) {
      currentNode = currentNode.next;
      lengthCounter++;
      console.log(lengthCounter);
    }

    let tempNode = currentNode.next;
    currentNode.next = new _Node(item, tempNode);
  }

  static insertLast(item,list) {
    if (list.head === null) {
      list.insertFirst(item);
    }
    else {
      let tempNode = list.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) {
    let currNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      currNode = currNode.next;

    }
    return currNode;
  }

  delete(item) {
    if (!this.head) {
      return null;
    }

    if (this.head === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while ((currNode.next !== null) && (currNode.value !== item)) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    if (currNode === null) {
      console.log(`${item} not found in linked list`);
      return;
    }

    prevNode.next = currNode.next;
  }

  insertBefore(item, key) {
    if (!this.head) {
      this.head = this.insertFirst(item, this.head);
    }
    let currNode = this.head;
    let prevNode = this.head;

    while ((currNode.next !== null) && (currNode.value !== key)) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    if (currNode === null) {
      console.log(`${key} cannot be found in the list`);
      return;
    }

    currNode = new _Node(item, prevNode.next);
    prevNode.next = currNode;
  }

  insertAfter(item, key) {
    if (!this.head) {
      this.head = this.insertFirst(item, this.head);
    }
    let currNode = this.head;
    let prevNode = this.head;

    while ((currNode.next !== null) && (currNode.value !== key)) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    if (currNode === null) {
      console.log(`${key} cannot be found in the list`);
      return;
    }

    prevNode = new _Node(item, currNode.next);
    currNode.next = prevNode;
  }

}


module.exports = LinkedList;

//Just some testing, don't mind me--------|
// function main() {
//   const foo = new LinkedList();
//   foo.insertForwardThird('Wohooo!!');
//   foo.insertFirst('1');
//   foo.insertFirst('2');
//   foo.insertFirst('3');
//   foo.insertFirst('4');
//   console.log(JSON.stringify(foo));
// }

// main();