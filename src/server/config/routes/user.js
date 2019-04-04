const crud = require( '../../shared/crud' );
const User = require( '../../models/user' );
const Team = require( '../../models/team' );
const messages = require( '../../shared/messages' );

const collectionName = User.collection.collectionName;

const alt = {
	create: ( req, res ) => {
		const newUser = new User( req.body );
		let createdUser;

		newUser.save()
			.then( ( user ) => {
				createdUser = user;
				return Team.addUser( createdUser );
			} )
			.then( ( team ) => {
				res.json( { success: true, message: messages.success.created( collectionName ), result: { user: createdUser, team } } );
			} )
			.catch( ( err ) => {
				console.warn( err );
				res.json( { success: false, error: messages.error.whileCreating( collectionName ), details: err } );
			} );
	}
};

module.exports = crud.createRoutes( User, alt );
