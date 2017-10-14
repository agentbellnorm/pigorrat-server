const admin = require('firebase-admin');

module.exports = (request, response) => {
	const userId = request.query.userId;

	if(!userId){
		throwError(400, "UserId is required as query parameter.");
	}

	admin.database().ref(`/users/${userId}`)
		.once('value')
		.then((data) => {
			response.send(data.val() ? data : {code : 404})
		});
};

const throwError = (code, message) => {
  	const error = new Error(message);
	error.code = code;
		
	throw error;
}