const express = require('express');
const router = express.Router();
const RestaurantPost = require('../models/restaurants')

router.get('/', (req, res) => {
    RestaurantPost.find({ })
        .then((data) => {
            console.log('Data', data)
            res.json(data);
        })
        .catch((error) => {
            console.log('error', error)
        });
})

router.post('/save', (req, res) => {
    console.log('Body: ', req.body)
    const data = req.body;
    const newRestaurant = new RestaurantPost(data);
    newRestaurant.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'sorry, internal server errors' })
            console.log(error)
        } else {
            res.json({
                msg: 'we recieved your data'
            })
        }
    })
})

router.get('/', (req, res) => {
    
})

module.exports = router;
