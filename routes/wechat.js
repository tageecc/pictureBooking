var express = require('express');
var crypto = require('crypto');
var request = require('request');
var qs = require('querystring');
var router = express.Router();
var wechatConf = require('../config/wechatConf');
var UserService = require('../service/UserService');
var SettingService = require('../service/SettingService');


router.get('/', function (req, res, next) {
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "");
    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
        res.send(echostr)
    } else {
        res.send("error");
    }
});

router.get('/code', function (req, res, next) {
    var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        wechatConf.appid +
        '&redirect_uri=' +
        encodeURIComponent(wechatConf.redirect_uri) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    res.redirect(_url);
});

router.get('/token', function (req, res, next) {
    var _url = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
    var params = {
        appid: wechatConf.appid,
        secret: wechatConf.secret,
        code: req.query.code,
        grant_type: 'authorization_code'
    };
    var options = {
        method: 'get',
        url: _url + qs.stringify(params)
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            UserService.isUserExist(result.openid)
                .then(
                    function () {
                        return SettingService.getSetting();
                    },
                    function (err) {
                        res.render('error', {error: err});
                        return false;
                    })
                .then(
                    function (openid, setting) {
                        res.render('index', {setting: setting, openid: openid})
                    },
                    function (err) {
                        res.render('error', {error: err});
                        return false;
                    })

        }
    })
});

module.exports = router;
