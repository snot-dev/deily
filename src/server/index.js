require( 'dotenv' ).config();

const express = require( 'express' );
const mongoose = require( 'mongoose' );
const config = require( './config' );
mongoose.Promise = require( 'bluebird' );

const port = process.env.PORT || 3001;
const app = express();

config.express( app );
config.routes( app );

mongoose.connect( config.env.db );

mongoose.connection.on( 'connected', () => {
	console.log( "mongoose " + mongoose.connection.readyState );
	console.log( 'Connected to ' + mongoose.connection.db.s.databaseName );
} );

// eslint-disable-next-line
app.listen( port, () => {
	console.log( `Listening on port ${port}!` );
} );

module.exports = app;
