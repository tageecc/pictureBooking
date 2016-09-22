var express = require('express');
var router = express.Router();
var Util = require('../util/util');
var Setting = require('../model/setting');
var Order = require('../model/Order');

router.get('/', function (req, res, next) {
    Setting.find({}, function (err, settings) {
        if (err) {
            res.json({code: -1, msg: '获取配置信息失败！'});
            return false;
        }
        if (settings&&settings.length>0) {
            res.render('index', {setting: settings[0]})

        } else {
            res.render('error', {error: '内部修整中，敬请期待！'})
        }
    });
});

module.exports = router;
