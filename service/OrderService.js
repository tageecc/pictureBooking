var Order = require('../model/Order');

/**
 * 添加订单
 * @param order
 * @returns {Promise}
 */
exports.addOrder = function (order) {
    return new Promise(function (resolve, reject) {
        Order.create(order, function (err, order) {
            if (err) {
                reject();
            } else {
                resolve();
            }
        })
    });
};

/**
 * 获取所有订单
 */
exports.getAllOrder = function () {
    return new Promise(function (resolve, reject) {
        Order.find({}, function (err, orders) {
            if (err) {
                reject();
            } else {
                resolve(orders);
            }
        })
    });
};