var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
    openid: String,
    use_to:String,/*用途*/
    size:[Number,Number],/*图片尺寸*/
    bg_color:String,/*底色*/
    make_up:Boolean,/*是否化妆*/
    known_from:String,/*哪里获知我们*/
    date:String,/*预约时间*/
    create_at: {
        type: Date,
        default: new Date().toLocaleString()
    }
});
module.exports = mongoose.model('Order', OrderSchema);