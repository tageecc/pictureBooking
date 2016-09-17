var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new mongoose.Schema({
    name: String,
    passwd: String
});
module.exports = mongoose.model('Admin', AdminSchema);