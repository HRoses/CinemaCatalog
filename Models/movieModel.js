const mongoose = require('mongoose');

/* mongoose schema and validation - notice `name` and `duration` are required field. */
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Validation MSG: Name is Required Field - String Only'],
        unique: true // each name added uniquely
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Validation MSG: Duration is Required Field - Number Only']
    },
    ratings: {
        type: Number,
        default: 1.0 // default value added 
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie; 