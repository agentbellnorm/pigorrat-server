const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.getVoteSubjects = functions.https.onRequest((request, response) => {
  const userId = request.query.userId;

  admin.database().ref('/users').once('value').then(users => {
    response.send(users);
  });
});
