const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const jwt = require( 'jwt-simple' );
const User = require( '../users/model' );
const server = require( '../../../app' );
const helpers = require( './helpers' );

const should = chai.should();
chai.use( chaiHttp );

class Tests {
	constructor() {
		this._token = null;
		this._userId = null;
		this._createdItem = false;
		this._mockUser = {
			username: "Tester",
			email: "tester@tagus.com",
			password: helpers.generateRandomPassword(),
			name: "Tagus",
			surname: "Tester",
			created: new Date(),
			isAdmin: true
		};
	}

	CRUD( url, Model, mocks = {}, validation = {} ) {
		return () => {
			before( "Create test user", this.beforeTest( Model, mocks, validation.before ) );

			after( "Delete test user", this.afterTest( Model, mocks, validation.after ) );

			it( "Create new Item", this.createNew( url, Model, mocks.new, validation.create ) );

			it( "List all items", this.getAll( url, Model, validation.list ) );

			it( "List one item", this.getById( url, Model, mocks.new._id, validation.single ) );

			it( "Update item field", this.update( url, Model, mocks.update, validation.update ) );

			it( 'Delete Created Item', this.deleteById( url, Model, mocks.new._id, validation.delete ) );
		};
	}


	createNew( url, Model, payload, validation ) {
		return ( done ) => {
			this._createNew( url, Model, payload, validation )
				.then( () => {
					done();
				} )
				.catch( this._failTest( done ) );
		};
	}

	getAll( url, Model, validation ) {
		return ( done ) => {
			this._getAll( url, Model, validation )
				.then( () => {
					done();
				} )
				.catch( this._failTest( done ) );
		};
	}

	getById( url, Model, id, validation ) {
		return ( done ) => {
			this._getById( url, Model, id, validation )
				.then( () => {
					done();
				} )
				.catch( this._failTest( done ) );
		};
	}

	update( url, Model, payload, validation ) {
		return ( done ) => {
			this._update( url, Model, payload, validation )
				.then( () => {
					done();
				} )
				.catch( this._failTest( done ) );
		};
	}

	deleteById( url, Model, id, validation ) {
		return ( done ) => {
			this._deleteById( url, Model, id, validation )
				.then( () => {
					done();
				} )
				.catch( this._failTest( done ) );
		};
	}

    // Creates a new user to get authorization to interact with the API and deletes any mock that still persists
	beforeTest( Model, mocks = {}, validation = {}, generateToken = true ) {
		return ( done ) => {
			this._createMockUser( generateToken )
				.then( () => {
					if ( mocks.new ) {
						return this._deleteMockIfStillExists( Model, mocks.new );
					}
					return true;
				} )
				.then( () => {
					done();
				} )
				.catch( ( err ) => {
					done( err );
				} );
		};
	}

    // Deletes the user previous creates to get authorization to interact with the API and deletes any mock that still persists
	afterTest( Model, mocks = {}, validation = {} ) {
		return ( done ) => {
			this._deleteMockUser()
				.then( () => {
					if ( mocks.new ) {
						return this._deleteMockIfStillExists( Model, mocks.new );
					}
					return true;
				} )
				.then( () => {
					done();
				} )
				.catch( ( err ) => {
					done( err );
				} );
		};
	}

	getMockUser() {
		return this._mockUser;
	}

	requestGet( url, validation ) {
		return ( done ) => {
			this._requestGet( url, validation )
				.then( () => {
					done();
				} )
				.catch( ( err ) => {
					done( err );
				} );
		};
	}

	requestGetWithHeader( url, validation ) {
		return ( done ) => {
			this._requestGetWithHeader( url, validation )
				.then( () => {
					done();
				} )
				.catch( ( err ) => {
					done( err );
				} );
		};
	}

	requestPost( url, payload, validation ) {
		return ( done ) => {
			this._requestPost( url, payload, validation )
				.then( () => {
					done();
				} )
				.catch( ( err ) => {
					done( err );
				} );
		};
	}

	_createMockUser( generateToken = true, done ) {
		return new Promise( ( resolve, reject ) => {
			const user = new User( this._mockUser );

			user.password = user.generateHash( user.password );

			user.save()
				.then( ( result ) => {
					this._userId = result._id;
					if ( generateToken ) {
						this._token = jwt.encode( { id: result._id }, process.env.AUTHSECRETORKEY );
					}

					if ( done ) {
						done();
					}
					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_deleteMockUser( done ) {
		return new Promise( ( resolve, reject ) => {
			User.remove( { _id: this._userId }, ( err, result ) => {
				this._token = null;
				this._userId = null;

				if ( done ) {
					done();
				}
				resolve();
			} )
				.catch( ( err ) => {
					if ( done ) {
						done( err );
					}
					reject( err );
				} );
		} );
	}

	_deleteMockIfStillExists( Model, mock ) {
		return Model.remove( { _id: mock._id } );
	}

	_requestGet( url, validation ) {
		return new Promise( ( resolve, reject ) => {
			chai.request( server )
				.get( url )
				.then( ( res ) => {
					this._validRequest( res, validation );
					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_requestPost( url, payload, validation ) {
		return new Promise( ( resolve, reject ) => {
			chai.request( server )
				.post( url )
				.send( payload )
				.then( ( res ) => {
					this._validRequest( res, validation );
					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_requestGetWithHeader( url, validation ) {
		return new Promise( ( resolve, reject ) => {
			chai.request( server )
				.get( url )
				.set( 'Authorization', `Bearer ${this._token}` )
				.then( ( res ) => {
					this._validRequest( res, validation );
					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}


	_validRequest( res, validation ) {
		res.should.have.status( 200 );
		res.should.be.json;
		res.body.should.be.a( 'object' );

		if ( validation ) {
			validation( res );
		}
	}

	_createNew( url, Model, payload, validation ) {
		return new Promise( ( resolve, reject ) => {
			chai.request( server )
				.post( url )
				.set( 'Authorization', `Bearer ${this._token}` )
				.send( payload )
				.then( ( res ) => {
					this._validRequest( res );
                    // res.body.success.should.to.equal(true);

					if ( validation ) {
						validation( res );
					} else {
						const instance = new Model( res.body.result );

						should.not.exist( instance.validateSync() );
					}

					this._createdItem = true;
					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_getAll( url, Model, validation ) {
		return new Promise( ( resolve, reject ) => {
			chai.request( server )
				.get( url )
				.set( 'Authorization', `Bearer ${this._token}` )
				.then( ( res ) => {
					this._validRequest( res );
					res.body.success.should.to.equal( true );

					if ( validation ) {
						validation( res );
					} else {
						res.body.list.should.be.a( 'array' );
						res.body.list.forEach( ( doc ) => {
							const instance = new Model( doc );
							should.not.exist( instance.validateSync() );
						} );
					}

					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_getById( url, Model, id, validation ) {
		return new Promise( ( resolve, reject ) => {
			if ( !id ) {
				reject( Error( "You must pass a valid id" ) );
			}

			chai.request( server )
				.get( `${url}${id}` )
				.set( 'Authorization', `Bearer ${this._token}` )
				.then( ( res ) => {
					this._validRequest( res );
					res.body.success.should.to.equal( true );

					if ( validation ) {
						validation( res );
					} else {
						const instance = new Model( res.body.item );

						should.not.exist( instance.validateSync() );
					}

					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_update( url, Model, payload, validation ) {
		return new Promise( ( resolve, reject ) => {
			chai.request( server )
				.put( `${url}${payload.mock._id}` )
				.send( payload.mock )
				.set( 'Authorization', `Bearer ${this._token}` )
				.then( ( res ) => {
					this._validRequest( res );
					res.body.success.should.to.equal( true );

					if ( validation ) {
						validation( res );
					} else {
						const instance = new Model( res.body.result );

						instance[payload.test].should.to.equal( payload.mock[payload.test] );

						should.not.exist( instance.validateSync() );
					}

					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_deleteById( url, Model, id, validation ) {
		return new Promise( ( resolve, reject ) => {
			chai.request( server )
				.delete( `${url}${id}` )
				.set( 'Authorization', `Bearer ${this._token}` )
				.then( ( res ) => {
					this._validRequest( res );
					res.body.success.should.to.equal( true );

					if ( validation ) {
						validation( res );
					}

					this._createdItem = false;
					resolve();
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}

	_failTest( done ) {
		return ( err ) => {
			done( err );
		};
	}
}

module.exports = Tests;
