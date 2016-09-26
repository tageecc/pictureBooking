module.exports = {
    token: 'picbook4wechat',
    appid: 'wxb2b6de7e5f4788a5',
    secret: '6c391b34ed4d17f3ef94c280ffaae5aa',
    redirect_uri: 'http://www.tagee.cc/wechat/token'
};


var g_access_token = {
    str: getAccess_token(),
    time: new Date().getTime()
};
function validateAccess_token(req, res, next) {
    var _curentTime = new Date().getTime();
    if ((_curentTime - access_token.time) / 1000 > 7200) {
        access_token.str = getAccess_token();
    }
    next();
}

function getAccess_token() {
    var _url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
        appid +
        '&secret=' +
        secret;
    request(_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return JSON.parse(body).access_token;
        }
    })
}