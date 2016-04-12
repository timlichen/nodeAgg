var mongoose = require('mongoose');

var aggSchema = new mongoose.Schema({
  dataBlob: {type: Object}
});

mongoose.model('Aggregator', aggSchema);