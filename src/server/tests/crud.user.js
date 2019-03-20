const mongoose = require( 'mongoose' );
const User = require( '../models/user' );
const Team = require( '../models/team' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "CRUD Users";
const url = "/api/users/";
const teamUrl = "/api/teams";

const user = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678934cb' ),
	name: "test",
	email: "test@test.com",
	username: "test",
	creator: false,
	googleId: "thisIsAMockGoogleUserId"
};

const team = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678936cb' ),
	name: "User Test Team",
	createdBy: '56cb91bdc3464f14274854cb'
};

const updateValue = "updatedTest";

const copiedUser = Object.assign( {}, user );
const updatedUser = Object.assign( copiedUser, { name: updateValue } );

// eslint-disable-next-line no-undef
describe.only( testName, () => {
	// console.warn( mock );

	it( "Clean Up Team", tests.cleanUp( Team ) ); // eslint-disable-line no-undef

	it( "Create Team before User", tests.createNew( teamUrl, Team, team ) ); // eslint-disable-line no-undef

	it( "Clean Up User", tests.cleanUp( User ) ); // eslint-disable-line no-undef

	it( "Create new Item", ( done ) => {
		this._createNew( url, Model, payload, validation )
			.then( () => {
				done();
			} )
			.catch( this._failTest( done ) );
	};

	it( "List all items", tests.getAll( url, User ) ); // eslint-disable-line no-undef

	it( "List one item", tests.getById( url, User, user._id ) ); // eslint-disable-line no-undef

	it( "Update item field", tests.update( url, User, updatedUser ) ); // eslint-disable-line no-undef

	it( 'Delete Created Item', tests.deleteById( url, User, user._id ) ); // eslint-disable-line no-undef

	// it( "Clean Up Team", tests.cleanUp( Team ) ); // eslint-disable-line no-undef
} );
