// ALL THE ROUTE HANDLERS FUNCTIONS ARE CONTAINED HERE
// checkId is a middlewarefunction

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
exports.getAllMovies = function (request, response) {


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
exports.getMovie = (request, response) => {

};


// 4) PATCH - send only partial body data
exports.updateMovie = (request, response) => {

};


// 5) DELETE - using ID ` /:id `
exports.deleteMovie = (request, response) => {

};
