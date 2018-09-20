const express = require('express');
const app = express();
const movieRoutes = require('./api/routes/movieRoutes');
app.use('/movies',movieRoutes);

module.exports = app;