# API documentation
 
This is documentation that explains what each url does, what data is required and what data will be received in which format.
 
I'm using localhost for now but if we host it that would obviously be different so try to use a way of setting variables such that localhost can become manchester.ac.uk or whatever domain we are hosting it on so you don’t need to replace all localhost manually in the future :D
 
The API calls might result in data sent back to the client and if it is it's always in json format explained for each url below.
 
Every API call will result in a statuscode from the server such that the client knows whether or not it was successful. The codes received is standard for api and is in a table [here](https://www.myintervals.com/api/errors.php) would recommend having a look at those.
 
 
#### URL: http://localhost:3001/guest/create
 
1. Sending request
   * GET request
   * No request body or parameters taken
2. What it does
   * generates a random username, gives the user an id which is stored to a session that can be found by the server on the future calls from this user
3. Receiving data
   * No data will be received only a status code
       * 201 is what you should get
 
 
#### URL: http://localhost:3001/game/create
 
1. Sending request
   * POST request
   * need to have a userid stored to the session from previous calls
   * Request body needs a json object with key's size and inarow.
       * Example:
       ```json
       {
           "size":2,
           "inarow":4
       }
       ```
       * Size key:
           * 1 is playing with a random user
           * 2 is playing with a user that will join through a link
           * 4, 8, 16, 32 is the tournaments with the corresponding size
       * inarow key is 3 for 3 in a row and 4 for 4 in a row and so on...
2. What it does
   * Generates an entry to the room table and entry to the game table. So it prepares for the game.
   * it generates a game id that is stored to the session which is used to identify the game the user is in for other API calls
3. Receiving data
   * * No data will be received only a status code
       * 201 means success
       * 401 means you either did not include the correct body or the user does not have userid stored to the session "User might have cookie block or deleted it's cookies"
 
 
<!-- #### URL: http://localhost:3001/game/playertwo
 
1. Sending request
   * POST request
   * need to have a userid stored to the session from previous calls
   * Request body needs a json object with key roomcode
       * Example:
       ```json
       {
           "roomcode":213
       }
       ```
       * roomcode is found from url and sent to the server to connect the user to the game
2. What it does
   * it connects this user to a game found in the game link or entered to the site
3. Receiving data
   * * No data will be received only a status code
       * 201 means success
       * 401 means you either did not include the correct body or the user does not have userid stored to the session "User might have cookie block or deleted it's cookies"      
  -->
  #### URL: http://localhost:3001/game/roomlink
 
1. Sending request
   * POST request
   * Request body needs a json object with key roomcode
       * Example:
       ```json
       {
           "roomcode": "ad3sds"
       }
       ```
       * Roomcode is generated serverside in game/create this code is always 6 chars in length
2. What it does
   * it connects this user to a game found in the game link(Working with 404.js) or entered to the site
3. Receiving data
   * here we get a json object 
        ```json
        {
            "auth": false,
            "room": true
        }
       ```
       * Here auth is true if the user has stored userid to session and false if not
       * room true means that the room exists and is joinable if it's false it's not joinable or does not exist. 
    * 403 forbidden is generated when call is trying to a player to room when the player is player_0 in the room already then it cant be player_1 aswell (can't play agains him self)
    * if you ger 401 good on you because I do not know how one can end up there :D
    * 400 means that your json has wrong key name or straight up missing
 

#### URL: http://localhost:3001/game/sendmove
 
1. Sending request
   * POST request
   * need user id and game id stored to a session from previous calls 
   * Request body needs a json object with key x and y
       * Example:
       ```json
       {
           "x":1,
           "y":2
       }
       ```
       * where x and y are coordinates of where the player dropped the ball
2. What it does
   * Sends coordinates to the database such that the opponent can get them
3. Receiving data
   * * No data will be received only a status code
       * 201 means success
       * 401 means you either did not include the correct body or the user does not have userid or game id stored to it's session
 
 
#### URL: http://localhost:3001/game/update
 
1. Sending request
   * POST request
   * need user id and game id stored to a session from previous calls 
   * No request body needed
2. What it does
   * looks for new moves from the opponent. if there is a new move sends it back if not it sends the indicator back. Such that the user can follow the opponent’s indicator
3. Receiving data
   * Here you receive a json object numbers here is just example values but boolean is the correct one.
       * if the opponent has made a move you will get the following json
       ```json
           {
               "update": true,
               "x": 4,
               "y": 3
           }
       ```
       * if the opponent did not make a move you get the indicator back with this json:
       ```json
       {
           "update": false,
           "indicator": 2
       }
       ```
 
#### URL: http://localhost:3001/game/getboard
 
1. Sending request
   * GET request
   * need user id and game id stored to a session from previous calls 
   * No request body needed
2. What it does
   * This is useful to call if a user the page and we need all the coordinates or they close the tab and goes back in. This will grab all the moves made in the game with the game id that is stored in the user’s session
3. Reciving data
   * Here you receive a 2D json object for the moves made by the user that sent the call thisUser key will be true and moves made by the opponent thisUser key will be false. x and y are the coordinate for the move. Example:
       ```json
       [
           {
               "thisUser": true,
               "x": 6,
               "y": 4
           },
           {
               "thisUser": false,
               "x": 0,
               "y": 9
           },
           {
               "thisUser": true,
               "x": 0,
               "y": 0
           }
       ]
       ```
 
 
#### URL: http://localhost:3001/game/newindicator
 
1. Sending request
   * POST request
   * Need user id and game id stored to a session from previous calls 
   * Need a json object with a key indicator
       * Example
       ```json
       {
           "indicator": 4
       }
       ```
2. What it does
   * It updates the indicator value in the game table such that for each update we get the correct indicator so we can follow the opponent’s movement
3. Receiving data
   * No data will be received only a status code
       * 200 means success
       * 401 means wrong in request body or missing session variables


#### URL: http://localhost:3001/game/randomlink
 
1. Sending request
   * post request
   * Need user id stored to a session from previous calls 
   * Need a json object with a key inarow
       ```json
       {
           "inarow": 4
       }
       ```
       * Here inarow is the desiered 3 or 4 or 5 in a row that the user want's to play
2. What it does
   * It looks trough the rooms where size is 1 (so a random room) where the player 2 slot is not taken and the user is not player 1, aswell as it's the correct in a rowgame
3. Receiving data
   * Here you get a simple json with key gameFound with a boolean value back with statuscode 200 if all is good
        * json example
        ```json 
        {
            "gameFound": true
        }
        ```
        * If gameFound is true then we found a matching room and the user is linked up and needs to be sent to the game
        * if gameFound is false there was no active random room that type of inarow. Then user should be asked if he wants to create a random room or search for another type of inarow(this is up to forntend team :D)
    * If you get status code 401 the json in the request body is wrong or the user does not have userid stored to it's session


#### URL: http://localhost:3001/game/removerandom
 
1. Sending request
   * get request
   * This should only be called from waiting room on when a user is waiting for the other to connect and if he leaves the page this url is called. (this only terminates a random room a invite room wont be affacted, so don't call for those if you can but if you do it's not really doing anything)
        * Add the following code to the correct waitingroom page:
        ```javascript
        window.addEventListener("beforeunload", function(e) {
            // generates popup it's sort of ugly but it's the only simple way
            e.returnValue = 'Data removed, feel free to exit site now';
            fetch("/game/removerandom/");
        });
       ```
        * should only be run for a user that created the random game room
2. What it does
   * sets size to 0 such that when searching for random room this will not be an option that a user can be connected to
3. Receiving data
   * No data will be received only a status code
       * 200 means success
       * 401 means missing session variables