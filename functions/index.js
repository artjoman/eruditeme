// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

  // ---------- CREATE GAME
  //expects query parameter "name" for admin user to create game
  exports.startGame = functions.https.onRequest((req, res) => {

    var userName = req.query.name;
    var gameCode = randomString(6);

    var gameId = createGameRecord(userName,gameCode);
    var sessionId = createSession(gameId,userName);
    populateGameSessionLookup(gameCode,gameId);


    res.send({
      gameId: gameId,
      sesionId: sessionId,
      code: gameCode
    });
  });

// --------------- JOIN GAME

  //expects query parameter "name" for name of user
  //expects query parameter "code" for game code
  exports.joinGame = functions.https.onRequest((req, res) => {

    var userName = req.query.name;
    var gameCode = req.query.code;
    var gameId ="NONE";
    
    var activeGameRef = admin.database().ref('activeGames/'+gameCode).once('value').then(function(snapshot) {
      var actualGame = snapshot.val().gameID;
      var sessionId = createSession(actualGame,userName);

    res.send({
      gameId: actualGame,
      sesionId: sessionId,
    });

    });
    
  });


// --------------- FUNCTIONS-----------------------

  function createGameRecord(userName, gameCode){
    var gameListRef = admin.database().ref('games');
    var gameListRef = gameListRef.push();

    gameListRef.set({
        name: userName,
        code: gameCode,
        status: "NEW"
      });

      return gameListRef.key;
  }

  function createSession(gameId,userName){

          var gameReference = "games/"+gameId+"/sessions";
          var sesionRef = admin.database().ref(gameReference);
      
          var sesionRef = sesionRef.push();
          sesionRef.set({
            name: userName
          });
      
          return sesionRef.key;
  }

  function populateGameSessionLookup(gameCode, gameId){

    var activeGamesRef = admin.database().ref("activeGames").child(gameCode);
    activeGamesRef.set({
      gameID: gameId
    });

  }


  function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;

}

