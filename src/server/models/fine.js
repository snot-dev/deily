const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const FineSchema = new mongoose.Schema( {
	name: { type: String, required: true },
	amount: { type: mongoose.Decimal128, required: true, default: '' },
	description: String
} );

mongoose.model( 'Penalty', FineSchema );
