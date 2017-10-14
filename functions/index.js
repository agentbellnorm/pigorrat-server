const functions = require('firebase-functions');
const admin = require('firebase-admin');

const castVote = require('./services/cast-vote.js');
const getVoteSubjects = require('./services/get-vote-subjects.js');
const getNumberOfVotes = require('./services/get-number-of-votes.js');
const getUser = require('./services/get-user.js');
const deleteUser = require('./services/delete-user.js');
const createUser = require('./services/create-user.js');

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

exports.deleteUser = functions.https.onRequest((request, response) => 
	deleteUser(request, response)
);

exports.createUser = functions.https.onRequest((request, response) => 
	createUser(request, response)
);
