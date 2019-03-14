const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const PenaltySchema = new mongoose.Schema( {
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	fine: { type: mongoose.Schema.Types.ObjectId, ref: 'Fine', required: true },
	date: { type: Date, default: Date.now(), required: true },
	paid: { type: Boolean, default: false }
} );

module.exports = mongoose.model( 'Penalty', PenaltySchema );
