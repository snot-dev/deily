const router = require( 'express' ).Router();
const fine = require( './fine' );
const penalty = require( './penalty' );
const team = require( './team' );
const user = require( './user' );

router.use( '/fines', fine );
router.use( '/penalties', penalty );
router.use( '/teams', team );
router.use( '/users', user );

module.exports = ( app ) => {
	app.use( '/api', router );
};
