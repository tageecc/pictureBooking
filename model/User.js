var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    openid: String,
    name: String,
    sex: String,
    phone: Number,
    mail:String,
    units:String,
    create_at: {
        type: Date,
        default: new Date().toLocaleString()
    }
});
module.exports = mongoose.model('User', UserSchema);