var generateHash = require('../../custom/generateHash');

module.exports = function(db, config) {
	// create some users
	const users = [{
		email: 'user1@gmail.com',
		name: 'Talantbekov Kairat',
		status: 0,
		active: 1,
		verified: false,
		password: 'pass',
		about: `I love "Coursera" and online content for learning.
		I'm happy that every one in the wold have an opportunity to
		learn and develop himself/herself. I think that machine learning
		can solve many problems and world needs more AI developers. I'm
		from Kyrgyzstan(Central Asia), machine learning not used in my
		country at all. However, it seems that there are many problems which
		can be solved by machine learning algorithms. For example, check
		attendance of students in universities, analyze traffic, and help
		doctors to predict illnesses. Next semester I will write my thesis paper
		and I would like to solve some existing problem in my country with machine
		learning algorithms.`,
		goal: `Get internship as a programmer during winter 2017,
		help with advises and construct study plan if needed.
		some other text. more than 110 chars. more and more text`,
		hash: 'someLongHash'
	},{
		email: 'talantbekov123@gmail.com',
		name: 'Batiy Amatov',
		status: 1,
		active: 1,
		verified: true,
		password: 'pass',
		about: 'I love doing great things with great people',
		goal: `Get into top MBA school, within 2 years. Help 
		construct future study plan and give some advises some other.`
	},{
		email: 'mentorkg@yandex.com',
		name: 'Azim Azimov',
		status: 1,
		active: 0,
		verified: true,
		password: 'pass',
		about: 'I love helping people too, I love helping people too, I love helping people too.'
	}, {
		email: 'user4@yandex.com',
		name: 'Bakai Bakaev',
		status: 1,
		active: 1,
		verified: true,
		password: 'pass',
		about: 'I love helping people too, I love helping people too, I love helping people too.'
	}, {
		email: 'admin',
		name: 'Mentor.kg team',
		admin: true,
		status: 1,
		active: 1,
		verified: true,
		password: 'SecretPass'
	}];

	for (user of users) {

		var instance = new db.User({
			email: user.email,
			name: user.name,
			status: user.status,
			active: user.active,
			study: user.study,
			password: generateHash(user.password),
			about: user.about,
			goal: user.goal,
			verified: user.verified
		});
		
		instance.save(function (err) {
			if (err) {
				console.log(err);
			}
			console.log('User seeded',err);
			// saved!
		});
	}
}