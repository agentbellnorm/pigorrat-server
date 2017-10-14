const admin = require('firebase-admin');

module.exports = (request, response) => {
	const userId = request.query.userId;

	if(!userId){
		throwError(400, "UserId is required as query parameter.");
	}

	Promise.all([
		admin.database().ref(`/votes/on/${userId}/PIG`).once('value'),
		admin.database().ref(`/votes/on/${userId}/RAT`).once('value')
	])
	.then(values => {
		response.send({
			"pigVotes" : values[0].val() ? Object.keys(values[0].val()).length : 0,
			"ratVotes" : values[1].val() ? Object.keys(values[1].val()).length : 0
		});
	});
};

const throwError = (code, message) => {
  	const error = new Error(message);
	error.code = code;
		
	throw error;
}