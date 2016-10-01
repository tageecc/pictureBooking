var Setting = require('../model/Setting');

/**
 * 获取配置信息
 * @returns {Promise}
 */
exports.getSetting = function () {
    return new Promise(function (resolve, reject) {
        Setting.findOne({}, function (err, setting) {
            if (err) {
                reject('获取配置信息失败！请检查网络设置。');
                return false;
            }
            if (!setting) {
                reject('内部修整中，敬请期待！');
                return false;
            }
            resolve(setting);
        });
    });
};
exports.saveSetting = function (setting) {
    return new Promise(function (resolve, reject) {
        Setting.create(setting, function (err, setting) {
            if (err) {
                reject('保存配置失败，请检查网络设置！');
                return false;
            } else {
                resolve(setting);
            }
        });
    });
};
exports.updateSetting = function (setting) {
    return new Promise(function (resolve, reject) {
        Setting.update({},setting, function (err, setting) {
            if (err) {
                reject('保存配置失败，请检查网络设置！');
                return false;
            } else {
                resolve(setting);
            }
        });
    });
};