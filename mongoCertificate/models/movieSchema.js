const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    title: String, 
    director: String,
    year: Number
});

module.exports = mongoose.model('movieDetails',movieSchema,'movieDetails')
