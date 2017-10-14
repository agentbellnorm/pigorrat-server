const admin = require('firebase-admin');

const omit = require('lodash/omit');
const keys = require('lodash/keys');
const concat = require('lodash/concat');
const transform = require('lodash/transform');

module.exports = (request, response) => {
	const userId = request.query.userId;

	if (!userId) {
		throw new Error("UserId is required as query parameter.");
	}

	Promise.all([
		admin.database().ref('/votes/by/'+ userId).once('value'),
		admin.database().ref('/users/').limitToLast(50).once('value')
	]).then(values => {
		const votes = values[0].val();
		const users = values[1].val();

		const omittedUsers = omit(users, concat(keys(votes), userId));

		const transformedUsers = transform(omittedUsers, (result, user, key) => {
			result.push({
				'userId' : key,
				'name' : user.name,
				'imgUrl' : user.imgUrl
			});
		}, []);

		response.send(transformedUsers);
	});
};

