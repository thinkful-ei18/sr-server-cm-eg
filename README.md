# Learn DSA
### A Quiz App to Prepare for Data Science and Algorithm Interviews


## REST API Specs:

### Resources:  ---   (*https://learndsa.herokuapp.com/api*)

+ Users
+ Questions
+ Auth

## Users (*/users*)
+ GET (*Get User Info*)
+ POST (*register route*)

## Questions (*/questions*)
+ GET (*Get First Question from User Linked List*)
  * Requires Authentication
  * Uses authToken to get username, then requests user's first question from database.
  * RETURNS: Returns a JSON object in this format: ` {"question":"What is O(n)"}`
  * If no authtoken is passed, returns 403 error `err.message: 'Invalid authorization. Expected Header'`

+ POST (*Submit answer to a question*)
  * Requires Authentication
  * Uses Authtoken to get username, making changes to relevant user's questions.
  * SPECS:  The API Accepts a request body object key entitled: 'userAnswer'.
  * i.e.: 
   ```axios({
      url: `${API_URL}/api`,
      method:'POST',
      data: {
        "userAnswer":"Linear"
      },
      contentType:'application/json'
    })
    ```
  * RETURNS: The API will return a JSON Object immediately: 
  ```
  {
    result: {
      text: 'Incorrect the answer was ${correctAnswer}',
      boolean: false (or true, if question was answered correctly)
    }
  }
    ```

  * On receiving the user answer, the server will query the Linked List associated with the user. If the answer is correct, the question will be moved to the end of the list. If the answer is incorrect, it will be moved a third of the distance of the list further in the list of questions, to increase frequency of repitition. The altered linked list will then be saved in the database.


## Auth (*/auth*)
+ POST (*Login*)
  * SPECS: Requires 'username' and 'password' keys
  * RETURNS: Returns an authToken in string form.

  ```
  axios({
    method:'POST',
    url:`${API_URL}/auth,
    data: {
      username:'myUser',
      password:'Mypassword'
    }
  })


## Stats (*/stats*)
+ GET (*Get User Stats*)
  + SPECS: Requires authentication token.
  + RETURNS: Returns a stat Object as shown below:

```
{
    "overallScore": 14,
    "questionStats": [
        {
            "question": "What is the big O of a nested for loop?",
            "score": 0
        },
        {
            "question": "What does O(n) mean?",
            "score": 0
        },
        {
            "question": "The type of list sorting which occurs by dividing the list in halves and merging them back together in order.",
            "score": 0
        },
        {
            "question": "A Binary Search Tree with leaf children (its bottom-most nodes) that are no more than one node apart in their distance from the root is called what? ",
            "score": 2
        },
        {
            "question": "Arrays are _________ in memory. This is an incredible benefit for their usage, because it allows lookup time for any element in the array to remain O(1), constant time.",
            "score": 2
        },
        {
            "question": "A _________ is a data structure the nature of which can be illustrated by imagining several plates on top of eachother.",
            "score": 2
        },
        {
            "question": "True or False: The difference between Big O Polynomial Classification and Big O Exponential Classification is that Polynomial increases to the power of the number of nested loops, whereas exponential increases in increments of 2 powers with each nested Loop.",
            "score": 2
        },
        {
            "question": "A _________ is a data structure the nature of which can be illustrated by imagining several plates on top of eachother.",
            "score": 2
        },
        {
            "question": "The key player of a QuickSort is a(n) ______, by which the sorting algorithm flips all of the other members of the array to different sides of the list depending on whether they are less or greater.",
            "score": 2
        },
        {
            "question": "A ______ can only insert data on one end and remove data on the other.",
            "score": 2
        }
    ]
}
```
  + StatObject includes an array of objects that contain questions and the individual scores the user has attained on these questions, as well as a key which contains the user's total score.


+ POST (*Increment Amount of Sessions user has completed*) 
  + SPECS: Requires an AuthToken.
  + On Posting to this route, the server will increment the amount of sessions the user has completed. Ideally this could be used by the frontend to increment every 10 questions, or whatever is considered a question. 
  + RETURNS:  200 status and a `{'message': 'Session Increment received'}`