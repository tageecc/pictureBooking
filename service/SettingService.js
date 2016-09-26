var Setting = require('../model/Setting');

/**
 * 获取配置信息
 * @returns {Promise}
 */
exports.getSetting = function () {
    return new Promise(function (resolve, reject) {
        Setting.find({}, function (err, settings) {
            if (err) {
                reject('获取配置信息失败！请检查网络设置。');
                return false;
            }
            if (settings && settings.length > 0) {
                resolve(settings[0]);
            } else {
                reject('内部修整中，敬请期待！')
            }
        });
    });
}