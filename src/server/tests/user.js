const mongoose = require( 'mongoose' );
const User = require( '../models/user' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "Users";
const url = "/api/users";

const mock = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678934cb' ),
	name: "test",
	email: "test@test.com",
	username: "test",
	creator: false,
	googleId: "thisIsAMockGoogleUserId",
	penalties: []
};

const updateValue = {
	penalties: [
		{
			_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678934cd' ),
			user: '56cb91bdc3464f14678934cb',
			fine: '56cb91bdc3464f14678934cg',
			date: Date.now()
		}
	]
};
// console.log( User );
const updatedMock = Object.assign( mock, { penalties: updateValue } );

// eslint-disable-next-line no-undef
describe( testName, tests.CRUD( url, false, User, { new: mock, update: { mock: updatedMock, test: "penalties" } } ) );
