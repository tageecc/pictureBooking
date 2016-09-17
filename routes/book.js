var express = require('express');
var router = express.Router();
var User = require('../model/User');
/*
 * openid,用户名、邮箱、手机号、性别、学院/单位*/
/*时段，*/
/*支付*/
/*到时提前短信通知*/
/*点击发送图片到邮箱*/

/*注册用户信息*/
router.post('/add', userinfoVerification,orderinfoVerification, function (req, res, next) {
    /*保存用户信息*/
    User.create(req.user, function (err, user) {
        if (err) {
            res.json({code: -1, msg: '保存用户信息失败！'});
            return false;
        }
        /*新建订单*/
        
        res.json({code:1,msg:'预定成功！'});
    })

});
/*验证订单信息*/
function orderinfoVerification(req, res, next) {
    var order = {};
    if (!(req.params.use_to && req.params.use_to.length > 0)) {
        res.json({code: '-1', msg: '用途信息错误！'});
        return false;
    }
    order.use_to = res.params.use_to;
    if (!(req.params.size && req.params.size[0] > 0)) {
        res.json({code: '-1', msg: '姓名信息错误！'});
        return false;
    }
    order.name = res.params.name;
    if (!(req.params.mail && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(req.params.mail))) {
        res.json({code: '-1', msg: '邮箱参数错误！'});
        return false;
    }
    order.mail = res.params.mail;
    if (!(req.params.phone && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(req.params.phone))) {
        res.json({code: '-1', msg: '手机信息错误！'});
        return false;
    }
    user.phone = res.params.phone;
    if (!(req.params.sex && req.params.sex.length > 0)) {
        res.json({code: '-1', msg: '性别信息错误！'});
        return false;
    }
    user.sex = res.params.sex;
    if (!(req.params.units && req.params.units.length > 0)) {
        res.json({code: '-1', msg: '学院/单位信息错误！'});
        return false;
    }
    user.units = res.params.units;
    req.user = user;

    next();
}

/*验证用户信息*/
function userinfoVerification(req, res, next) {
    var user = {};
    if (!(req.params.openid && req.params.openid.length > 0)) {
        res.json({code: '-1', msg: 'openid信息错误！'});
        return false;
    }
    user.openid = res.params.openid;
    if (!(req.params.name && req.params.name.length > 0)) {
        res.json({code: '-1', msg: '姓名信息错误！'});
        return false;
    }
    user.name = res.params.name;
    if (!(req.params.mail && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(req.params.mail))) {
        res.json({code: '-1', msg: '邮箱参数错误！'});
        return false;
    }
    user.mail = res.params.mail;
    if (!(req.params.phone && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(req.params.phone))) {
        res.json({code: '-1', msg: '手机信息错误！'});
        return false;
    }
    user.phone = res.params.phone;
    if (!(req.params.sex && req.params.sex.length > 0)) {
        res.json({code: '-1', msg: '性别信息错误！'});
        return false;
    }
    user.sex = res.params.sex;
    if (!(req.params.units && req.params.units.length > 0)) {
        res.json({code: '-1', msg: '学院/单位信息错误！'});
        return false;
    }
    user.units = res.params.units;
    req.user = user;

    next();
}

module.exports = router;
