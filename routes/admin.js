var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');
var SettingService = require('../service/SettingService');


function adminRequired(req, res, next) {
    var admin = req.session.admin;
    if (!admin) {
        return res.redirect('/login.html')
    }
    next()
}

router.get('/', function (req, res, next) {
    if (req.session.admin) {
        res.render('admin', {setting: SettingService.getSetting()});
    } else {
        res.render('login');
    }

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

module.exports = router;
