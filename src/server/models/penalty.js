const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const PenaltySchema = new mongoose.Schema( {
	user: { type: String, required: true },
	fine: { type: Object, required: true },
	date: { type: Date, default: Date.now(), required: true },
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
	paid: { type: Boolean, default: false }
} );

module.exports = mongoose.model( 'Penalty', PenaltySchema );
