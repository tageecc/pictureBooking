var User = require('../model/User');

/**
 * 根据openid判断用户是否存在
 * @param _openid
 * @returns {Promise}
 */
exports.isUserExist = function (_openid) {
    return new Promise(function (resolve, reject) {
        User.findOne({openid: _openid}, function (err, user) {
            if (err) reject('获取用户信息失败，请检查网络设置');
            if (!user) {
                User.create({
                    openid: _openid
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        resolve();
                    }
                })
            }
            else {
                resolve();
            }
        })
    });
};