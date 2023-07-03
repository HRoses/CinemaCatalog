const mongoose = require('mongoose');

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
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie; 