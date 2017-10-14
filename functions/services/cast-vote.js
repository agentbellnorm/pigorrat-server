const admin = require('firebase-admin');

module.exports = (request, response) => {
	const voter = request.body.userId;
  	const voteSubject = request.body.voteSubject;
  	const vote = request.body.vote;

  	if (voteIsInValid(vote)) {
  		throwError(400, `Invalid vote: ${vote}`);
  	}

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

const voteIsInValid = (vote) => {
	return !['PIG', 'RAT'].includes(vote);
}

const throwError = (code, message) => {
  	const error = new Error(message);
	error.code = code;
		
	throw error;
}