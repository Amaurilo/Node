const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    title: String, 
    plot: String
});

module.exports = mongoose.model('movieDetails',movieSchema,'movieDetails')
