const mongoose = require( 'mongoose' );
const crud = require( '../shared/crud' );

const Fine = mongoose.model( 'Fine' );

module.exports = crud.defineRoutes( Fine );
