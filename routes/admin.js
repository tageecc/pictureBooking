var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');

function adminRequired(req, res, next) {
    var admin = req.session.admin;
    console.log("admin:" + admin);
    if (!admin) {
        return res.redirect('/login.html')
    }
    next()
}

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var _username = req.body.username;
    var _password = req.body.password;
    Admin.findOne({name: _username, passwd: _password}, function (err, admin) {
        if (err) {
            console.error(err);
            return;
        }
        if (admin) {
            req.session.admin = admin;
            res.render('admin');
        } else {
            req.session.admin = null;
            res.render('error', {msg: '用户名或密码错误！'});
        }
    })
});

module.exports = router;
