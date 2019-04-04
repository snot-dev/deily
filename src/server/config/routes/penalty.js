const crud = require( '../../shared/crud' );
const Penalty = require( '../../models/penalty' );
const User = require( '../../models/user' );
const messages = require( '../../shared/messages' );

const collectionName = Penalty.collection.collectionName;

const alt = {
	create: ( req, res ) => {
		const newPenalty = new Penalty( req.body );
		let createdPenalty;

		newPenalty.save()
			.then( ( penalty ) => {
				createdPenalty = penalty;
				return User.addPenalty( createdPenalty );
			} )
			.then( ( user ) => {
				res.json( { success: true, message: messages.success.created( collectionName ), result: { penalty: createdPenalty, user } } );
			} )
			.catch( ( err ) => {
				console.warn( err );
				res.json( { success: false, error: messages.error.whileCreating( collectionName ), details: err } );
			} );
	}
};

module.exports = crud.createRoutes( Penalty, alt );
