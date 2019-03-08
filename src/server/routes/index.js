const router = require( 'express' ).Router();
const daily = require( './daily' );
const fine = require( './fine' );
const penalty = require( './penalty' );
const team = require( './team' );
const user = require( './user' );

module.exports = ( app ) => {
	router.use( '/daily', daily );
	router.use( '/fine', fine );
	router.use( '/penalty', penalty );
	router.use( '/team', team );
	router.use( '/user', user );

	return router;
};
