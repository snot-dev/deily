const test = require( './test' );
const development = require( './development' );

const env = {
	test,
	development
};

module.exports = env[process.env.NODE_ENV || 'development'];
