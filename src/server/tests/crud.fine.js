const mongoose = require( 'mongoose' );
const Fine = require( '../models/fine' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "CRUD Fines";
const url = "/api/fine/";

const mock = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678853cb' ),
	name: "missed",
	amount: 1.0,
	description: "This is a fine"
};

const updateValue = 2.0;

const updatedMock = Object.assign( { amount: updateValue }, mock );

// eslint-disable-next-line no-undef
describe( testName, tests.CRUD( url, false, Fine, { new: mock, update: { mock: updatedMock, test: "amount" } } ) );
