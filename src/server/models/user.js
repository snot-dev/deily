const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const UserSchema = new mongoose.Schema( {
	name: { type: String, required: true, default: '' },
	email: { type: String, required: true, default: '' },
	username: { type: String, required: true, default: '' },
	creator: { type: String, required: true, default: false },
	googleId: { type: String, required: true },
	penalties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Penalty' }]
}, { minimize: false } );

module.exports = mongoose.model( 'User', UserSchema );
