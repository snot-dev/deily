const mongoose = require( 'mongoose' );
const crud = require( '../shared/crud' );

const Penalty = mongoose.model( 'Penalty' );

module.exports = crud.defineRoutes( Penalty );
