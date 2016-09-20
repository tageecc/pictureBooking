var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new mongoose.Schema({
    //申请开放时间，单位为天，默认最早和最晚为7,30
    earliest_date: {
        type: Number,
        default: 1
    },
    latest_date: {
        type: Number,
        default: 30
    },
    //一天中申请开放的时间，单位为天，默认最早和最晚为7,30
    earliest_date: {
        type: Number,
        default: 1
    },
    latest_date: {
        type: Number,
        default: 30
    },
});
module.exports = mongoose.model('Setting', SettingSchema);