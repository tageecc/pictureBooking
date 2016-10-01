var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');
var SettingService = require('../service/SettingService');


function adminRequired(req, res, next) {
    if (!req.session.admin) {
        return res.render('login', {title: '123'});
    }
    next()
}

router.get('/', adminRequired, function (req, res, next) {
    SettingService.getSetting().then(function (setting) {
        res.render('admin', {setting: setting,title:setting.title});
    }, function (err) {
        res.render('error', {err: err});
    });
});
router.post('/login', function (req, res, next) {
    var _username = req.body.username;
    var _password = req.body.password;
    var _code = req.body.code;
    if (+_code != req.session.code) {
        res.json({code: -1, msg: '验证码输入错误！'});
        return false;
    }
    Admin.findOne({name: _username, passwd: _password}, function (err, admin) {
        if (err) {
            console.error(err);
            return;
        }
        if (admin) {
            req.session.admin = admin;
            res.json({code: 1});
        } else {
            req.session.admin = null;
            res.json({code: -1, msg: '用户名或密码错误！'});
        }
    })
});

router.post('/editor_setting', adminRequired, function (req, res, next) {
    SettingService.updateSetting({
        title: req.body.title,
        earliest_date: req.body.earliest_date,
        latest_date: req.body.latest_date,
        earliest_time: req.body.earliest_time,
        latest_time: req.body.latest_time,
        during_time: req.body.during_time,
        during_number: req.body.during_number
    }).then(function (setting) {
        res.json({code: 1, data: setting})
    }, function (err) {
        res.json({code: -1, msg: err});
    });
});
module.exports = router;
