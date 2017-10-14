const functions = require('firebase-functions');

exports.getVoteSubjects = functions.https.onRequest((request, response) => {
  const data = [
    {
      "userId": "1",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/37/Sus_Barbatus%2C_the_Bornean_Bearded_Pig_%2812616351323%29.jpg"
    },
    {
      "userId": "2",
      "imageUrl": "http://i3.mirror.co.uk/incoming/article10109983.ece/ALTERNATES/s615/Blue-rat.jpg"
    }
  ];

  response.send(data);
});
