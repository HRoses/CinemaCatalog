# Movies API designed using MVC Architecture 

### Technology Used: Node JS | Express JS | MongoDB (mongoose)

### Progress:
> As of July 25th, 2023
* Currently implemented routes and connection to MongoDB Atlas
for HTTP Methods:- GET, POST, PATCH, DELETE 
* Currently only able to query by movie ID
* Custom script (--delete/--add) from JSON file to database 
* Sort, Limit, Pagination, Custom Alias Route Implemented 

### Endpoints 
* GetAllMovies = /movies
* GetMovieByID = /movies/id
* GetMovieBySort = /movies/?sort=* 
* GetMovieByFields = /movies/?fields=*,*
* GetMoviePagination = /movies/?page=1&limit=*
* GetHighestRated = /movies/highest-rated
* PostMovie = /movies
* DeleteMovie = /movies/id
* updateMovie = /movies/id

### Pending: 
* Advance query such as sort, limit, etc.
* Front end interface
* Api Features class
* Docs

#### Example of Movie Document
![movieDocument](https://github.com/HRoses/MVC-Architecture/assets/105571947/a5a969af-6244-42fd-9e60-bdba1be2e8e5)
