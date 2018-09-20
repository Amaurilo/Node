const express = require('express');
const router = express.Router();

const movieDetails = require('../../models/movieSchema');
const mongoose = require ('mongoose');
mongoose.connect(
    'mongodb://localhost/video', {useNewUrlParser: true }
    );

router.get('/',(req, res, next) => {
    movieDetails.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    
    }); 
    
});

router.get('/:director', (req, res, next) => {
    const director = req.params.director;
    movieDetails.find({
        director: director
    })
    .exec()
    .then(doc1 => {
        res.status(200).json(doc1);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    
    }); 
});
module.exports = router;