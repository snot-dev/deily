const express = require( 'express' );
const mongoose = require( 'mongoose' );
const messages = require( './messages' );
mongoose.Promise = require( 'bluebird' );

const createControllers = ( Model, alt = {} ) => {
	const collectionName = Model.collection.collectionName;

	try {
		if ( !Model ) {
			throw new Error( 'You must pass a valid model!' );
		}
	} catch ( err ) {
		throw err;
		return 0;
	}

	return {
		getAll: ( req, res ) => {
			if ( alt.getAll ) {
				alt.getAll( req, res );
			} else {
				Model.find( {} )
					.then( ( items ) => {
						res.json( { success: true, collectionName, list: items } );
					} )
					.catch( ( err ) => {
						res.json( { success: false, error: messages.error.whileFetching( collectionName ), details: err } );
					} );
			}
		},
		getOne: ( req, res ) => {
			if ( alt.getOne ) {
				alt.getOne( req, res );
			} else {
				Model.findOne( { '_id': req.params.id } )
					.then( ( item ) => {
						res.json( { success: true, item } );
					} )
					.catch( ( err ) => {
						res.json( { success: false, error: messages.error.whileFetching( collectionName ), details: err } );
					} );
			}
		},
		create: ( req, res ) => {
			if ( alt.create ) {
				alt.create( req, res );
			} else {
				const newItem = new Model( req.body );
				newItem.created = new Date();
				newItem.save()
					.then( ( result ) => {
						res.json( { success: true, message: messages.success.created( collectionName ), result } );
					} )
					.catch( ( err ) => {
						res.json( { success: false, error: messages.error.whileCreating( collectionName ), details: err } );
					} );
			}
		},
		update: ( req, res ) => {
			if ( alt.update ) {
				alt.update( req, res );
			} else {
				Model.findOne( { '_id': req.params.id } )
					.then( ( doc ) => {
						const updatedDoc = Object.assign( doc, req.body );

						return updatedDoc.save();
					} )
					.then( ( result ) => {
						res.json( { success: true, message: messages.success.updated( collectionName ), result } );
					} )
					.catch( ( err ) => {
						res.json( { success: false, error: messages.error.whileUpdating( collectionName ), details: err } );
					} );
			}
		},
		delete: ( req, res ) => {
			if ( alt.delete ) {
				alt.delete( req, res );
			} else {
				Model.deleteOne( { _id: req.params.id }, ( err, result ) => {
					if ( err ) {
						res.json( { success: false, error: messages.error.whileDeleting( collectionName ), details: err } );
					} else {
						res.json( { success: true, message: messages.success.deleted( collectionName ) } );
					}
				} );
			}
		}
	};
};

exports.createControllers = createControllers;

exports.createRoutes = ( Model, alt = {} ) => {
	const router = express.Router();
	const controllers = createControllers( Model, alt );

	router.get( '/', controllers.getAll );
	router.post( '/', controllers.create );
	router.get( '/:id', controllers.getOne );
	router.put( '/:id', controllers.update );
	router.delete( '/:id', controllers.delete );

	return router;
};
