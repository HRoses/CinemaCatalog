const fs = require('fs'); // read file from here
const mongoose = require('mongoose');
const Movie = require('./Models/movieModel'); // this is our movie model, which is based on a schema defined in the same file
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


async function connectToDB() {

    try {
        const connection = await mongoose.connect(process.env.CONN_STR, {
            useNewUrlParser: true
        });
        console.log(`Connection to DB: Successful!`);
    } catch (error) {
        console.log(error.message);
    }

};

connectToDB();

// console.log(process.argv);

const movies = JSON.parse(fs.readFileSync('./Data/movies.json', 'utf-8'))

const deleteAllMovies = async () => {
    try {
        // deleting using `Movie` model above
        const del = await Movie.deleteMany({});
        console.log(`Deleted Movies`);
    } catch (error) {
        console.log(error.message);
    } finally {
        process.exit();
    }
}

const addMovies = async function () {
    try {
        await Movie.create(movies);
        console.log(`Added ${(movies).length} Movies to MongoDB Server`);
    } catch (error) {
        console.log(error.message);
    } finally {
        process.exit();
    }
};


if (process.argv[2] === '--add') {
    addMovies();
}

if (process.argv[2] === '--delete') {
    deleteAllMovies();
}


/*
    Creating custom Script

    node readFileFromJSON --add
    node readFileFromJSON --delete
*/







