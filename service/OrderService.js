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
 * 获取订单详情
 * @param oid 订单id
 */
exports.getOrder = function (oid) {
    return new Promise(function (resolve, reject) {
        Order.findOne({_id: oid}, function (err, order) {
            if (err) {
                reject();
            } else {
                resolve(order);
            }
        })
    });
};
/**
 * 更改订单状态
 * @param oid 订单id
 * @param sid 状态id
 */
exports.updateOrderStatus = function (oid, sid) {
    return new Promise(function (resolve, reject) {
        Order.update({_id: oid}, {"$set": {status: sid}}, function (err, order) {
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
        Order.find({}, '_id nickname phone datetime status', function (err, orders) {
            if (err) {
                reject();
            } else {
                resolve(orders);
            }
        })
    });
};