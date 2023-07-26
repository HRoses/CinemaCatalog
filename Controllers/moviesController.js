// ALL THE ROUTE HANDLERS FUNCTIONS ARE CONTAINED HERE
// REFER TO MONGOOSE DOCS HERE -- USED IN ALL HTTP METHODS
// https://mongoosejs.com/docs/api/model.html 


const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../Utils/ApiFeatures');

// A middleware to get the highest-rated movies by setting `limit` and `sort` property -> movies/highest-rated
exports.getHighestRated = (request, response, next) => {
    request.query.limit = '2';
    request.query.sort = '-ratings';

    next();
}

// 1) GET - /api/v1/movies Syntax: .get(url, routehandler(callback function) )
// console.log(request.query);  will return objects `key-value pair`
exports.getAllMovies = async function (request, response) {
    try {
        let myQuery = Movie.find();
        let features = new ApiFeatures(myQuery, request.query)
            .sort()
            .limitFields()
            .paginate();

        // omit .filter() - todo: fix pending
        let movies = await features.query;

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


// Aggregation pipeline - result of one stage = input of next stage
// creating statistics about movie. 
exports.getMovieStats = async (request, response) => {
    try {
        // [] contains aggregation states,-> only using `match` and `groupby`
        // each movie will go throught this aggregation
        // stage 1- rating over 1 
        // stage 2- applied on stage 1 
        // stage 3- applied to stage 2
        const stats = await Movie.aggregate([
            {
                $match: {
                    ratings: { $gte: 1 }
                }
            },
            {
                $group: {
                    _id: '$releaseYear', // try _id:null
                    avgRating: { $avg: '$ratings' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                    priceTotal: { $sum: '$price' },
                    movieCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    minPrice: 1 // asc order
                }
            }
        ]);

        response.status(200).json({
            status: 'Success',
            count: stats.length,
            data: stats
        });

    } catch (error) {
        response.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
};

// Aggregation: $unwind - destructuring Array 
// /movies/movie-by-genre/:genre
exports.getMovieByGenre = async function (request, response) {
    try {
        let genreStr = request.params['genre'];
        genreStr = genreStr.charAt(0).toUpperCase() + genreStr.slice(1,genreStr.length); 
        console.log(genreStr);
        const movies = await Movie.aggregate([
            {
                $unwind: '$genres'
            },
            {
                $group: {
                    _id: '$genres',
                    movieCount: { $sum: 1 },
                    movies: { $push: '$name' }
                }
            },
            {
                $addFields: { genre: '$_id' }
            },
            {
                $project: {
                    _id: 0 // dont want id in movie
                }
            },
            {
                $sort: { movieCount: -1 }
            }, 
            {
                $match: {genre: genreStr}
            }
        ]);

        response.status(200).json({
            status: 'Success',
            count: movies.length,
            data: movies

        });

    } catch (error) {

        response.status(404).json({
            status: 'Fail',
            message: error.message
        })

    }


};


