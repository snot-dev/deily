const mongoose = require( 'mongoose' );
const crud = require( '../shared/crud' );

const User = mongoose.model( 'User' );

module.exports = crud.defineRoutes( User );
