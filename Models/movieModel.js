const mongoose = require('mongoose');
const fs = require('fs');
/* mongoose schema and validation - notice `name` and `duration` are required field. 
and maxlength(String), max(number) , enum(Arrays) */
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Validation MSG: Name is Required Field - String Only'],
        unique: true, // each name added uniquely
        maxlength: [100, "Movie name cannot have more than 100 chars"],
        minlength: [3, "Movie name cannot be less than 3 chars"],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Validation MSG: Description is Requied Field - String Only'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Validation MSG: Duration is Required Field - Number Only']
    },
    ratings: {
        type: Number,
        min: 1,
        max: [10, 'rating cannot be more than 10']
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'Validation MSG: releaseYear is Required Field - Number Only']
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    genres: {
        type: [String], // array
        required: [true, 'Validation MSG: genre is Required Field']
        // *Todo: Hold *enum: {
        //    value: ["Action", "Adventure", "Biography", "Fantasy", "Crime"]
        //    message: "This movie genre does not exist!"  
        // }
    },
    directors: {
        type: [String],
        required: [true, 'Validation MSG: directors is Required Field']
    },
    coverImage: {
        type: String,
        required: [true, 'Validation MSG: cover Image is Required Field']
    },
    actors: {
        type: [String],
        required: [true, 'Validation MSG: actors is Required Field']
    },
    price: {
        type: Number,
        required: [true, 'Validation MSG: price is Required Field']
    },
    createdBy: String,
},
    // options in schema
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

// reminder: arrow function doesnt have `this` keyword 
// virtual properties are not part of schema, cannot be used to query 
movieSchema.virtual('durationInHours').get(function () {
    return this.duration / 60;
});

// pre hook mongodb middleware function 
// `this` keyword points to document
// Executed before the document is saved in DB
// .save() or .create() -> `post`
movieSchema.pre('save', function (next) {
    // access to the doc which is being saved using `this`
    //console.log(this); 
    // added field `createdby` in schema
    this.createdBy = 'User_Rose';
    next();
});

// post hook mongodb middleware function 
movieSchema.post('save', function (doc, next) {
    const content = `New Movie doc with name ${doc.name} has been created by ${doc.createdBy} \n`;
    // log to file
    fs.writeFileSync('./Log/log.txt', content, { flag: 'a' }, (error) => { console.log(error.message); });
    next();
});

// pre query middleware - `this` points to query
// wont able to see movies `created` in future.
// for all the find methods, findOne, findByID.. etc
// in getMovies/getMoviesByID/etc
// executed before find method fetched all docs
movieSchema.pre(/^find/, function (next) {
    this.find({ releaseDate: { $lte: Date.now() } })
    this.startTime = Date.now();
    next();
});

// post query middleware
// executed after find method fetched all docs
movieSchema.post(/^find/, function (docs, next) {
    this.find({ releaseDate: { $lte: Date.now() } })
    this.endTime = Date.now();
    // `this.find` converts Date.now() to appropriate date 
    // log to file
    const content = `Query took ${this.endTime - this.startTime} milliseconds to fetch the documents. \n`
    fs.writeFileSync('./Log/log.txt', content, { flag: 'a' }, (error) => { console.log(error.message); });
    next();
})

// aggregation middleware
// show only movies release till date
// /movie-stats see id: 2023
movieSchema.pre('aggregate', function (next) {
    // console.log(this); // console.log(this.pipeline()); 
    this.pipeline().unshift({ $match: { releaseDate: { $lte: new Date() } } });
    // aggregation pipeline object
    // unshift add beginining of array a new pipeline stage
    next();
});




const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

/*
    Important Reference: https://mongoosejs.com/docs/middleware.html
    find `Document Middleware` and `Query Middleware`

    Mongoose validators: https://mongoosejs.com/docs/validation.html
    look at built in validators and custom validators!

    */


/* 
  Excluding fields from schema to not show to the user
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false       <--------
    }
   
  Schema options to display virtual properties  
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


*/ 