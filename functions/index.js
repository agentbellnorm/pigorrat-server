const functions = require('firebase-functions');
const admin = require('firebase-admin');

const castVote = require('./services/cast-vote.js');
const getVoteSubjects = require('./services/get-vote-subjects.js');

admin.initializeApp(functions.config().firebase);

exports.getVoteSubjects = functions.https.onRequest((request, response) => 
  	getVoteSubjects(request, response, admin)
);

exports.castVote = functions.https.onRequest((request, response) => 
	castVote(request, response, admin)
);

