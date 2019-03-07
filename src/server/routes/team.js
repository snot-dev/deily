const mongoose = require( 'mongoose' );
const crud = require( '../shared/crud' );

const Team = mongoose.model( 'Team' );

module.exports = crud.defineRoutes( Team );
