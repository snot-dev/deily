const router = require( 'express' ).Router();
const daily = require( './daily' );
const fine = require( './fine' );
const penalty = require( './penalty' );
const team = require( './team' );
const user = require( './user' );

router.use( '/daily', daily );
router.use( '/fines', fine );
router.use( '/penalties', penalty );
router.use( '/teams', team );
router.use( '/users', user );

module.exports = ( app ) => {
	app.use( '/api', router );
};
