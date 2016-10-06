var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
    openid: String,
    nickname:String,
    department:String,
    phone:String,
    email:String,
    use_to:String,/*用途*/
    photo_size:String,/*图片尺寸*/
    bg_color:String,/*底色*/
    is_makeup:Boolean,/*是否化妆*/
    datetime:String,/*预约时间*/
    remark:String,
    status:{
        type:Number,
        default:0
    },/*订单状态 0 未确认，1 已确认，2 已完成*/
    create_at: {
        type: Date,
        default: new Date().toLocaleString()
    }
});
module.exports = mongoose.model('Order', OrderSchema);