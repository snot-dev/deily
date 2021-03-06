const mongoose = require( 'mongoose' );
const Fine = require( '../models/fine' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "CRUD Fines";
const url = "/api/fines/";

const mock = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678853cb' ),
	name: "missed",
	amount: 0.5,
	description: "This is a fine"
};

const updateValue = 2.5;

const copiedMock = Object.assign( {}, mock );
const updatedMock = Object.assign( copiedMock, { amount: updateValue } );

// eslint-disable-next-line no-undef
describe( testName, tests.CRUD( url, false, Fine, { new: mock, update: { mock: updatedMock, test: "amount" } } ) );
