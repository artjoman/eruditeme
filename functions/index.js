// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

  // ---------- CREATE GAME
  //expects query parameter "name" for admin user to create game
  exports.startGame = functions.https.onRequest((req, res) => {
    // gets name of admin user
    var userName = req.query.name;
    //TODO ensure uniques in database ---------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var gameCode = randomString(6);

    //create game
    var gameListRef = admin.database().ref('games');
    var gameListRef = gameListRef.push();

    gameListRef.set({
        name: userName,
        code: gameCode,
        status: "NEW"
      });

      //create game session
      var gameId = gameListRef.key;

    var gameReference = "games/"+gameId+"/sessions";
    var sesionRef = admin.database().ref(gameReference);

    var sesionRef = sesionRef.push();
    sesionRef.set({
      name: userName
    });

    var sesionId = sesionRef.key;

    //populate game session lookup

    var activeGamesRef = admin.database().ref("activeGames").child(gameCode);
    activeGamesRef.set({
      gameID: gameId
    });

    // Send response
    res.send({
      gameId: gameId,
      sesionId: sesionId,
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
      
            //create game session
            var sesionRef = admin.database().ref('games/'+actualGame+'/sessions');      
            var sesionRef = sesionRef.push();
            sesionRef.set({
              name: userName
            });        

      // Send response
    res.send({
      gameId: actualGame,
      sesionId: sesionRef.key,
    });

    });
    
  });


// --------------- FUNCTIONS-----------------------
  function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHJKLMNOPQRSTUVWXYZ023456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

