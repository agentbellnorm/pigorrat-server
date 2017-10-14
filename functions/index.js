const functions = require('firebase-functions');
const admin = require('firebase-admin');

const castVote = require('./services/cast-vote.js');
const getVoteSubjects = require('./services/get-vote-subjects.js');
const getNumberOfVotes = require('./services/get-number-of-votes.js');
const getUser = require('./services/get-user.js');

admin.initializeApp(functions.config().firebase);

exports.getVoteSubjects = functions.https.onRequest((request, response) => 
  	getVoteSubjects(request, response)
);

exports.castVote = functions.https.onRequest((request, response) => 
	castVote(request, response)
);

exports.getNumberOfVotes = functions.https.onRequest((request, response) => 
	getNumberOfVotes(request, response)
);

exports.getUser = functions.https.onRequest((request, response) => 
	getUser(request, response)
);

