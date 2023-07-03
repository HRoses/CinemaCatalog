const fs = require('fs'); // read file from here
const mongoose = require('mongoose');
const Movie = require('./Models/movieModel'); 
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


async function connectToDB() {

    try {
        const connection = await mongoose.connect(process.env.CONN_STR, {
            useNewUrlParser: true
        });
        console.log(`Connected to DB`); 
    } catch (error) {
        console.log(error.message);
    }

};

connectToDB(); 

async function myMovies(){
    const m = await Movie.find({name:'The Matrix'}, {description:false, coverImage:false, actors:false}); 
    console.log(m);
}


myMovies(); 




