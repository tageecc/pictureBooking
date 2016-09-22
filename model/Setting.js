var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new mongoose.Schema({
    title:String,//网站名称
    //申请开放时间，单位为天，默认最早和最晚为1,30
    earliest_date: {
        type: Number,
        default: 1
    },
    latest_date: {
        type: Number,
        default: 30
    },
    //一天中申请开放的时间，单位为小时，默认最早和最晚为8,18
    earliest_time: {
        type: Number,
        default: 8
    },
    latest_time: {
        type: Number,
        default: 18
    },
    //预约申请时间间隔，默认半个小时
    during_time:{
        type:Number,
        default:30
    },
    //单位时间可预约人数
    during_number:{
        type:Number,
        default:1
    }
});
module.exports = mongoose.model('Setting', SettingSchema);