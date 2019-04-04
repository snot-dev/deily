const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const UserSchema = new mongoose.Schema( {
	name: { type: String, required: true },
	email: { type: String, required: true },
	username: { type: String, required: true },
	creator: { type: String, required: true, default: false },
	googleId: { type: String, required: true },
	created: { type: Date, required: true, default: Date.now() },
	penalties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Penalty', default: [] }],
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
}, { minimize: false } );


UserSchema.statics.addPenalty = ( penalty ) => {
	const penaltiId = penalty._id;
	return new Promise( ( resolve, reject ) => {
		User.findOneAndUpdate( { email: penalty.user }, { '$push': { 'penalties': penaltiId } }, { new: true }, ( err, doc ) => { // eslint-disable-line no-use-before-define
			if ( err ) {
				reject( new Error( err ) );
			}

			if ( doc.penalties.indexOf( penaltiId ) > -1 ) {
				resolve( doc );
			} else {
				reject( new Error( 'Duplicated!' ) );
			}
		} );
	} );
};

const User = mongoose.model( 'User', UserSchema );

module.exports = User;
