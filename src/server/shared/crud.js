const mongoose = require( 'mongoose' );
const express = require( 'express' );
const messages = require( './messages' );
mongoose.Promise = require( 'bluebird' );

module.exports = {
	defineRoutes: ( Model, routes = {}, router = express.Router() ) => {
		const collectionName = Model.collection.collectionName;

		try {
			if ( !Model ) {
				throw new Error( 'You must pass a valid model!' );
			}
		} catch ( err ) {
			throw err;
			return 0;
		}

		if ( routes.alt ) {
			for ( const route of routes.alt ) {
				router[route.method]( route.path, route.func );
			}
		}

		router.get( '/', ( req, res ) => {
			if ( routes.getAll ) {
				routes.getAll( req, res );
			} else {
				Model.find( {} )
					.then( ( items ) => {
						res.json( { success: true, list: items } );
					} )
					.catch( ( err ) => {
						res.json( { success: false, error: messages.error.whileFetching( collectionName ) } );
					} );
			}
		} );

		router.post( '/', ( req, res ) => {
			if ( routes.postOne ) {
				routes.postOne( req, res );
			} else {
				const newItem = new Model( req.body );

				newItem.created = new Date();

				newItem.save()
					.then( ( result ) => {
						res.json( { success: true, message: messages.success.created( collectionName ), result } );
					} )
					.catch( ( err ) => {
						res.json( { success: false, error: messages.error.whileCreating( collectionName ) } );
					} );
			}
		} );

		router.get( '/:id', ( req, res ) => {
			if ( routes.getById ) {
				routes.getById( req, res );
			} else {
				Model.findOne( { '_id': req.params.id } )
					.then( ( item ) => {
						res.json( { success: true, item } );
					} )
					.catch( ( err ) => {
						res.json( { success: false, error: messages.error.whileFetching( collectionName ) } );
					} );
			}
		} );

		router.put( '/:id', ( req, res ) => {
			if ( routes.updateById ) {
				routes.updateById( req, res );
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
						res.json( { success: false, error: messages.error.whileUpdating( collectionName ) } );
					} );
			}
		} );

		router.delete( '/:id', ( req, res ) => {
			if ( routes.deleteById ) {
				routes.deleteById( req, res );
			} else {
				Model.remove( { _id: req.params.id }, ( err, result ) => {
					if ( err ) {
						res.json( { success: false, error: messages.error.whileDeleting( collectionName ) } );
					} else {
						res.json( { success: true, message: messages.success.deleted( collectionName ) } );
					}
				} );
			}
		} );

		return router;
	}
};
