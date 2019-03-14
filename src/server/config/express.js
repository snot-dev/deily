const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const winston = require( 'winston' );

module.exports = ( app ) => {
	const env = process.env.NODE_ENV || 'development';

	let log = 'dev';

	if ( env !== 'development' ) {
		log = {
			stream: {
				write: message => winston.info( message )
			}
		};
	}

	// Don't log during tests
	// Logging middleware
	if ( env !== 'test' ) {
		app.use( morgan( log ) );
	}

	app.use( bodyParser.json() );
	app.use( bodyParser.urlencoded( { extended: true } ) );

	app.use( express.static( 'dist' ) );
};
