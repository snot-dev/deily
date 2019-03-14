const mongoose = require( 'mongoose' );
const Team = require( '../models/team' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "CRUD Teams";
const url = "/api/teams/";

const mock = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678854cb' ),
	name: "Test Team",
	users: ['56cb91bdc3464f14274854cb'],
	createdAt: Date.now(),
	createdBy: '56cb91bdc3464f14274854cb',
	penalties: []
};

const updateValue = "Test Team Updated";

const copiedMock = Object.assign( {}, mock );
const updatedMock = Object.assign( copiedMock, { name: updateValue } );

// eslint-disable-next-line no-undef
describe( testName, tests.CRUD( url, false, Team, { new: mock, update: { mock: updatedMock, test: "name" } } ) );
