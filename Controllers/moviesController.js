// ALL THE ROUTE HANDLERS FUNCTIONS ARE CONTAINED HERE
// REFER TO MONGOOSE DOCS HERE -- USED IN ALL HTTP METHODS
// https://mongoosejs.com/docs/api/model.html 


const Movie = require('./../Models/movieModel');


// // validateBody is a middleware
// exports.validateBody = function (request, response, next) {
//     if (!request.body.name || !request.body.releaseYear) {
//         return response.status(400).JSON({
//             status: "Fail",
//             message: "Not Valid Movie Data - Must Have name and releaseYear"
//         });
//     }
//     next();
// };


// 1) GET - /api/v1/movies Syntax: .get(url, routehandler(callback function) )
exports.getAllMovies = async function (request, response) {
    try {
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        const queryObj = { ...request.query };
        // console.log(queryObj);
        excludeFields.forEach((el) => {
            delete queryObj[el];
        })
        // console.log(queryObj);

        
        const movies = await Movie.find(queryObj);
        //console.log(movies);
        response.status(200).json({
            status: "Success",
            length: movies.length,
            data: {
                movies
            }
        });
    }
    catch (err) {
        response.status(404).json({
            status: "Fail",
            message: err.message
        });
    }

};


// 2) POST - /api/v1/movies (create new movie object) 
exports.createMovie = async (request, response) => {
    // const testMovie = new Movie({}); 
    // testMovie.save(); 
    try {

        // straight to MongoDB Atlas Database
        const movie = await Movie.create(request.body);
        response.status(201).json({
            status: "Success",
            data: {
                movie
            },
            message: "Movie created and posted to DB"
        });
    }
    catch (err) {
        console.log(`Error: Something wrong creating movie object and posting to DB`);
        response.status(400).json({
            status: "Fail",
            message: err.message
        });
    }


};


// 3) GET - WITH ROUTING PARAMETERS - /api/v1/movies/id - *:id* is route parameter
exports.getMovie = async (request, response) => {
    try {
        const movie = await Movie.findById(request.params['id']);
        //console.log(movie);
        response.status(200).json({
            status: "Success",
            data: {
                movie
            }
        });
    }
    catch (err) {
        response.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
};


// 4) PATCH - send only partial body data
exports.updateMovie = async (request, response) => {
    try {
        const updateMovie = await Movie.findByIdAndUpdate(request.params['id'], request.body, { new: true, runValidators: true });
        response.status(200).json({
            status: 'Success',
            data: {
                updateMovie
            }
        });
    } catch (error) {
        response.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
};


// 5) DELETE - using ID ` /:id `
exports.deleteMovie = async (request, response) => {
    try {
        const movieDeleted = await Movie.findByIdAndDelete(request.params['id'])
        response.status(200).json({
            status: 'Success',
            data: null
        });
    } catch (error) {
        response.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
};
