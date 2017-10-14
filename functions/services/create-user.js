const admin = require('firebase-admin');

module.exports = (request, response) => {
	validate(request);

	admin.database().ref(`/users/${request.body.userId}`).set(translateRequest(request));

	response.send({
		userId : request.body.userId,
		code : 200});
};

const throwError = (code, message) => {
  	const error = new Error(message);
	error.code = code;
		
	throw error;
}

const translateRequest = (request) => {
	return {
		imgUrl : request.body.imgUrl,
		name : request.body.name
	}
}

const validate = (request) => {
	if(request.method != 'PUT'){
		throwError(404, "Bad request, sucker");
	}

	if(!request.body.name){
		throwError(404, "Bad request, sucker");
	}

	if(!request.body.imgUrl){
		throwError(404, "Bad request, sucker");
	}

	if(!request.body.userId){
		throwError(404, "Bad request, sucker");
	}
}