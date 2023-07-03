const movie = {
    name: "test1",
    description: " test.",
    duration: 136, // minutes
    ratings: 8.7, // out of 10
    totalRating: 1.7, // million
    releaseYear: 1999,
    releaseDate: "1999-03-31",
    genres: ["Action", "Sci-Fi"],
    directors: ["Lana Wachowski", "Lilly Wachowski"],
    coverImage: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    price: 19.99 // dollars
};

const movieJSON = JSON.stringify(movie);
console.log(movieJSON);
