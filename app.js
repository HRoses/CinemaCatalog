/*
    node "L13. Middleware/server.js"
    127.0.0.1:8080/api/v1/movies
*/

const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoute');
let app = express();


app.use(express.json());
// method 2: middlewares built in with `app.use(functionHere)`
app.use((request, response, next) => {
    // `request.requestedAt` can be used anywhere now
    // because `requestedAt` is added to `request`
    request.requestedAt = new Date().toISOString();
    next();
});


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    // now this information `GET /api/v1/movies/4 200 2.561 ms - 99`
}

app.use('/api/v1/movies', moviesRouter);

// 127.0.0.1:8080/templates/demo.html
app.use(express.static('./public')); 

// export the app (this file)
module.exports = app;