require( 'dotenv' ).config();

const express = require( 'express' );
const os = require( 'os' );
const mongoose = require( 'mongoose' );
const routes = require( './routes/index' );
mongoose.Promise = require( 'bluebird' );

const port = process.env.PORT || 3000;
const app = express();

app.use( express.static( 'dist' ) );
app.use( '/api', routes( app ) );
app.get( '/api/getUsername', ( req, res ) => res.send( { username: os.userInfo().username } ) );

mongoose.connect( process.env.MONGO_CONNECTION_STRING );

mongoose.connection.on( 'connected', () => {
	console.log( "mongoose " + mongoose.connection.readyState );
	console.log( 'Connected to ' + mongoose.connection.db.s.databaseName );
} );

// eslint-disable-next-line
app.listen( port, () => {
	console.log( `Listening on port ${port}!` );
} );
