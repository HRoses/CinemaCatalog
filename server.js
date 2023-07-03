const mongoose = require('mongoose');
const dotenv = require('dotenv');
/* when we are reading the config file, those env file config will be set to node js, meaning we can use `process.env` to get direct access, to read dotenv you need to 
require it and set the path*/
dotenv.config({ path: './config.env' });
const app = require('./app');
const port = process.env.PORT || 3000; 

console.log(app.get('env').toUpperCase() + ` ENVIRONMENT`);

// Connection to MongoDB atlas storage via mongoose
async function connectionToDB() {
    try {
        const conn = await mongoose.connect(process.env.CONN_STR, {
            useNewUrlParser: true
        });
        // console.log(conn);
        console.log(`DB Connection Successful!`); 
    }
    catch (err) {
        console.log(`Some Error Has occcured. Cannot Connect Mongoose to MongoDB server on Atlas`);
    }
};
connectionToDB();



// create a server
app.listen(port, () => {
    console.log("Server has started!");
});
