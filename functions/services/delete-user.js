const admin = require('firebase-admin');

module.exports = (request, response) => {
	validate(request);

	admin.database().ref(`/users/${request.query.userId}`).set(null);

	response.send({code : 200});
};

const throwError = (code, message) => {
  	const error = new Error(message);
	error.code = code;
		
	throw error;
}

const validate = (request) => {
	if(request.method != 'DELETE'){
		throwError(404, "Bad Request");
	}

	if(!request.query.userId){
		throwError(400, "UserId is required as query parameter.");
	}
}