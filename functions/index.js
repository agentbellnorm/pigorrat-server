const functions = require('firebase-functions');

exports.getVoteSubjects = functions.https.onRequest((request, response) => {
  const data = [
    {
      "userId": "id",
      "imageUrl": "url1"
    },
    {
      "userId": "id",
      "imageUrl": "url1"
    },
    {
      "userId": "id",
      "imageUrl": "url1"
    }
  ];

  response.send(data);
});
