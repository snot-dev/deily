const express = require( 'express' );
const os = require( 'os' );
const routes = require( './routes/index' );

const app = express();

app.use( express.static( 'dist' ) );
app.use( '/api', routes( app ) );
app.get( '/api/getUsername', ( req, res ) => res.send( { username: os.userInfo().username } ) );
app.listen( 8080, () => console.log( 'Listening on port 8080!' ) );
