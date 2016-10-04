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


exports.getOrder = function (oid) {
    return new Promise(function (resolve, reject) {
        Order.findOne({_id:oid}, function (err, order) {
            if (err) {
                reject();
            } else {
                resolve(order);
            }
        })
    });
};

/**
 * 获取所有订单
 */
exports.getAllOrder = function () {
    return new Promise(function (resolve, reject) {
        Order.find({},'_id nickname phone datetime status', function (err, orders) {
            if (err) {
                reject();
            } else {
                resolve(orders);
            }
        })
    });
};