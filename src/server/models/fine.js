const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const FineSchema = new mongoose.Schema( {
	name: { type: String, required: true },
	amount: { type: Number, required: true, default: '' },
	description: String
} );

module.exports = mongoose.model( 'Fine', FineSchema );
