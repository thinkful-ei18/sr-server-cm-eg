'use strict';

const _Node = require('./node');

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
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