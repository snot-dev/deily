const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const TeamSchema = new mongoose.Schema( {
	name: { type: String, required: true },
	createdAt: { type: Date, default: Date.now(), required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, default: [] }]
}, { minimize: false } );

TeamSchema.statics.addUser = ( user ) => {
	const userId = user._id;
	return new Promise( ( resolve, reject ) => {
		Team.findOneAndUpdate( user.team, { '$push': { 'users': userId } }, { new: true }, ( err, doc ) => { // eslint-disable-line no-use-before-define
			if ( err ) {
				reject( new Error( err ) );
			}

			if ( doc.users.indexOf( userId ) > -1 ) {
				resolve( doc );
			} else {
				reject( new Error( 'The user already exists in this team!' ) );
			}
		} );
	} );
};

const Team = mongoose.model( 'Team', TeamSchema );

module.exports = Team;
