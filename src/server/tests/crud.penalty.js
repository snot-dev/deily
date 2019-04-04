const mongoose = require( 'mongoose' );
const Penalty = require( '../models/penalty' );
const User = require( '../models/user' );
const Team = require( '../models/team' );
const SharedTests = require( '../shared/tests' );

const tests = new SharedTests();
const testName = "CRUD Penalty";
const url = "/api/penalties/";
const userUrl = '/api/users';
const teamUrl = '/api/teams';

const penalty = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678123cb' ),
	user: 'test@test.com',
	fine: {
		_id: '56cb91bdc3464f14274890cb',
		name: "Simple",
		amount: 1,
		description: "This is a simple fine"
	},
	team: '56cb91bdc3464f14678936cb',
	date: Date.now(),
	paid: false
};

const user = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678934cb' ),
	name: 'test',
	email: 'test@test.com',
	username: 'test',
	creator: false,
	team: '56cb91bdc3464f14678936cb',
	googleId: 'thisIsAMockGoogleUserId'
};

const team = {
	_id: new mongoose.mongo.ObjectId( '56cb91bdc3464f14678936cb' ),
	name: "User Test Team",
	createdBy: '56cb91bdc3464f14274854cb'
};

const updateValue = true;

const copiedMock = Object.assign( {}, penalty );
const updatedMock = Object.assign( copiedMock, { paid: updateValue } );

// eslint-disable-next-line no-undef
describe( testName, () => {
	it( "Clean Up User", tests.cleanUp( User ) ); // eslint-disable-line no-undef

	it( "Clean Up Team", tests.cleanUp( Team ) ); // eslint-disable-line no-undef

	it( "Clean Up Penalty", tests.cleanUp( Penalty ) ); // eslint-disable-line no-undef

	it( "Create Team before Penalty", tests.createNew( teamUrl, Team, team ) ); // eslint-disable-line no-undef

	it( "Create new User before Penalty", tests.requestPost( userUrl, user, ( res, should ) => { // eslint-disable-line no-undef
		res.body.success.should.to.equal( true );
		res.body.result.should.be.a( 'object' );
		const newUser = new User( res.body.result.user );
		const validationError = newUser.validateSync();

		if ( validationError ) {
			throw validationError;
		}

		should.not.exist( validationError );

		res.body.result.team.users.includes( res.body.result.user._id ).should.to.equal( true );
	} ) );

	it( "Create new Item", tests.requestPost( url, penalty, ( res, should ) => { // eslint-disable-line no-undef
		res.body.success.should.to.equal( true );
		res.body.result.should.be.a( 'object' );
		const newPenalty = new Penalty( res.body.result.penalty );
		const validationError = newPenalty.validateSync();

		if ( validationError ) {
			throw validationError;
		}

		should.not.exist( validationError );

		res.body.result.user.penalties.includes( res.body.result.penalty._id ).should.to.equal( true );
	} ) );

	it( "List all items", tests.getAll( url, Penalty ) ); // eslint-disable-line no-undef

	it( "List one item", tests.getById( url, Penalty, penalty._id ) ); // eslint-disable-line no-undef

	it( "Update item field", tests.update( url, Penalty, { mock: updatedMock, test: "paid" } ) ); // eslint-disable-line no-undef

	it( 'Delete Created Item', tests.deleteById( url, Penalty, penalty._id ) ); // eslint-disable-line no-undef

	it( "Clean Up User", tests.cleanUp( User ) ); // eslint-disable-line no-undef

	it( "Clean Up Team", tests.cleanUp( Team ) ); // eslint-disable-line no-undef
} );
