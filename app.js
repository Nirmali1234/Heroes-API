const express = require('express');
const mongoose = require('mongoose');
const heroes = require('./routes/heroes');
const home = require('./routes/home');
const authenticator = require ("./middlewares/authenticator");
const email = require ("./middlewares/emailjob");
const app = express();
const PORT = 3000;

app.use(express.json()); //Catch json data in the request body
app.use(authenticator);
app.use(email);
app.use('/api/heroes',heroes);
app.use('./', home);

mongoose //database connection string
        .connect("mongodb://localhost/herodb",{useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to Db successfully..."))
        .catch(err => console.log("Error has occured while connecting to db : ", err));

app.listen(PORT, function() {
    console.log("Listening on port - " + PORT);
});
