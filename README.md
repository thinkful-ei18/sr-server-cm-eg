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
  * RETURNS: The API will return a JSON Object immediately: `{result:'Incorrect the answer was ${correctAnswer}'}` or `{result:'Correct!'};`
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
