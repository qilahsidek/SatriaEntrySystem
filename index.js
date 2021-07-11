const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const GuestModel = require('./models/guestmodels');
const guestRoute = require('./routes/guestroutes');

const PORT = process.env.PORT || 5000

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//routes
app.use('/api/guest', guestRoute);


//connect to mongodb
mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false},
    )
    .then(() => {
        console.log("Connected to MongoDb");
    })
    .catch(err => { 
        console.error("Error while connecting to the MongoDb", err);
    });

app.listen(PORT, () => {
    console.log("Server start at port ", PORT);
});