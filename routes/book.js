var express = require('express');
var router = express.Router();
var User = require('../model/User');
var Order = require('../model/Order');
/*
 /*时段，*/
/*支付*/
/*到时提前短信通知*/
/*点击发送图片到邮箱*/

/*注册用户信息*/
router.post('/add/user', userinfoVerification, orderinfoVerification, function (req, res, next) {
    /*保存用户信息*/
    User.create(req.user, function (err, user) {
        if (err) {
            res.json({code: -1, msg: '保存用户信息失败！'});
            return false;
        }
        /*新建订单*/
        Order.create(req.order, function (err, order) {
            if (err) {
                res.json({code: -1, msg: '预定失败！'});
            } else {
                res.json({code: 1, msg: '预定成功！'});
            }
        });
    })

});
router.post('/add', orderinfoVerification, function (req, res, next) {
    /*保存用户信息*/
    Order.create(req.order, function (err, order) {
        if (err) {
            res.json({code: -1, msg: '预定失败！'});
        } else {
            res.json({code: 1, msg: '预定成功！'});
        }
    })

});
/*验证订单信息*/
function orderinfoVerification(req, res, next) {
    var order = {};

    if (!(req.body.openid && req.body.openid.length > 0)) {
        res.json({code: '-1', msg: 'openid信息错误！'});
        return false;
    }
    order.openid = req.body.openid;
    console.log(req.body.openid);
    if (!(req.body.nickname && req.body.nickname.length > 0)) {
        res.json({code: '-1', msg: '姓名信息错误！'});
        return false;
    }
    order.nickname = req.body.nickname;
    if (!(req.body.email && /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(req.body.email))) {
        res.json({code: '-1', msg: '邮箱参数错误！'});
        return false;
    }
    order.email = req.body.email;
    if (!(req.body.phone && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(req.body.phone))) {
        res.json({code: '-1', msg: '手机信息错误！'});
        return false;
    }
    order.phone = req.body.phone;
    if (!(req.body.department && req.body.department.length > 0)) {
        res.json({code: '-1', msg: '学院/单位信息错误！'});
        return false;
    }
    order.department = req.body.department;

    if (!(req.body.use_to && req.body.use_to.length > 0)) {
        res.json({code: '-1', msg: '用途参数错误！'});
        return false;
    }
    order.use_to = req.body.use_to;
    if (!(req.body.photo_size && req.body.photo_size.length > 0)) {
        res.json({code: '-1', msg: '尺寸参数错误！'});
        return false;
    }
    order.photo_size = req.body.photo_size;
    if (!(req.body.bg_color && req.body.bg_color.length > 0)) {
        res.json({code: '-1', msg: '底色参数错误！'});
        return false;
    }
    order.bg_color = req.body.bg_color;
    if (!(req.body.is_makeup && req.body.is_makeup.length > 0)) {
        res.json({code: '-1', msg: '是否化妆参数错误！'});
        return false;
    }
    order.is_makeup = req.body.is_makeup;

    req.order = order;
    console.log(order);
    next();
}

/*验证用户信息*/
function userinfoVerification(req, res, next) {
    var user = {};
    if (!(req.body.openid && req.body.openid.length > 0)) {
        res.json({code: '-1', msg: 'openid信息错误！'});
        return false;
    }
    user.openid = req.body.openid;
    console.log(req.body.openid);
    if (!(req.body.nickname && req.body.nickname.length > 0)) {
        res.json({code: '-1', msg: '姓名信息错误！'});
        return false;
    }
    user.nickname = req.body.nickname;
    if (!(req.body.email && /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(req.body.email))) {
        res.json({code: '-1', msg: '邮箱参数错误！'});
        return false;
    }
    user.email = req.body.email;
    if (!(req.body.phone && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(req.body.phone))) {
        res.json({code: '-1', msg: '手机信息错误！'});
        return false;
    }
    user.phone = req.body.phone;
    /*if (!(req.body.sex && req.body.sex.length > 0)) {
     res.json({code: '-1', msg: '性别信息错误！'});
     return false;
     }
     user.sex = req.body.sex;*/
    if (!(req.body.department && req.body.department.length > 0)) {
        res.json({code: '-1', msg: '学院/单位信息错误！'});
        return false;
    }
    user.department = req.body.department;
    console.log(user);
    req.user = user;

    next();
}

module.exports = router;
