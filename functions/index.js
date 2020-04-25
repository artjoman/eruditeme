const express = require('express');
const cors = require("cors");
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

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
    var temp = populateGameSessionLookup(gameCode,gameId);

    res.set("Access-Control-Allow-Origin", "*");
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

      res.set("Access-Control-Allow-Origin", "*");
    res.send({
      gameId: actualGame,
      sesionId: sessionId,
    });

    });
    
  });


  //for test purposes

  exports.testTrigger = functions.https.onRequest((req, res) => {

    var result = populateGameField();

    res.send({
      gameId: "sdsdsd",
      sesisdsonId: "sesssdsdsdionId",
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

    return true;

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

function populateGameField(gameId){

  var numberOfQuestions =2;

  //var questionRef = admin.database().ref(questions);

  var db = admin.firestore();

  var questions = db.collection("questions");
  var key = questions.doc().id;

  var question = questions.where(admin.firestore.FieldPath.documentId(), '>', key).limit(1).get()
    .then(snapshot => {
        if(snapshot.size > 0) {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                res.send({ quote: doc.data().quote, id: doc.id});
                incrementAPICalls();
            });
        }
        else {
            var question = questions.where(admin.firestore.FieldPath.documentId(), '<', key).limit(1).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    res.send({ quote: doc.data().quote, id: doc.id});
                    incrementAPICalls();
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        }
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

return true;

}

