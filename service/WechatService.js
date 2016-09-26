var wechatConf = require('../config/wechatConf');

var g_access_token = {
    str: getAccess_token(),
    time: new Date().getTime()
};
exports.validateAccess_token = function (req, res, next) {
    var _curentTime = new Date().getTime();
    if ((_curentTime - access_token.time) / 1000 > 7200) {
        access_token.str = getAccess_token();
    }
    next();
};

exports.getAccess_token = function () {
    var _url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
        wechatConf.appid +
        '&secret=' +
        wechatConf.secret;
    request(_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return JSON.parse(body).access_token;
        }
    })
};