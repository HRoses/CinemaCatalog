const mongoose = require('mongoose');
const fs = require('fs');
/* mongoose schema and validation - notice `name` and `duration` are required field. */
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Validation MSG: Name is Required Field - String Only'],
        unique: true, // each name added uniquely
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
        type: Number
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
        fs.writeFileSync('./Log/log.txt', content, { flag: 'a' }, (error) => { console.log(error.message); }); 
        next(); 
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;




/* Excluding fields from schema to not show to the user
createdAt: {
        type: Date,
        default: Date.now(),
        select: false       <--------
    }
*/ 