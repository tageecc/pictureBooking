var Order = require('../model/Order');

/**
 * 添加订单
 * @param order {String}
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
 * @param {String} oid 订单id
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
 * 根据关键词搜索订单
 * @param {String} key
 */
exports.findOrderByKey = function (key) {
    var _key = new RegExp(key);
    return new Promise(function (resolve, reject) {
        if (!isNaN(key)) {
            Order.find({$or: [{nickname: _key}, {department: _key}, {phone: _key}, {email: _key}]}, function (err, orders) {
                if (err) {
                    reject(err);
                } else {
                    resolve(orders);
                }
            })
        } else {
            Order.find({$or: [{nickname: _key}, {department: _key}, {email: _key}]}, function (err, orders) {
                if (err) {
                    reject(err);
                } else {
                    resolve(orders);
                }
            })
        }

    });
};
/**
 * 更改订单状态
 * @param oid {String} 订单id
 * @param sid {String} 状态id
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
 * @param page {Number} 页码
 * @param perPage {Number} 每页显示条数
 */
exports.getAllOrder = function (page, perPage, resolve, reject) {
    if (!page || page < 1) {
        page = 1;
    }
    if (!perPage || perPage < 1) {
        perPage = 1;
    }
    Order.count(function (err, total) {
        Order.find({}, '_id nickname phone datetime status')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec(function (err, orders) {
                if (err) {
                    if (reject) reject(err);
                } else {
                    if (resolve) resolve(orders, page, perPage, total);
                }
            })
    });
};