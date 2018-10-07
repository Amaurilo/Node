const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


const movieDetails = require('../../models/movieSchema');
const mongoose = require ('mongoose');
mongoose.connect(
    'mongodb://localhost/video', {useNewUrlParser: true }
    );

router.get('/',(req, res, next) => {
    
    //captura querystring
    const year = req.query.ano;
    const rating = req.query.rating;
    if(year !=null && rating == null)
    {
        movieDetails.find(
            {year: {$gte: parseInt(year)}}
        ).exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});   
        });  
    }
    if(year !=null && rating != null)
    {
        movieDetails.find(
            {year: {$gte: parseInt(year)},
            'imdb.rating': {$gte: parseInt(rating)}
        }
        ).exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});   
        });  
    }
    if (year ==null && rating == null)
    {
        movieDetails.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});   
        });  
    }

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

router.get('/:rated/:wins', (req, res, next) => {
    const rated = req.params.rated;
    const wins = req.params.wins;
    movieDetails.find({
        rated: rated,
        "awards.wins": {$gte: parseInt(wins)}
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


router.put('/', (req, res, next) => {
    const putBody = req.body;

    const Todo = require("../../models/movieSchema");

    const newTodoObj = new Todo(req.body);
    console.log(newTodoObj);
    newTodoObj.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newTodoObj);
    });


   // movieDetails.insert(putBody);
    
   /*
   res.status(200).json({
            resultado:  body
        });
        */
});

router.post('/', (req, res) => {
    //var movie = mongoose.model("User", movieSchema);
    var myData = new movieDetails(req.body);
    myData.save()
    .then(item => {
    //res.send("item saved to database");
    res.send(myData);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });


module.exports = router;