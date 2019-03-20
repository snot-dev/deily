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
	teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: [] }]
}, { minimize: false } );

module.exports = mongoose.model( 'User', UserSchema );
