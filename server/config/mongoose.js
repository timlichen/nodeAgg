// this is our mongoose.js file locaed in /config/mongoose.js
// this is a config file that connects to MongoDB and loads all of our models for sure. We do this here becaue we don't want to have a to connect to the DB every time we require a model.

//require mongoose

var mongoose = require('mongoose');
// require file-system so that we can load, read, require all of the model files.

var fs = require('fs');

mongoose.connect('mongodb://localhost/aggregator');

//specify the path to all of the models
var models_path = __dirname + '/../models'

//read all of the files in the models_path and for each one check if it is a js file before requireing it

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') > 0){
    require(models_path + '/' + file);
  }
})