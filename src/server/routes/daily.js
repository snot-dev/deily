const mongoose = require( 'mongoose' );
const crud = require( '../shared/crud' );

const Daily = mongoose.model( 'Daily' );

module.exports = crud.defineRoutes( Daily );
