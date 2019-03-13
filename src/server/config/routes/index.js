const router = require( 'express' ).Router();
const daily = require( './daily' );
const fine = require( './fine' );
const penalty = require( './penalty' );
const team = require( './team' );
const user = require( './user' );

router.use( '/daily', daily );
router.use( '/fine', fine );
router.use( '/penalty', penalty );
router.use( '/team', team );
router.use( '/users', user );

module.exports = ( app ) => {
	app.use( '/api', router );
};
