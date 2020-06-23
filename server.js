const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');
// const mongoDB_URI = 'mongodb+srv://csierra:merrychristmas@restaurantdb-9zyqi.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect('mongodb://localhost/restaurant', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('mongoose is connected')
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT,console.log(`server is starting at ${PORT}`));
