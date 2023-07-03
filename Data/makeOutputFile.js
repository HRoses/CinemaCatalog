const myMovies = [{
    name: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    duration: 178, // minutes
    ratings: 8.8, // out of 10
    totalRating: 1.7, // million
    releaseYear: 2001,
    releaseDate: "2001-12-19",
    createdAt: "2023-07-03",
    genres: ["Adventure", "Drama", "Fantasy"],
    directors: ["Peter Jackson"],
    coverImage: "https://upload.wikimedia.org/wikipedia/en/0/0c/The_Fellowship_Of_The_Ring.jpg",
    actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom", "Sean Bean"],
    price: 24.99
},
{
    name: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: 152, // minutes
    ratings: 9.0, // out of 10
    totalRating: 2.4, // million
    releaseYear: 2008,
    releaseDate: "2008-07-18",
    createdAt: "2023-07-03",
    genres: ["Action", "Crime", "Drama"],
    directors: ["Christopher Nolan"],
    coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    price: 29.99
},
{
    name: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    duration: 148, // minutes
    ratings: 8.8, // out of 10
    totalRating: 2.1, // million
    releaseYear: 2010,
    releaseDate: "2010-07-16",
    createdAt: "2023-07-03",
    genres: ["Action", "Adventure", "Sci-Fi"],
    directors: ["Christopher Nolan"],
    coverImage: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
    price: 19.99
}
];


const fs = require('fs');

fs.writeFile('./Data/movies.json', JSON.stringify(myMovies), function (err) {
       
    if(err){
        console.log(err);
    }
    console.log(`file conversion complete`); 
});


