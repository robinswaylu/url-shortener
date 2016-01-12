var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
    originalUrl: String,
    shortUrl: String
});

//create URL model
module.exports = mongoose.model('Url', Url);
