const mongoose = require( 'mongoose' );
const User = require( '../models/user' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "CRUD Users";
const url = "/api/users/";

const mock = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678934cb' ),
	name: "test",
	email: "test@test.com",
	username: "test",
	creator: false,
	googleId: "thisIsAMockGoogleUserId",
	penalties: []
};

const updateValue = "updatedTest";

const copiedMock = Object.assign( {}, mock );
const updatedMock = Object.assign( copiedMock, { name: updateValue } );

// eslint-disable-next-line no-undef
describe( testName, tests.CRUD( url, false, User, { new: mock, update: { mock: updatedMock, test: "name" } } ) );
