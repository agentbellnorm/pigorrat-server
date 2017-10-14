const admin = require('firebase-admin');

module.exports = (request, response) => {
	validate(request);

	const voter = request.body.userId;
  	const voteSubject = request.body.voteSubject;
  	const vote = request.body.vote;

	registerVoteInByStructure(voter, voteSubject, vote);
	registerVoteInOnStructure(voter, voteSubject, vote);

	response.send({
		code : 200
	});
}

const registerVoteInByStructure = (voter, voteSubject, vote) => {
	const byVoteToPut = {
		"vote" : vote,
		"timestamp" : new Date().toISOString()
	}	
	
	admin.database()
	.ref(`/votes/by/${voter}/${voteSubject}`)
	.set(byVoteToPut);
}

const registerVoteInOnStructure = (voter, voteSubject, vote) => {
	const onVoteToPut = {
		"voterId" : voter,
		"timestamp" : new Date().toISOString()
	};

	admin.database()
	.ref(`/votes/on/${voteSubject}/${vote}`)
	.push(onVoteToPut);
}

const validate = (request) => {
	var violation = 
		!request.method == 'POST' ||
		!request.body.userId ||
		!request.body.voteSubject ||
		!request.body.vote||
		!['PIG', 'RAT'].includes(vote); 

	if(violation){
		throwError(400, "Bad request. Sucker.")
	}
}

const throwError = (code, message) => {
  	const error = new Error(message);
	error.code = code;
		
	throw error;
}