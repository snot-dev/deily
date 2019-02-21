const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const DailySchema = new mongoose.Schema( {
	penalties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Penalty' }],
	date: { type: Date, default: Date.now(), required: true },
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
} );

mongoose.model( 'Penalty', DailySchema );
