// ALL THE ROUTE HANDLERS FUNCTIONS ARE CONTAINED HERE
// REFER TO MONGOOSE DOCS HERE -- USED IN ALL HTTP METHODS
// https://mongoosejs.com/docs/api/model.html 


const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../Utils/ApiFeatures'); 



/*
// validateBody is a middleware
exports.validateBody = function (request, response, next) {
    if (!request.body.name || !request.body.releaseYear) {
        return response.status(400).JSON({
            status: "Fail",
            message: "Not Valid Movie Data - Must Have name and releaseYear"
        });
    }
    next();
};
*/

// A CUSTOM  for highest rated movie get req by prefilling `limit` and `sort` fields using middleware approach 
// http://127.0.0.1:8080/api/v1/movies/highest-rated
exports.getHighestRated = (req, res, next) => {
    req.query.limit = '2';
    req.query.sort = '-ratings';

    next();
}

// 1) GET - /api/v1/movies Syntax: .get(url, routehandler(callback function) )
// console.log(request.query);  will return objects `key-value pair`
exports.getAllMovies = async function (request, response) {
    // SORTING: http://127.0.0.1:8080/api/v1/movies/?sort=-price
    // LIMITING IS CALLED PROJECTION IN MONGODB
    // LIMITING: http://127.0.0.1:8080/api/v1/movies/?fields=name,price,description

    // greater than: http://127.0.0.1:8080/api/v1/movies/?duration[gte]=178 
    // use  const movies = await Movie.find(queryFixed);

    // using simple movies.find(request.query) 
    //http://127.0.0.1:8080/api/v1/movies/?name=The%20Dark%20Knight 

    // PAGINATION: http://127.0.0.1:8080/api/v1/movies//?page=1&limit=2
    try {
            let myQuery = Movie.find(); 
            const features = new ApiFeatures(myQuery, request.query);        
        
        /* excludes fields from request.query*/
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        const queryObj = { ...request.query };
        // console.log(queryObj);
        excludeFields.forEach((el) => {
            delete queryObj[el];
        })
        // console.log(queryObj);

        /*   using mongoose methods to advance filter by greater than less than
        const movieFind = await Movie.find()
            .where('duration')
            .gte(request.query.duration)
            .where('ratings')
            .gte(request.query.ratings);
        */

        // ex: req.query = { duration: { '$gte': '170' } }
        let queryStr = JSON.stringify(request.query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,
            (match) => {
                return `$${match}`
            }); // replace all occurances of gte... global
        const queryFixed = JSON.parse(queryStr);
        // console.log(queryFixed);

        /* SORTING LOGIC */
        //console.log(movies);
        // mongoose sort can only be used on query object
        if (request.query.sort) {
            // if req query [object] has a `sort` property(key)
            myQuery = myQuery.sort(request.query.sort);
        } else {
            //default sort
            myQuery = myQuery.sort('-createdAt');
        }

        /* LIMITING LOGIC - BY FIELDS*/
        if (request.query.fields) {
            const fields = request.query.fields.split(',').join(' ');
            myQuery.select(fields);
            // `select` from mongoose query
        } else {
            myQuery.select('-__v'); // do not include this __v (used by mongodb internally)
        }


        /* PAGINATION LOGIC - MOONGOOSE METHOD https://mongoosejs.com/docs/api/aggregate.html*/
        const page = request.query.page * 1 || 1; // user specifies page
        const limit = request.query.limit * 1 || 10; // user specifies limit
        // Page1: 1-10, Page2: 11-20, Page3: 21-30
        const skip = (page - 1) * limit;
        myQuery = myQuery.skip(skip).limit(limit);
        // `skip` from mongoose query
        if (request.query.page) {
            const moviesCount = await Movie.countDocuments();
            if (skip >= moviesCount) {
                throw new Error('This page is not found!');
            }
        }


        const movies = await myQuery;
        //  const movies = await Movie.find(queryFixed);

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
