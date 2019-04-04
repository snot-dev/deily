const mongoose = require( 'mongoose' );
const Penalty = require( '../models/penalty' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "CRUD Penalty";
const url = "/api/penalties/";

const mock = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678123cb' ),
	user: ['56cb91bdc3464f14274854cb'],
	fine: {
		_id: '56cb91bdc3464f14274890cb',
		name: "Simple",
		amount: 1,
		description: "This is a simple fine"
	},
	date: Date.now(),
	paid: false
};

const updateValue = true;

const copiedMock = Object.assign( {}, mock );
const updatedMock = Object.assign( copiedMock, { paid: updateValue } );

// eslint-disable-next-line no-undef
describe( testName, tests.CRUD( url, false, Penalty, { new: mock, update: { mock: updatedMock, test: "paid" } } ) );
