
// ALL THE  MOVIE ROUTES ARE CONTAINED HERE

const express = require('express');
// import moviesController which is all functions
const moviesController = require('../Controllers/moviesController');

// 1) express.Router() - custom route handlers
const moviesRouter = express.Router();

// adding aliasing route with preset fields for req. 
moviesRouter.route('/highest-rated').get(moviesController.getHighestRated, moviesController.getAllMovies);


// post method has chaining of middleware to check request body
// other example: we can also add a validate user method to it
moviesRouter.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.createMovie); // chaining middlware example

moviesRouter.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

// export the moviesRouter -- `ITS MODULE.EXPORTS ALWAYS!`
module.exports = moviesRouter; 