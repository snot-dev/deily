const crud = require( '../shared/crud' );
const User = require( '../models/user' );

module.exports = crud.createRoutes( User );
