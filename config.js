module.exports = {
	env: process.env.ENV || 'prod',
	dev: {
		TEST_DB_URL: process.env.DB_URL || 'mongodb://localhost/testmentor',
		DB_URL: process.env.DB_URL || 'mongodb://localhost/testmentor',
		D_URL: process.env.D_URL || 'http://localhost:1104/'
	},
	prod: {
		TEST_DB_URL: process.env.DB_URL || 'mongodb://localhost/testmentor',
		DB_URL: process.env.DB_URL || 'mongodb://localhost/mentor',
		D_URL: process.env.D_URL || 'http://mentor.kg/',
	}
}