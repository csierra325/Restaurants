const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const RestaurantPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

//Model
const RestaurantPost = mongoose.model('RestaurantPost', RestaurantPostSchema);

module.exports = RestaurantPost;