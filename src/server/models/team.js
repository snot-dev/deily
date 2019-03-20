const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const TeamSchema = new mongoose.Schema( {
	name: { type: String, required: true },
	penalties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Penalty', required: true, default: [] }],
	createdAt: { type: Date, default: Date.now(), required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, default: [] }]
}, { minimize: false } );

TeamSchema.statics.addUser = ( teamId, userId ) => {
	return new Promise( ( resolve, reject ) => {
		Team.findOneAndUpdate( teamId, { '$push': { 'users': userId } }, { new: true }, ( err, doc ) => {
			if ( err ) {
				reject( new Error( err ) );
			}

			if ( doc.users.indexOf( userId ) > -1 ) {
				resolve( doc );
			} else {
				reject( new Error( 'Error addding user to the Team' ) );
			}
		} );
	} );
};

const Team = mongoose.model( 'Team', TeamSchema );

module.exports = Team;
