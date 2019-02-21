const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const TeamSchema = new mongoose.Schema( {
	penalties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Penalty' }],
	createdAt: { type: Date, default: Date.now(), required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { minimize: false } );

mongoose.model( 'Penalty', TeamSchema );
